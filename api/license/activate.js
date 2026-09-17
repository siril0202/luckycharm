import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, status: 'method_not_allowed' });
  }

  const { licenseKey, product, deviceIdHash } = req.body;

  if (!licenseKey || !product || !deviceIdHash) {
    return res.status(400).json({ success: false, status: 'missing_parameters' });
  }

  // Use the service role key to bypass RLS and perform atomic updates securely
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://xqllngifkixkmjonzlxl.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    return res.status(500).json({ success: false, status: 'server_configuration_error' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // 1. Try to atomically claim the license ONLY IF it's 'active'
    const { data: updatedLicense, error: updateError } = await supabase
      .from('licenses')
      .update({
        status: 'activated',
        device_hash: deviceIdHash,
        activated_at: new Date().toISOString()
      })
      .eq('license_key', licenseKey)
      .eq('product_id', product)
      .eq('status', 'active')
      .select()
      .maybeSingle();

    if (updateError) {
      console.error('Update error:', updateError);
      return res.status(500).json({ success: false, status: 'server_error' });
    }

    // 2. If it updated successfully, it's ours!
    if (updatedLicense) {
      return res.status(200).json({ success: true, status: 'activated' });
    }

    // 3. If no rows were updated, it means it wasn't 'active' or doesn't exist. Let's find out why.
    const { data: existingLicense, error: fetchError } = await supabase
      .from('licenses')
      .select('status, device_hash')
      .eq('license_key', licenseKey)
      .eq('product_id', product)
      .maybeSingle();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return res.status(500).json({ success: false, status: 'server_error' });
    }

    if (!existingLicense) {
      return res.status(404).json({ success: false, status: 'invalid_license' });
    }

    // It exists but wasn't 'active'. Why?
    if (existingLicense.status === 'activated') {
      if (existingLicense.device_hash === deviceIdHash) {
        // Already activated on THIS device
        return res.status(200).json({ success: true, status: 'activated' });
      } else {
        // Activated on ANOTHER device
        return res.status(403).json({ success: false, status: 'already_activated' });
      }
    }

    if (existingLicense.status === 'revoked') {
      return res.status(403).json({ success: false, status: 'revoked' });
    }

    if (existingLicense.status === 'expired') {
      return res.status(403).json({ success: false, status: 'expired' });
    }

    return res.status(400).json({ success: false, status: 'unknown_status' });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ success: false, status: 'server_error' });
  }
}

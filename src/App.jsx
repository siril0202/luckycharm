import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { CharmCollectionSection } from './sections/CharmCollectionSection';
import { PlatformSection } from './sections/PlatformSection';
import { MakeItYoursSection } from './sections/MakeItYoursSection';
import { SocialProofSection } from './sections/SocialProofSection';
import { PricingSection } from './sections/PricingSection';
import { OtherPlatformsSection } from './sections/OtherPlatformsSection';
import { SuccessView } from './components/checkout/SuccessView';

function App() {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Check if we just returned from a payment gateway
    const params = new URLSearchParams(window.location.search);
    const order = params.get('order_id');
    if (order) {
      setOrderId(order);
    }
  }, []);

  if (orderId) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <SuccessView orderId={orderId} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flexGrow: 1 }}>
        <HeroSection />
        <CharmCollectionSection />
        <PlatformSection />
        <MakeItYoursSection />
        <SocialProofSection />
        <PricingSection />
        <OtherPlatformsSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

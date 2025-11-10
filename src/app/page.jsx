import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuHighlights from "../components/MenuHighlights";
import DealOfTheDay from "../components/DealOfTheDay";
import Testimonials from "../components/Testimonials";
import SocialProof from "../components/SocialProof";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <Header />

      {/* HERO SECTION */}
      <Hero />

      {/* MENU HIGHLIGHTS SECTION */}
      <MenuHighlights />

      {/* DEAL OF THE DAY */}
      <DealOfTheDay />

      {/* TESTIMONIALS SECTION */}
      <Testimonials />

      {/* SOCIAL PROOF SECTION */}
      <SocialProof />

      {/* FOOTER SECTION */}
      <Footer />

      {/* WHATSAPP FLOATING BUTTON */}
      <WhatsAppFloat />
    </div>
  );
}
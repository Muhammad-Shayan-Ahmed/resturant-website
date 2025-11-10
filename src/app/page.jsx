import { useLoaderData, json } from 'react-router-dom';
import Header from "../components/Header";
import Hero from "../components/Hero";
// MenuHighlights aur DealOfTheDay ke components aur unke loader functions import karein
import MenuHighlights, { loader as menuHighlightsLoader } from '../components/MenuHighlights';
import DealOfTheDay, { loader as dealOfTheDayLoader } from '../components/DealOfTheDay';
import Testimonials from "../components/Testimonials";
import SocialProof from "../components/SocialProof";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";


// --- MAIN PAGE LOADER FUNCTION ---
// Yeh function server par run hoga aur dono components ke liye data fetch karega.
export async function loader() {
  // Dono loaders ko ek saath chalao taaki waiting time kam ho
  const [highlightsResponse, dealResponse] = await Promise.all([
    menuHighlightsLoader(),
    dealOfTheDayLoader(),
  ]);

  // Loader responses se data extract karein (unhe .json property se access kiya jata hai)
  const highlightsData = highlightsResponse.json;
  const dealData = dealResponse.json;

  // Final data object return karein jise HomePage component use karega
  return json({
    highlights: highlightsData.highlights,
    deal: dealData.deal,
  });
}

// --- HOME PAGE COMPONENT ---
export default function HomePage() {
  // useLoaderData hook se loader function dwara return kiya gaya data lein
  const { highlights, deal } = useLoaderData();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <Header />

      {/* HERO SECTION */}
      <Hero />

      {/* MENU HIGHLIGHTS SECTION: Ab data prop ke through pass ho raha hai */}
      <MenuHighlights initialHighlights={highlights} />

      {/* DEAL OF THE DAY: Ab data prop ke through pass ho raha hai */}
      <DealOfTheDay initialDeal={deal} />

      {/* OTHER SECTIONS */}
      <Testimonials />
      <SocialProof />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

import { useState, useEffect } from "react";
import { Play, Clock, Star } from "lucide-react";

export default function Hero() {
  const [heroVisible, setHeroVisible] = useState(false);

  // Animate hero on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section
        className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-[#FFF5F5] via-white to-[#FFF8E7] min-h-[80vh] flex items-center"
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl leading-tight text-[#1A1A1A] mb-6 font-bold"
              style={{
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="text-[#E63946]">Desi Flame.</span><br />
              <span className="text-[#FF7F11]">Fast Crave.</span><br />
              <em className="font-bold text-[#1A1A1A]">Fresh Every Time.</em>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-[#555555] mb-8 max-w-lg leading-relaxed">
              Family-friendly flavors with quick delivery and easy reservations. 
              Authentic Pakistani cuisine meets modern convenience.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="/menu"
                className="px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl text-center"
                style={{
                  background: "linear-gradient(135deg, #E63946, #FF7F11)",
                }}
              >
                Order Now
              </a>
              
              <a
                href="/reserve"
                className="px-8 py-4 rounded-2xl border-2 border-[#E63946] text-[#E63946] font-semibold text-lg transition-all duration-200 hover:bg-[#E63946] hover:text-white text-center"
              >
                Reserve Table
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#F2A900] text-[#F2A900]" />
                  ))}
                </div>
                <span className="text-[#1A1A1A] font-medium">4.9/5 Rating</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#E63946]" />
                <span className="text-[#1A1A1A] font-medium">30-45 min delivery</span>
              </div>
              
              <div className="text-[#1A1A1A] font-medium">
                🏆 Top Rated Restaurant 2024
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className={`relative transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Main Hero Image */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  height: "500px",
                  transform: "rotate(-2deg)"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80"
                  alt="Delicious Pakistani food featuring karahi, tikka, and traditional dishes"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                
                {/* Steam overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <div
                className={`absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg transition-all duration-500 ${heroVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                style={{ transitionDelay: "800ms" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">🔥</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">Chicken Karahi</div>
                    <div className="text-xs text-[#666666]">Most Popular</div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg transition-all duration-500 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: "1000ms" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F2A900] to-[#FF7F11] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">Fast Delivery</div>
                    <div className="text-xs text-[#666666]">30 min avg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-[#F2A900]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#E63946]/10 rounded-full blur-xl"></div>
      </section>
    </>
  );
}
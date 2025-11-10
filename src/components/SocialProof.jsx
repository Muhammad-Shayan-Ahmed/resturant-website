import { Shield, Award, Users, Truck, Clock, Heart } from "lucide-react";

export default function SocialProof() {
  const badges = [
    {
      icon: Shield,
      title: "Hygiene Certified",
      description: "FDA approved kitchen standards",
      color: "#25D366"
    },
    {
      icon: Users,
      title: "Family Friendly",
      description: "Comfortable seating for all",
      color: "#E63946"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "30-45 minutes guaranteed",
      color: "#FF7F11"
    },
    {
      icon: Award,
      title: "Top Rated 2024",
      description: "Best Pakistani restaurant",
      color: "#F2A900"
    },
    {
      icon: Clock,
      title: "Always Fresh",
      description: "Made to order every time",
      color: "#8D99AE"
    },
    {
      icon: Heart,
      title: "Halal Certified",
      description: "100% halal ingredients",
      color: "#E63946"
    }
  ];

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Why Choose <span className="text-[#E63946]">Desi Flame</span>
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Trusted by thousands of customers for quality, hygiene, and authentic Pakistani flavors.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${badge.color}15` }}
                >
                  <IconComponent
                    size={28}
                    style={{ color: badge.color }}
                    strokeWidth={1.5}
                  />
                </div>
                
                <h3 
                  className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#E63946] transition-colors"
                  style={{ fontSize: "16px" }}
                >
                  {badge.title}
                </h3>
                
                <p className="text-[#666666] text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Statistics Bar */}
        <div className="mt-16 bg-gradient-to-r from-[#E63946] to-[#FF7F11] rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                5000+
              </div>
              <div className="text-white/90 font-medium">
                Orders Delivered
              </div>
            </div>
            
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                4.9/5
              </div>
              <div className="text-white/90 font-medium">
                Customer Rating
              </div>
            </div>
            
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                35 min
              </div>
              <div className="text-white/90 font-medium">
                Avg Delivery Time
              </div>
            </div>
            
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                98%
              </div>
              <div className="text-white/90 font-medium">
                Customer Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-70">
          <div className="flex items-center gap-3 text-[#666666]">
            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-medium">FDA Certified</span>
          </div>
          
          <div className="flex items-center gap-3 text-[#666666]">
            <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <span className="font-medium">100% Halal</span>
          </div>
          
          <div className="flex items-center gap-3 text-[#666666]">
            <div className="w-8 h-8 bg-[#F2A900] rounded-full flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <span className="font-medium">Award Winning</span>
          </div>
          
          <div className="flex items-center gap-3 text-[#666666]">
            <div className="w-8 h-8 bg-[#FF7F11] rounded-full flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
            <span className="font-medium">24/7 Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
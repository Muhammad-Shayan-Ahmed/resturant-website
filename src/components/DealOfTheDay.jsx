import { useState, useEffect } from "react";
import { Clock, Percent, ShoppingCart } from "lucide-react";

export default function DealOfTheDay() {
  const [deal, setDeal] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealOfTheDay();
    // Set up timer
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchDealOfTheDay = async () => {
    try {
      const response = await fetch('/api/deals/today');
      if (response.ok) {
        const data = await response.json();
        setDeal(data);
      }
    } catch (error) {
      console.error('Error fetching deal:', error);
      // Fallback data for demo
      setDeal({
        id: 1,
        title: "Family Feast Special",
        description: "Complete family dinner for 4 people",
        items: ["Chicken Karahi Full", "4 Naan", "Salad", "2 Drinks"],
        originalPrice: 2800,
        dealPrice: 2399,
        savings: 401,
        discount: 14,
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTimeLeft = () => {
    if (!deal || !deal.expiresAt) return;

    const now = new Date().getTime();
    const expiry = new Date(deal.expiresAt).getTime();
    const difference = expiry - now;

    if (difference > 0) {
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    } else {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-6 bg-gradient-to-r from-[#FFF8E7] to-[#FFF5F5]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 animate-pulse rounded-3xl h-96"></div>
        </div>
      </section>
    );
  }

  if (!deal) return null;

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[#FFF8E7] to-[#FFF5F5]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column - Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Deal Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E63946] to-[#FF7F11] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                <Percent size={16} />
                Deal of the Day
              </div>

              <h2
                className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {deal.title}
              </h2>

              <p className="text-lg text-[#666666] mb-6">
                {deal.description}
              </p>

              {/* Included Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1A1A1A] mb-3">What's Included:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {deal.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#666666] text-sm">
                      <div className="w-2 h-2 bg-[#E63946] rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <div className="text-3xl lg:text-4xl font-bold text-[#E63946]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    Rs. {deal.dealPrice.toLocaleString()}
                  </div>
                  <div className="text-lg text-[#999999] line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    Rs. {deal.originalPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-[#25D366] font-semibold">
                  You save Rs. {deal.savings.toLocaleString()} ({deal.discount}% OFF)
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[#E63946] font-semibold mb-3">
                  <Clock size={18} />
                  Limited Time Offer
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#E63946] text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[3rem] text-center">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[#E63946] font-bold">:</span>
                  <div className="bg-[#E63946] text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[3rem] text-center">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[#E63946] font-bold">:</span>
                  <div className="bg-[#E63946] text-white px-3 py-2 rounded-lg text-lg font-bold min-w-[3rem] text-center">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex items-center gap-8 text-xs text-[#666666] mt-1">
                  <span>Hours</span>
                  <span>Minutes</span>
                  <span>Seconds</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="bg-gradient-to-r from-[#E63946] to-[#FF7F11] hover:from-[#D12B36] hover:to-[#E6700A] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3"
                onClick={() => {
                  // Add deal to cart functionality
                  console.log('Add deal to cart:', deal);
                }}
              >
                <ShoppingCart size={20} />
                Order This Deal
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="relative overflow-hidden lg:min-h-[500px]">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Discount Badge */}
              <div className="absolute top-6 right-6 bg-[#E63946] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                {deal.discount}% OFF
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
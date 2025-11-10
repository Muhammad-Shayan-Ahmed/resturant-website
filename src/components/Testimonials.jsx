import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (autoPlay && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback data for demo
      setTestimonials([
        {
          id: 1,
          name: "Ayesha Khan",
          rating: 5,
          comment: "Best karahi in town! The family seating is super comfortable and the food quality is exceptional. The malai boti was absolutely delicious and cooked to perfection. Highly recommend for anyone looking for authentic Pakistani flavors!",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1d1?auto=format&fit=crop&w=150&q=80",
          isVerified: true,
          date: "2024-08-20"
        },
        {
          id: 2,
          name: "Hassan Ali",
          rating: 5,
          comment: "Crispy zinger and quick delivery. The taste is amazing and portion sizes are generous. The staff is very friendly and the service is top-notch. Will definitely order again!",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
          isVerified: true,
          date: "2024-08-18"
        },
        {
          id: 3,
          name: "Fatima Ahmed",
          rating: 5,
          comment: "Authentic Desi flavors with modern presentation. The karahi was perfectly spiced and the naan was fresh and warm. Love the hygiene standards and quick service. This place never disappoints!",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
          isVerified: true,
          date: "2024-08-15"
        },
        {
          id: 4,
          name: "Muhammad Omar",
          rating: 4,
          comment: "Great food and friendly service. The charga was perfectly cooked and very flavorful. The atmosphere is welcoming for families and the prices are reasonable for the quality.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
          isVerified: false,
          date: "2024-08-12"
        },
        {
          id: 5,
          name: "Zara Sheikh",
          rating: 5,
          comment: "Love the hygiene standards and quick service. Best Pakistani restaurant in the area! The online ordering system is so convenient and the delivery is always on time. Excellent experience overall!",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80",
          isVerified: true,
          date: "2024-08-10"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-[#FFF5F5] to-[#FFF8E7]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 animate-pulse rounded-3xl h-96"></div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      className="py-16 md:py-24 px-6 bg-gradient-to-br from-[#FFF5F5] to-[#FFF8E7]"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            What Our <span className="text-[#E63946]">Customers</span> Say
          </h2>
          <p className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto">
            Real reviews from real customers who love our authentic Pakistani cuisine.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Avatar Section */}
            <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col items-center justify-center bg-gradient-to-br from-[#E63946]/5 to-[#FF7F11]/5">
              <div className="relative mb-6">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {currentTestimonial.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-[#25D366] text-white p-2 rounded-full">
                    <CheckCircle size={16} fill="white" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] text-center mb-2">
                {currentTestimonial.name}
              </h3>
              
              {currentTestimonial.isVerified && (
                <div className="flex items-center gap-2 text-[#25D366] text-sm font-medium mb-4">
                  <CheckCircle size={16} />
                  Verified Customer
                </div>
              )}
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < currentTestimonial.rating ? "fill-[#F2A900] text-[#F2A900]" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <div className="text-sm text-[#666666]">
                {formatDate(currentTestimonial.date)}
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              <div className="relative">
                <Quote size={48} className="text-[#E63946]/20 mb-6" />
                
                <blockquote className="text-lg lg:text-xl leading-relaxed text-[#1A1A1A] mb-8 font-medium">
                  "{currentTestimonial.comment}"
                </blockquote>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentIndex ? 'bg-[#E63946]' : 'bg-gray-300'
                        }`}
                        onClick={() => goToTestimonial(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevTestimonial}
                      className="p-3 bg-[#FFF5F5] hover:bg-[#E63946] text-[#E63946] hover:text-white rounded-xl transition-all duration-200"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-3 bg-[#FFF5F5] hover:bg-[#E63946] text-[#E63946] hover:text-white rounded-xl transition-all duration-200"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-[#E63946] mb-2">1000+</div>
            <div className="text-[#666666]">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-[#E63946] mb-2">4.9</div>
            <div className="text-[#666666]">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-[#E63946] mb-2">500+</div>
            <div className="text-[#666666]">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
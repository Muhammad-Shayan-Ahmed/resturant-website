import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { Award, Users, Heart, Shield, Clock, MapPin } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Family First",
      description: "We believe great food brings families together. Our restaurant is designed for comfort, warmth, and creating memories."
    },
    {
      icon: Shield,
      title: "Hygiene Standards",
      description: "We maintain the highest standards of cleanliness and food safety. Your health and safety are our top priorities."
    },
    {
      icon: Award,
      title: "Authentic Taste",
      description: "Traditional recipes passed down through generations, prepared with authentic spices and cooking techniques."
    },
    {
      icon: Clock,
      title: "Fresh & Fast",
      description: "Made fresh daily with quality ingredients. Quick service without compromising on taste and quality."
    }
  ];

  const stats = [
    { number: "5+", label: "Years Serving" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Menu Items" },
    { number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#E63946] to-[#FF7F11] text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-95">
              Where authentic Pakistani flavors meet modern dining experience. 
              A place where families gather, friends celebrate, and memories are made.
            </p>
          </div>
        </div>
      </div>

      {/* Main Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-poppins">
                Born from Passion, Served with Love
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Desi Flame began with a simple dream: to bring the authentic taste of Pakistani 
                  cuisine to families who crave the comfort of home-cooked meals. Our journey started 
                  in a small kitchen where traditional recipes were perfected with modern techniques.
                </p>
                <p>
                  We blend the soulful taste of Desi classics with the crave-worthy thrill of Fast Food. 
                  From sizzling Karahi to crispy Zingers, our kitchen serves families, friends, and 
                  solo foodies with equal warmth.
                </p>
                <p>
                  Every dish tells a story of heritage, every spice carries tradition, and every meal 
                  is prepared with the love and care you'd expect from family. Hygienic preparation, 
                  generous portions, and swift service—every single day.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF0E6] rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-white font-bold text-4xl">DF</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Desi Flame</h3>
                  <p className="text-gray-600">Est. 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-poppins">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do, from sourcing ingredients to serving customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#E63946] to-[#FF7F11] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-poppins">
              Our Journey in Numbers
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Milestones that reflect our commitment to serving the community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF0E6] rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-20 h-20 text-[#E63946] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Our Team</h3>
                  <p className="text-gray-600">Passionate chefs & friendly staff</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-poppins">
                Meet Our Culinary Team
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our skilled chefs bring decades of experience in traditional Pakistani cooking. 
                  Each dish is crafted with expertise, using time-honored techniques and authentic spices 
                  sourced directly from trusted suppliers.
                </p>
                <p>
                  From our kitchen staff to our service team, everyone at Desi Flame is committed to 
                  delivering exceptional food and hospitality. We take pride in creating a welcoming 
                  environment where every guest feels like family.
                </p>
              </div>
              
              <div className="mt-8 flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Visit Our Kitchen</h4>
                  <p className="text-gray-600">Open kitchen concept - see your food being prepared</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seating & Ambiance */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-poppins">
              Comfortable Dining for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're dining solo, with family, or hosting a celebration, 
              we have the perfect space for your occasion
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#F2A900] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Family Seating</h3>
              <p className="text-gray-600 leading-relaxed">
                Spacious tables perfect for families with children. 
                High chairs and kids-friendly environment available.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#8D99AE] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Cozy Corners</h3>
              <p className="text-gray-600 leading-relaxed">
                Intimate seating for couples and small groups. 
                Perfect for casual dining and conversation.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Private Events</h3>
              <p className="text-gray-600 leading-relaxed">
                Special arrangements for birthdays, anniversaries, 
                and group celebrations with advance booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-poppins">
            Experience Authentic Pakistani Cuisine
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join thousands of satisfied customers who have made Desi Flame their favorite dining destination. 
            Order online for delivery or reserve your table for an unforgettable dining experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/menu"
              className="px-8 py-4 bg-[#E63946] hover:bg-[#D12B36] text-white font-semibold rounded-xl transition-colors duration-150 text-lg"
            >
              Order Online
            </a>
            <a
              href="/reserve"
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] font-semibold rounded-xl transition-all duration-150 text-lg"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
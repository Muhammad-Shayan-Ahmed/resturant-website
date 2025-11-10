import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    fetchOperatingHours();
  }, []);

  const fetchOperatingHours = async () => {
    try {
      const response = await fetch('/api/hours');
      if (response.ok) {
        const data = await response.json();
        setHours(data);
      }
    } catch (error) {
      console.error('Error fetching hours:', error);
      // Fallback data
      setHours([
        { day: 'Sunday', open: '12:00', close: '23:00', isClosed: false },
        { day: 'Monday', open: '12:00', close: '23:00', isClosed: false },
        { day: 'Tuesday', open: '12:00', close: '23:00', isClosed: false },
        { day: 'Wednesday', open: '12:00', close: '23:00', isClosed: false },
        { day: 'Thursday', open: '12:00', close: '23:00', isClosed: false },
        { day: 'Friday', open: '12:00', close: '00:00', isClosed: false },
        { day: 'Saturday', open: '12:00', close: '00:00', isClosed: false }
      ]);
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Refund Policy", href: "/legal/refund" }
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">DF</span>
              </div>
              <span className="text-white font-bold text-2xl">Desi Flame</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              We blend the soulful taste of Desi classics with the crave-worthy thrill of Fast Food. 
              From sizzling Karahi to crispy Zingers, our kitchen serves families, friends, and solo foodies with equal warmth.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2A2A2A] hover:bg-[#1877F2] rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2A2A2A] hover:bg-gradient-to-r hover:from-[#F58529] hover:to-[#E1306C] rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2A2A2A] hover:bg-[#1DA1F2] rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2A2A2A] hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-[#E63946] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#E63946] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Food Street, Gulberg III<br />
                    Lahore, Punjab 54000<br />
                    Pakistan
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#E63946] flex-shrink-0" />
                <a href="tel:+92300123456" className="text-gray-300 hover:text-white transition-colors">
                  +92 300 123 4567
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#E63946] flex-shrink-0" />
                <a href="mailto:info@desiflame.com" className="text-gray-300 hover:text-white transition-colors">
                  info@desiflame.com
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Clock size={18} className="text-[#E63946]" />
              Operating Hours
            </h3>
            <div className="space-y-2">
              {hours.map((hour, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">{hour.day}</span>
                  {hour.isClosed ? (
                    <span className="text-gray-500">Closed</span>
                  ) : (
                    <span className="text-gray-300">
                      {formatTime(hour.open)} - {formatTime(hour.close)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Special Notice */}
            <div className="mt-4 p-3 bg-[#2A2A2A] rounded-lg">
              <p className="text-xs text-gray-400">
                📞 Call ahead for large group reservations
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get the latest deals and menu updates delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-[#2A2A2A] text-white placeholder-gray-400 border border-gray-600 focus:border-[#E63946] focus:outline-none"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#E63946] to-[#FF7F11] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Desi Flame. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-4 h-4 bg-[#25D366] rounded-full flex items-center justify-center text-[10px]">✓</span>
              100% Halal Certified
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-4 h-4 bg-[#E63946] rounded-full flex items-center justify-center text-[10px]">♨</span>
              Hygiene Standards Met
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-4 h-4 bg-[#F2A900] rounded-full flex items-center justify-center text-[10px]">★</span>
              Award Winning Restaurant
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
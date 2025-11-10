"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [hours, setHours] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchHours();
  }, []);

  const fetchHours = async () => {
    try {
      const response = await fetch('/api/hours');
      const data = await response.json();
      if (data.success) {
        setHours(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch hours:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#E63946] to-[#FF7F11] text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto">
              Have a question, feedback, or want to make a reservation? 
              We'd love to hear from you. Reach out anytime!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Location */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Visit Us</h3>
              <p className="text-gray-600 leading-relaxed">
                Main Boulevard<br />
                Gulberg III, Lahore<br />
                Punjab, Pakistan
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Call Us</h3>
              <div className="space-y-2">
                <a 
                  href="tel:+923001234567" 
                  className="block text-[#E63946] hover:text-[#D12B36] font-medium transition-colors"
                >
                  +92 300 123 4567
                </a>
                <a 
                  href="tel:+92421234567" 
                  className="block text-[#E63946] hover:text-[#D12B36] font-medium transition-colors"
                >
                  042-123-4567
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F2A900] to-[#E6950E] rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Email Us</h3>
              <div className="space-y-2">
                <a 
                  href="mailto:info@desiflame.com" 
                  className="block text-[#E63946] hover:text-[#D12B36] font-medium transition-colors"
                >
                  info@desiflame.com
                </a>
                <a 
                  href="mailto:orders@desiflame.com" 
                  className="block text-[#E63946] hover:text-[#D12B36] font-medium transition-colors"
                >
                  orders@desiflame.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8D99AE] to-[#6C757D] rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Opening Hours</h3>
              <div className="space-y-1 text-sm text-gray-600">
                {hours.length > 0 ? (
                  hours.map((hour) => (
                    <div key={hour.day_of_week} className="flex justify-between">
                      <span>{dayNames[hour.day_of_week]}</span>
                      <span>
                        {hour.is_closed ? 'Closed' : `${hour.open_time} - ${hour.close_time}`}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Mon-Thu</span>
                      <span>12:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fri-Sat</span>
                      <span>12:00 - 24:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>12:00 - 23:00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-poppins">
                Send us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you have questions about our menu, want to provide feedback, 
                or need assistance with an order, we're here to help.
              </p>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-medium">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                      placeholder="+92 300 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="order">Order Support</option>
                    <option value="reservation">Reservation</option>
                    <option value="catering">Catering</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E63946] hover:bg-[#D12B36] disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-150 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-poppins">
                Find Us
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Located in the heart of Gulberg III, we're easily accessible 
                by car, public transport, or delivery services.
              </p>

              <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center mb-8">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Interactive Map</h3>
                  <p className="text-gray-500 max-w-sm">
                    Google Maps integration would be added here with your exact location pin
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#1A1A1A]">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-150 text-center"
                  >
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+923001234567"
                    className="flex-1 bg-[#E63946] hover:bg-[#D12B36] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-150 text-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-poppins">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What are your delivery hours?",
                answer: "We deliver from 12:00 PM to 11:30 PM daily. Last orders are accepted 30 minutes before closing."
              },
              {
                question: "Do you offer catering services?",
                answer: "Yes! We provide catering for events, parties, and corporate functions. Contact us at least 24 hours in advance for catering orders."
              },
              {
                question: "Are your dishes halal certified?",
                answer: "Absolutely! All our meat and ingredients are halal certified. We maintain strict halal standards in our kitchen."
              },
              {
                question: "Can I modify spice levels in my order?",
                answer: "Yes, you can request spice level adjustments when placing your order. Just mention your preference in the order notes."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept cash on delivery, online card payments, and mobile wallet payments for your convenience."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
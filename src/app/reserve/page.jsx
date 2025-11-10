"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Phone, MessageCircle } from "lucide-react";

export default function ReservePage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    party_size: 2,
    reservation_date: '',
    reservation_time: '',
    special_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [reservationDetails, setReservationDetails] = useState(null);

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, reservation_date: today }));
  }, []);

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setReservationDetails(data.data);
        setSuccess(true);
        setFormData({
          customer_name: '',
          customer_phone: '',
          customer_email: '',
          party_size: 2,
          reservation_date: new Date().toISOString().split('T')[0],
          reservation_time: '',
          special_notes: ''
        });
      } else {
        setError(data.error || 'Failed to make reservation');
      }
    } catch (err) {
      console.error('Reservation error:', err);
      setError('Failed to make reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success && reservationDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-poppins">
              Reservation Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for choosing Desi Flame. We look forward to serving you!
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Reservation Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Reservation Number</span>
                <span className="font-semibold text-[#E63946]">{reservationDetails.reservation_number}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Name</span>
                <span className="font-semibold">{reservationDetails.customer_name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold">{new Date(reservationDetails.reservation_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold">{reservationDetails.reservation_time}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Party Size</span>
                <span className="font-semibold">{reservationDetails.party_size} guests</span>
              </div>
              {reservationDetails.special_notes && (
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Special Notes</span>
                  <span className="font-semibold">{reservationDetails.special_notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notes</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Please arrive 10 minutes before your reservation time</li>
              <li>• If you're running late, please call us to hold your table</li>
              <li>• Tables are held for 15 minutes past reservation time</li>
              <li>• For changes or cancellations, call at least 2 hours in advance</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/"
              className="flex-1 bg-[#E63946] hover:bg-[#D12B36] text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-150 text-center"
            >
              Back to Home
            </a>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-150 text-center flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        <Footer />
        <WhatsAppFloat />
      </div>
    );
  }

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
                <Calendar className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
              Reserve a Table
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto">
              Secure your spot at Desi Flame for an unforgettable dining experience. 
              Perfect for family dinners, celebrations, and special occasions.
            </p>
          </div>
        </div>
      </div>

      {/* Reservation Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-poppins">
                Make Your Reservation
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill in your details below and we'll reserve the perfect table for your visit. 
                All reservations are subject to availability.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      required
                      value={formData.customer_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="customer_phone"
                      name="customer_phone"
                      required
                      value={formData.customer_phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                      placeholder="+92 300 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="party_size" className="block text-sm font-medium text-gray-700 mb-2">
                      Party Size *
                    </label>
                    <select
                      id="party_size"
                      name="party_size"
                      required
                      value={formData.party_size}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                      <option value="13+">13+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reservation_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="reservation_date"
                      name="reservation_date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.reservation_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label htmlFor="reservation_time" className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <select
                      id="reservation_time"
                      name="reservation_time"
                      required
                      value={formData.reservation_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="special_notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="special_notes"
                    name="special_notes"
                    rows={4}
                    value={formData.special_notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all duration-150 resize-none"
                    placeholder="Birthday celebration, wheelchair accessibility, window seating, etc."
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
                      <Calendar className="w-5 h-5" />
                      <span>Reserve Table</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Panel */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Reservation Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E63946] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-2">Opening Hours</h4>
                      <div className="text-gray-600 space-y-1">
                        <div>Monday - Thursday: 12:00 PM - 11:00 PM</div>
                        <div>Friday - Saturday: 12:00 PM - 12:00 AM</div>
                        <div>Sunday: 12:00 PM - 11:00 PM</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F2A900] rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-2">Group Reservations</h4>
                      <p className="text-gray-600">
                        For parties of 13+ guests, please call us directly at 
                        <a href="tel:+923001234567" className="text-[#E63946] hover:text-[#D12B36] font-medium"> +92 300 123 4567</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-2">Need Help?</h4>
                      <p className="text-gray-600 mb-3">
                        Call or WhatsApp us for immediate assistance with your reservation.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href="tel:+923001234567"
                          className="px-4 py-2 bg-[#E63946] hover:bg-[#D12B36] text-white text-sm font-medium rounded-lg transition-colors duration-150 text-center"
                        >
                          Call Now
                        </a>
                        <a
                          href="https://wa.me/923001234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-medium rounded-lg transition-colors duration-150 text-center"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Reservation Policy</h4>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Reservations are confirmed upon submission</li>
                  <li>• Tables are held for 15 minutes past reservation time</li>
                  <li>• For cancellations, please notify us at least 2 hours in advance</li>
                  <li>• Special seating requests are subject to availability</li>
                  <li>• We accommodate dietary restrictions with advance notice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
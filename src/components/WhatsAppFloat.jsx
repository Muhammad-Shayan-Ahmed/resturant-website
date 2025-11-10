import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+923001234567"; // Restaurant's WhatsApp number
  const defaultMessage = "Hi! I'm interested in ordering from Desi Flame. Can you help me?";

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const quickMessages = [
    "I want to place an order",
    "Check menu and prices",
    "Make a reservation",
    "Ask about delivery",
    "Speak to manager"
  ];

  return (
    <>
      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-bottom-3">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Desi Flame</h3>
                <p className="text-xs opacity-90">Usually responds in minutes</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              👋 Hello! Welcome to Desi Flame. How can we help you today?
            </p>

            {/* Quick Message Options */}
            <div className="space-y-2">
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
                    window.open(whatsappUrl, '_blank');
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
                >
                  {message}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={openWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#22C55E] text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Start WhatsApp Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Online Status Indicator */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-white animate-pulse"></div>
        
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#22C55E] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 group"
          aria-label="Open WhatsApp chat"
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-200" />
          ) : (
            <MessageCircle size={24} className="transition-transform duration-200 group-hover:scale-110" />
          )}
        </button>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black"></div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
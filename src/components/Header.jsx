import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 h-16 px-6 font-inter">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo block */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">DF</span>
            </div>
            <span className="text-[#1A1A1A] font-semibold text-xl">
              Desi Flame
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#1A1A1A] hover:text-[#E63946] transition-colors duration-150 font-medium text-base px-3 py-2 rounded-lg hover:bg-[#FFF5F5]"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-[#1A1A1A] hover:text-[#E63946] hover:bg-[#FFF5F5] rounded-lg transition-colors duration-150">
              <Search size={20} />
            </button>
            <a
              href="/cart"
              className="p-2 text-[#1A1A1A] hover:text-[#E63946] hover:bg-[#FFF5F5] rounded-lg transition-colors duration-150 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-[#E63946] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </a>
            <a
              href="/reserve"
              className="px-6 py-3 rounded-xl bg-[#E63946] hover:bg-[#D12B36] text-white font-semibold text-sm transition-colors duration-150"
            >
              Reserve Table
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#1A1A1A] hover:text-[#25D366] hover:bg-[#F0F9FF] rounded-lg transition-colors duration-150"
            >
              <MessageCircle size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1A1A1A] rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
            {/* Mobile Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
              <a href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E63946] to-[#FF7F11] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DF</span>
                </div>
                <span className="text-[#1A1A1A] font-semibold text-xl">
                  Desi Flame
                </span>
              </a>
              <button
                className="p-2 text-[#1A1A1A] rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-6 py-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center py-3 text-[#1A1A1A] hover:text-[#E63946] transition-colors duration-150 font-medium text-base border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Action Buttons */}
            <div className="px-6 py-6 space-y-3 border-t border-gray-100">
              <a
                href="/reserve"
                className="w-full px-6 py-3 rounded-xl bg-[#E63946] hover:bg-[#D12B36] text-white font-semibold text-sm text-center block transition-colors duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reserve Table
              </a>
              <a
                href="/cart"
                className="w-full px-6 py-3 rounded-xl border border-[#E63946] text-[#E63946] font-semibold text-sm text-center block transition-colors duration-150 hover:bg-[#FFF5F5]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View Cart
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

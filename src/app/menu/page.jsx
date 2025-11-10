import { useState, useEffect } from "react";
import { Search, Filter, Plus, Minus, ShoppingCart, X, Leaf } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [spiceFilter, setSpiceFilter] = useState("all");
  const [vegFilter, setVegFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuData();
    loadCart();
  }, []);

  useEffect(() => {
    filterItems();
  }, [menuItems, selectedCategory, searchQuery, spiceFilter, vegFilter]);

  useEffect(() => {
    saveCart();
  }, [cart]);

  const fetchMenuData = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/menu')
      ]);
      
      if (categoriesRes.ok && itemsRes.ok) {
        const categoriesData = await categoriesRes.json();
        const itemsData = await itemsRes.json();
        
        setCategories(categoriesData);
        setMenuItems(itemsData);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
      // Fallback data for demo
      setCategories([
        { id: 1, name: "Desi", slug: "desi" },
        { id: 2, name: "BBQ", slug: "bbq" },
        { id: 3, name: "Fast Food", slug: "fast-food" },
        { id: 4, name: "Karahi", slug: "karahi" },
        { id: 5, name: "Burgers", slug: "burgers" },
        { id: 6, name: "Drinks", slug: "drinks" }
      ]);
      
      setMenuItems([
        {
          id: 1,
          name: "Chicken Karahi Half",
          description: "Traditional chicken karahi cooked with tomatoes, ginger, and green chilies",
          price: 1190,
          spiceLevel: "medium",
          isVeg: false,
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80",
          category: { slug: "karahi" }
        },
        {
          id: 2,
          name: "Malai Boti",
          description: "Creamy marinated tender chicken pieces grilled to perfection",
          price: 990,
          spiceLevel: "mild",
          isVeg: false,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80",
          category: { slug: "bbq" }
        },
        {
          id: 3,
          name: "Zinger Burger",
          description: "Crispy chicken fillet with mayo and fresh vegetables in a soft bun",
          price: 590,
          spiceLevel: "mild",
          isVeg: false,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
          category: { slug: "burgers" }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('desi-flame-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = () => {
    localStorage.setItem('desi-flame-cart', JSON.stringify(cart));
  };

  const filterItems = () => {
    let filtered = menuItems;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category.slug === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Spice level filter
    if (spiceFilter !== "all") {
      filtered = filtered.filter(item => item.spiceLevel === spiceFilter);
    }

    // Vegetarian filter
    if (vegFilter === "veg") {
      filtered = filtered.filter(item => item.isVeg);
    } else if (vegFilter === "non-veg") {
      filtered = filtered.filter(item => !item.isVeg);
    }

    setFilteredItems(filtered);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSpiceColor = (level) => {
    switch (level) {
      case 'mild': return '#F2A900';
      case 'medium': return '#FF7F11';
      case 'hot': return '#E63946';
      default: return '#8D99AE';
    }
  };

  const getSpiceIcon = (level) => {
    switch (level) {
      case 'mild': return '🌶️';
      case 'medium': return '🌶️🌶️';
      case 'hot': return '🌶️🌶️🌶️';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-3xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-br from-[#FFF5F5] to-[#FFF8E7]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Our <span className="text-[#E63946]">Complete</span> Menu
          </h1>
          <p className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto">
            Discover authentic Pakistani flavors with our extensive selection of traditional and modern dishes.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 px-6 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#E63946] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#E63946] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Items
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-[#E63946] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={spiceFilter}
              onChange={(e) => setSpiceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-[#E63946] focus:outline-none"
            >
              <option value="all">All Spice Levels</option>
              <option value="none">No Spice</option>
              <option value="mild">Mild</option>
              <option value="medium">Medium</option>
              <option value="hot">Hot</option>
            </select>

            <select
              value={vegFilter}
              onChange={(e) => setVegFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-[#E63946] focus:outline-none"
            >
              <option value="all">All Items</option>
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => {
              const quantity = getCartItemQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Veg/Non-Veg Indicator */}
                    <div className="absolute top-3 right-3">
                      {item.isVeg ? (
                        <div className="w-6 h-6 border-2 border-green-600 flex items-center justify-center bg-white rounded">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-red-600 flex items-center justify-center bg-white rounded">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-xl text-[#1A1A1A]">{item.name}</h3>
                      {item.spiceLevel !== 'none' && (
                        <div 
                          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${getSpiceColor(item.spiceLevel)}20`,
                            color: getSpiceColor(item.spiceLevel)
                          }}
                        >
                          <span>{getSpiceIcon(item.spiceLevel)}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-[#666666] text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-[#E63946]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        Rs. {item.price.toLocaleString()}
                      </div>
                      
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-[#E63946] hover:bg-[#D12B36] text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-[#E63946] min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 bg-[#E63946] hover:bg-[#D12B36] text-white rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">No items found</h3>
              <p className="text-[#666666]">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-24 left-6 z-50">
          <button
            onClick={() => setShowCart(true)}
            className="bg-[#E63946] hover:bg-[#D12B36] text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
          >
            <ShoppingCart size={20} />
            <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            <span className="font-bold">Rs. {getCartTotal().toLocaleString()}</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Your Order</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-[#666666]">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1A1A1A]">{item.name}</h3>
                        <p className="text-[#E63946] font-bold">Rs. {item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 bg-white hover:bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-[#1A1A1A] min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 bg-[#E63946] hover:bg-[#D12B36] text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold text-[#1A1A1A]">Total:</span>
                  <span className="text-2xl font-bold text-[#E63946]">
                    Rs. {getCartTotal().toLocaleString()}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCart(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <a
                    href="/order"
                    className="flex-1 px-6 py-3 bg-[#E63946] hover:bg-[#D12B36] text-white rounded-xl font-semibold text-center transition-colors"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
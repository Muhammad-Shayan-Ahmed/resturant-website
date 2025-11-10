import { Flame, Star, Plus } from "lucide-react";
import { json } from 'react-router-dom';

// --- FALLBACK DATA (Same as your previous hardcoded data) ---
export const fallbackHighlights = [
    {
        id: 1,
        name: "Chicken Karahi",
        description: "Traditional chicken karahi cooked with tomatoes, ginger, and green chilies",
        price: 1190,
        spiceLevel: "medium",
        isVeg: false,
        isBestseller: true,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Malai Boti",
        description: "Creamy marinated tender chicken pieces grilled to perfection",
        price: 990,
        spiceLevel: "mild",
        isVeg: false,
        isBestseller: true,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "Zinger Burger",
        description: "Crispy chicken fillet with mayo and fresh vegetables in a soft bun",
        price: 590,
        spiceLevel: "mild",
        isVeg: false,
        isBestseller: false,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Charga",
        description: "Deep-fried whole chicken with special spices, serves 2-3 people",
        price: 1990,
        spiceLevel: "medium",
        isVeg: false,
        isBestseller: true,
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=400&q=80"
    }
];

// --- SERVER-SAFE LOADER FUNCTION ---
// This function runs on the server during build (SSR)
export async function loader() {
    try {
        // NOTE: In a real environment, Vercel needs to know about the /api/menu/highlights endpoint.
        // For local development, this fetch might work.
        const response = await fetch('/api/menu/highlights');
        if (response.ok) {
            const data = await response.json();
            return json({ highlights: data });
        }
    } catch (error) {
        console.error('SERVER: Error fetching highlights, using fallback data.', error);
        // If fetch fails during SSR/Build, we safely return fallback data instead of crashing.
        return json({ highlights: fallbackHighlights });
    }
    // Return fallback if response wasn't OK
    return json({ highlights: fallbackHighlights });
}

// --- COMPONENT (Now receives data via props) ---
export default function MenuHighlights({ initialHighlights }) {
    // The component now uses the data passed from its parent (HomePage)
    const highlights = initialHighlights;
    
    // We keep the hovered state for UX
    const [hoveredCard, setHoveredCard] = useState(null);

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

    if (!highlights || highlights.length === 0) {
        // Return a loading state or nothing if data is empty, though fallback is used.
        return null; 
    }

    return (
        <section className="py-16 md:py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Our <span className="text-[#E63946]">Signature</span> Dishes
                    </h2>
                    <p className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto">
                        Discover the flavors that made us famous. Each dish is prepared with authentic spices and the finest ingredients.
                    </p>
                </div>

                {/* Menu Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                                hoveredCard === item.id ? 'transform scale-105' : ''
                            }`}
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                
                                {/* Bestseller Badge */}
                                {item.isBestseller && (
                                    <div className="absolute top-3 left-3 bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <Star size={12} className="fill-white" />
                                        Bestseller
                                    </div>
                                )}

                                {/* Veg/Non-Veg Indicator */}
                                <div className="absolute top-3 right-3">
                                    {item.isVeg ? (
                                        <div className="w-6 h-6 border-2 border-green-600 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 border-2 border-red-600 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-xl text-[#1A1A1A] group-hover:text-[#E63946] transition-colors">
                                        {item.name}
                                    </h3>
                                    {item.spiceLevel !== 'none' && (
                                        <div 
                                            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                                            style={{ 
                                                backgroundColor: `${getSpiceColor(item.spiceLevel)}20`,
                                                color: getSpiceColor(item.spiceLevel)
                                            }}
                                        >
                                            <span>{getSpiceIcon(item.spiceLevel)}</span>
                                            <span className="capitalize">{item.spiceLevel}</span>
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
                                    
                                    <button
                                        className="bg-[#E63946] hover:bg-[#D12B36] text-white p-3 rounded-xl transition-colors duration-200 flex items-center justify-center group-hover:scale-110 transform"
                                        onClick={() => {
                                            // Add to cart functionality
                                            console.log('Add to cart:', item);
                                        }}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Menu CTA */}
                <div className="text-center mt-12">
                    <a
                        href="/menu"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E63946] to-[#FF7F11] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <Flame size={20} />
                        View Complete Menu
                    </a>
                </div>
            </div>
        </section>
    );
}

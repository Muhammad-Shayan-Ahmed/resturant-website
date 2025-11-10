"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTag, setSelectedTag] = useState('all');
  const [availableTags, setAvailableTags] = useState(['all']);

  // Placeholder images since we don't have real gallery data yet
  const placeholderImages = [
    {
      id: 1,
      title: "Chicken Karahi",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80",
      alt_text: "Sizzling chicken karahi with fresh tomatoes and green chilies",
      tags: ["food", "karahi", "chicken"]
    },
    {
      id: 2,
      title: "BBQ Platter",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      alt_text: "Mixed BBQ platter with seekh kebabs and tikka",
      tags: ["food", "bbq", "grilled"]
    },
    {
      id: 3,
      title: "Restaurant Interior",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      alt_text: "Warm and cozy restaurant interior with family seating",
      tags: ["interior", "ambiance", "family"]
    },
    {
      id: 4,
      title: "Malai Boti",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
      alt_text: "Creamy malai boti grilled to perfection",
      tags: ["food", "boti", "grilled"]
    },
    {
      id: 5,
      title: "Family Dining",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      alt_text: "Happy family enjoying their meal together",
      tags: ["interior", "family", "dining"]
    },
    {
      id: 6,
      title: "Fresh Naan",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
      alt_text: "Freshly baked naan bread from our tandoor",
      tags: ["food", "bread", "fresh"]
    },
    {
      id: 7,
      title: "Zinger Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
      alt_text: "Crispy zinger burger with fresh vegetables",
      tags: ["food", "burger", "fast-food"]
    },
    {
      id: 8,
      title: "Kitchen Action",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      alt_text: "Our chefs preparing fresh food in the open kitchen",
      tags: ["kitchen", "chef", "preparation"]
    },
    {
      id: 9,
      title: "Biryani Special",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&q=80",
      alt_text: "Aromatic chicken biryani with raita and salad",
      tags: ["food", "biryani", "rice"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setImages(placeholderImages);
      
      // Extract unique tags
      const tags = ['all'];
      placeholderImages.forEach(img => {
        img.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      });
      setAvailableTags(tags);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredImages = selectedTag === 'all' 
    ? images 
    : images.filter(img => img.tags.includes(selectedTag));

  const openLightbox = (image, index) => {
    setSelectedImage({ ...image, index });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage({ ...filteredImages[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage({ ...filteredImages[prevIndex], index: prevIndex });
  };

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
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto">
              Take a visual journey through our delicious food, welcoming ambiance, 
              and the moments that make dining at Desi Flame special
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="py-8 px-6 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-150 capitalize ${
                  selectedTag === tag
                    ? 'bg-[#E63946] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {tag === 'all' ? 'All Photos' : tag.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image.image}
                    alt={image.alt_text}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {image.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-150"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-150"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-150"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt_text}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600 mb-4">{selectedImage.alt_text}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#FFF5F5] text-[#E63946] text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
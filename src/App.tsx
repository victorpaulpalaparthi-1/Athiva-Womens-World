import React, { useState, useMemo } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  Search, 
  ChevronDown, 
  CheckCircle, 
  Sparkles, 
  ShoppingBag, 
  Menu, 
  X, 
  Video, 
  ExternalLink,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { products, Product } from "./products";

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Video Consultation Booking State
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("11:00");
  const [bookingCategory, setBookingCategory] = useState("Bangles");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Floating WhatsApp Chat Balloon State
  const [chatOpened, setChatOpened] = useState(true);
  const [chatMsg, setChatMsg] = useState("");

  const phoneNumber = "918977600600"; // Updated WhatsApp number 8977600600

  // Categories list derived dynamically from products
  const categories = useMemo(() => {
    const all = ["All"];
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return [...all, ...unique];
  }, []);

  // Helper to extract numeric price for sorting
  const parsePrice = (priceStr: string) => {
    return Number(priceStr.replace(/[^0-9]/g, ""));
  };

  // Filter products based on search query & selected category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Sort products based on selected parameters
  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts];
    if (sortBy === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "alpha-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "alpha-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    return result;
  }, [filteredProducts, sortBy]);

  // Handle WhatsApp Order Trigger
  const triggerWhatsAppOrder = (product: Product) => {
    const text = `Namaste Athiva! I am browsing your online boutique collections and am interested in:
🛍️ *${product.name}*
🏷️ *Code:* ${product.id}
💰 *Price:* ${product.price}

Please share details regarding availability and delivery timings!`;
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(url, "_blank");
  };

  // Handle Video Call Booking Trigger
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) return;
    
    // Auto-generate deep WhatsApp message for booking request
    const bookingDetails = `Namaste Athiva! I've scheduled a Video Shopping Appointment via your store portal:
📅 *Date:* ${bookingDate}
⏰ *Preferred Time Slot:* ${bookingTime}
👤 *Name:* ${bookingName}
📱 *Contact Number:* ${bookingPhone}
🛍️ *Boutique Category:* ${bookingCategory}

Could you please confirm the availability of your specialist for this live custom consultation? Thank you!`;
    
    const encodedBooking = encodeURIComponent(bookingDetails);
    const url = `https://wa.me/${phoneNumber}?text=${encodedBooking}`;
    
    setBookingSuccess(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setBookingSuccess(false);
    }, 1500);
  };

  // Handle custom floating assistant text
  const triggerFloatingChat = () => {
    const defaultText = chatMsg || "Namaste Athiva! I would love to connect and check out your customized boutique items.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, "_blank");
  };

  // Boutique FAQs
  const faqs = [
    {
      question: "Do you offer customized outfits and matching bridal sets?",
      answer: "Yes, customization is our ultimate core speciality! At Athiva Women's World, we assist with personalized selection of matching sets, festive designs, and gift options tailored precisely to your preferences."
    },
    {
      question: "How do I place an order for my favorite items?",
      answer: "It is incredibly easy! Browse our premium collections grid, select the piece you love, and click 'Order via WhatsApp'. This instantly texts our store team with the product details. For special requests, simply schedule a Video Consultation or chat with us directly."
    },
    {
      question: "Do you offer shipping within India?",
      answer: "Absolutely! We ship our curated essentials and premium fashion products with high reliability all over India via partner express courier services."
    },
    {
      question: "What is your physical store address in Vijayawada?",
      answer: "Our flagship store is located at D.No 40-5-5, Sri Swathi Towers, Opposite Kandhari Hotel, Pinnamaneni Polyclinic Road, Sidhartha Nagar, Vijayawada, Andhra Pradesh, 520010. We are open from Monday through Saturday, between 10:00 AM and 09:00 PM."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 selection:bg-brand-pink/25 selection:text-brand-pink-dark">
      
      {/* 1. Header with Alpine.js structure for full compliance and dual React-control */}
      <header 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-pink-100"
        x-data="{ isOpen: false }"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          
          {/* Logo Brand Frame */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-pink rounded-lg px-2 py-1">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold bg-pink-50 flex items-center justify-center shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Athiva Women's World Logo" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-pink/5 hover:bg-transparent transition-colors duration-300" />
            </div>
            <div>
              <p className="font-display font-bold text-xl leading-none text-brand-pink tracking-tight flex items-center gap-1">
                Athiva
                <span className="text-brand-gold text-lg">✦</span>
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold-dark font-semibold mt-0.5">
                Women's World
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#collections" className="hover:text-brand-pink transition-colors duration-200">Collections</a>
            <a href="#video-consultation" className="hover:text-brand-pink transition-colors duration-200 flex items-center gap-1.5 py-1">
              <Video className="w-4 h-4 text-brand-pink animate-pulse" />
              Live Shopping
            </a>
            <a href="#store-info" className="hover:text-brand-pink transition-colors duration-200">Store Hours & Map</a>
            <a href="#faq" className="hover:text-brand-pink transition-colors duration-200">FAQs</a>
          </nav>

          {/* Action Call Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-brand-gold/30 hover:scale-[1.03]"
              style={{ minHeight: "48px" }}
            >
              <Phone className="w-3.5 h-3.5" />
              Direct WhatsApp
            </a>
          </div>

          {/* Mobile Drawer Button - Strict Touch Target Compliant (48px) */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            x-on:click="isOpen = !isOpen"
            className="md:hidden flex items-center justify-center p-3 text-brand-pink hover:bg-pink-50 rounded-lg transition-colors"
            style={{ minWidth: "48px", minHeight: "48px" }}
            aria-label="Toggle Navigation Drawer"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Alpine-compliant Lightweight CSS Mobile Drawer Overlays & Menus */}
        <div 
          className="md:hidden"
          x-show="isOpen"
          style={{ display: mobileMenuOpen ? "block" : "none" }}
        >
          {/* Backdrop screen */}
          <div 
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer Panel */}
          <aside className="fixed top-[73px] right-0 z-50 w-72 bg-white h-[calc(100vh-73px)] border-l border-pink-100 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto transform transition-transform">
            <div className="space-y-6">
              <p className="text-xs font-mono uppercase tracking-widest text-brand-gold-dark font-bold border-b border-pink-100 pb-2">
                Boutique Directory
              </p>
              <nav className="flex flex-col gap-1">
                <a 
                  href="#collections" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-brand-pink text-base font-medium py-3 px-3 hover:bg-pink-50 rounded-lg transition-colors"
                  style={{ minHeight: "48px" }}
                >
                  <span>Boutique Collections</span>
                  <ShoppingBag className="w-4 h-4 text-brand-pink/60" />
                </a>
                <a 
                  href="#video-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-brand-pink text-base font-medium py-3 px-3 hover:bg-pink-50 rounded-lg transition-colors"
                  style={{ minHeight: "48px" }}
                >
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-brand-pink" />
                    Book Video Consultant
                  </span>
                  <ExternalLink className="w-4 h-4 text-brand-gold/60" />
                </a>
                <a 
                  href="#store-info"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-brand-pink text-base font-medium py-3 px-3 hover:bg-pink-50 rounded-lg transition-colors"
                  style={{ minHeight: "48px" }}
                >
                  <span>Hours & Location</span>
                  <MapPin className="w-4 h-4 text-brand-pink/60" />
                </a>
                <a 
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-brand-pink text-base font-medium py-3 px-3 hover:bg-pink-50 rounded-lg transition-colors"
                  style={{ minHeight: "48px" }}
                >
                  <span>Frequently Asked FAQs</span>
                  <HelpCircle className="w-4 h-4 text-brand-pink/60" />
                </a>
              </nav>
            </div>

            <div className="space-y-4 border-t border-pink-100 pt-6">
              <a 
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-pink hover:bg-brand-pink-dark text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2.5 shadow-md py-3 shrink-0"
                style={{ minHeight: "48px" }}
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                Text Boutique on WhatsApp
              </a>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-wide font-mono font-bold">
                Vijayawada • Nagarjuna Nagar
              </p>
            </div>
          </aside>
        </div>
      </header>

      {/* 2. Hero Section - Intensely Beautiful */}
      <section className="relative bg-brand-pink-deep text-white overflow-hidden py-16 md:py-28">
        
        {/* Absolute Background image overlay */}
        <div className="absolute inset-0 opacity-25">
          <img 
            src="/images/hero_banner.jpg" 
            alt="Athiva Women's World Bridal Heritage" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-deep via-brand-pink-deep/85 to-transparent" />
        
        {/* Graphic Pattern */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-brand-gold/10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border-2 border-brand-pink/15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="max-w-xl text-center md:text-left space-y-6">
            
            {/* Elegant luxury chip */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
              PREMIUM COUTURE SHOWCASE
            </span>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
              Where Elegance Meets <span className="text-brand-gold underline decoration-brand-pink decoration-wavy decoration-1 underline-offset-8">Heritage</span>
            </h1>
            
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light font-sans">
              Discover Vijayawada's elite destination for handcrafted Kanchipuram silk sarees, opulent designer lehengas, custom-maggam blouses, and gorgeous antique jewelry. Elevate your traditional bridal signature with <span className="font-medium text-brand-gold">Athiva</span>.
            </p>

            {/* Direct Hero WhatsApp CTA Button with strict 48+ pixel touch targets */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a 
                href={`https://wa.me/${phoneNumber}?text=Namaste%20Athiva!%20I%20would%20love%20to%20view%20your%20latest%20festive%20and%20bridal%20collections.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-brand-pink/30 hover:scale-[1.02] flex items-center justify-center gap-3 transition-all duration-300 border border-brand-gold"
                style={{ minHeight: "48px" }}
              >
                <ShoppingBag className="w-4 h-4 text-brand-gold" />
                Order on WhatsApp
              </a>
              <a 
                href="#collections"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-medium px-8 py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                style={{ minHeight: "48px" }}
              >
                Explore Collections
              </a>
            </div>
          </div>

          {/* Featured Hero Side Widget */}
          <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-6 shrink-0 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold text-brand-gold shrink-0">
                <Video className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-wide text-white">Live Consultation</p>
                <p className="text-xs text-gray-300 font-light font-sans">Shop live via WhatsApp Video Call</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-200">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="font-light">Direct custom bridal fit configurations</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="font-light">High success ratings on global bridal shipments</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="font-light">Experienced personal stylists in Vijayawada</p>
              </div>
            </div>

            <a 
              href="#video-consultation"
              className="block text-center w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-pink-deep font-bold text-xs py-3 rounded-lg uppercase tracking-wider transition-all duration-300"
              style={{ minHeight: "48px" }}
            >
              Book Personal Slot
            </a>
          </div>

        </div>
      </section>

      {/* 3. collections Section - CSS Grid rendering items from products list */}
      <section id="collections" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Title Block */}
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-pink font-bold">
            Curated Treasures
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            Our Elite Designer Collections
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto rounded-full" />
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base font-light">
            Each artifact is selected with rigorous standards, combining premium traditional heritage fabrics with elite artisan tailoring of Vijayawada.
          </p>
        </div>

        {/* Dynamic Category Filter Scroller, Sort & Search Row */}
        <div className="space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-pink-100 pb-6">
            
            {/* Category Selector Side (Full Scrollable list + Mobile Dropdown helper) */}
            <div className="space-y-2 flex-1 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-pink block sm:hidden">
                Filter by Category
              </span>
              
              {/* Category Dropdown (visible ONLY on mobile for quick access) */}
              <div className="block sm:hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white text-sm border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink text-gray-700 font-medium"
                  style={{ minHeight: "48px" }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Swiper (Scrollable tags - hidden on mobile, visible on sm and up) */}
              <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none shrink-0 max-w-full">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-brand-pink shrink-0 cursor-pointer ${
                        isActive 
                          ? "bg-brand-pink text-white border-brand-pink shadow-md" 
                          : "bg-white text-gray-600 hover:text-brand-pink hover:bg-pink-50 border-pink-100"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort & Search Controls Side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              
              {/* Sort Dropdown Selector */}
              <div className="relative flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap hidden md:inline">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white text-sm border border-pink-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-pink pr-10 cursor-pointer w-full sm:w-52 text-gray-700 font-medium"
                  style={{ minHeight: "48px" }}
                >
                  <option value="default">✨ Recommended</option>
                  <option value="price-asc">💸 Price: Low to High</option>
                  <option value="price-desc">📈 Price: High to Low</option>
                  <option value="alpha-asc">🔤 Alphabetical: A to Z</option>
                  <option value="alpha-desc">🔤 Alphabetical: Z to A</option>
                </select>
              </div>

              {/* Keyword Search Overlay */}
              <div className="relative w-full sm:w-64">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-sm pl-10 pr-4 py-2.5 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all text-gray-700"
                  style={{ minHeight: "48px" }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-brand-pink text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Active stats bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono tracking-tight px-1">
            <span>
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
            </span>
            {(selectedCategory !== "All" || searchQuery !== "" || sortBy !== "default") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSortBy("default");
                }}
                className="text-brand-pink hover:underline uppercase tracking-wider font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Grid Layout Container */}
          <div className="relative">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-pink-100 rounded-2xl p-8 max-w-md mx-auto space-y-3">
                <ShoppingBag className="w-12 h-12 text-pink-200 mx-auto" />
                <p className="font-display font-medium text-lg text-gray-800">No products found</p>
                <p className="text-sm text-gray-500 font-light">We regularly update our collection. Please write to us via WhatsApp to inquire about customized requests.</p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setSortBy("default"); }}
                  className="text-xs font-bold text-brand-pink hover:underline uppercase tracking-wider cursor-pointer"
                  style={{ minHeight: "48px" }}
                >
                  Reset Filtering rules
                </button>
              </div>
            ) : (
              <motion.div 
                layout 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {sortedProducts.map((prod) => (
                    <motion.div
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Product Media Area */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Premium Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                          {prod.isPremium && (
                            <span className="bg-brand-pink text-white text-[10px] font-mono tracking-wider uppercase font-bold py-1 px-2.5 rounded-md shadow-sm border border-brand-gold/20">
                              Premium Choice
                            </span>
                          )}
                          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-semibold py-1 px-2.5 rounded-md tracking-wider">
                            {prod.category}
                          </span>
                        </div>

                        {/* Stock status indicator */}
                        {!prod.inStock && (
                          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center p-4">
                            <span className="bg-rose-600 text-white font-bold text-xs uppercase tracking-widest py-1.5 px-4 rounded-full">
                              Fully Booked
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Metadata Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-1.5">
                          <p className="font-display font-bold text-base text-gray-900 line-clamp-1 group-hover:text-brand-pink transition-colors">
                            {prod.name}
                          </p>
                          <p className="text-gray-500 text-xs font-light line-clamp-2 leading-relaxed">
                            {prod.description}
                          </p>
                        </div>

                        <div className="space-y-3.5">
                          {/* Price Tag Row */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-brand-pink">
                              {prod.price}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {prod.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* WhatsApp Purchase Button - Touch Compliant (48px) */}
                          <button
                            type="button"
                            onClick={() => triggerWhatsAppOrder(prod)}
                            disabled={!prod.inStock}
                            className={`w-full font-semibold rounded-xl text-xs py-3.5 flex items-center justify-center gap-2 border transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-pink active:scale-[0.98] ${
                              prod.inStock 
                                ? "bg-white border-brand-pink hover:bg-brand-pink text-brand-pink hover:text-white shadow-xs hover:shadow-brand-pink/10" 
                                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                            style={{ minHeight: "48px" }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            Order via WhatsApp
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>

      </section>

      {/* 4. Luxury Live Video-Call Consultation Booking Section */}
      <section id="video-consultation" className="py-20 bg-gradient-to-b from-white to-pink-50 border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Block Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-pink-100 text-brand-pink">
              <Video className="w-3.5 h-3.5" />
              LIVE EXCLUSIVE CONSULTATIONS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
              Unable to visit us? Shop Live via Video Call! 📹
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Experience the customized shopping journey at Athiva Women's World from the comfort of your home. Schedule a one-on-one live video walkthrough with our luxury bridal specialists. 
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-dark flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Choose Your Slot</p>
                  <p className="text-xs text-gray-500 font-light">Select your preferred appointment date and hour range.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-dark flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Specify Interests</p>
                  <p className="text-xs text-gray-500 font-light">Tell us whether you seek Bridal Kanchipurams, lehengas, blouses, or temple jewelry.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-dark flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Launch Live Tour</p>
                  <p className="text-xs text-gray-500 font-light">Our consultant will show you the fabrics, designs, and detailed embroidery in high-definition.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Booking Card Column */}
          <div className="lg:col-span-7 bg-white border border-pink-100 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />
            
            <p className="font-display font-semibold text-xl text-brand-pink-deep border-b border-pink-100 pb-4 mb-6">
              Reserve Video Consultation Slot
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 tracking-wide block">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Sravani Prasad"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full bg-slate-50 text-sm border border-pink-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                    style={{ minHeight: "48px" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 tracking-wide block">WhatsApp Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g., +91 94400 XXXXX"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full bg-slate-50 text-sm border border-pink-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                    style={{ minHeight: "48px" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 tracking-wide block">Preferred Date</label>
                  <input 
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50 text-sm border border-pink-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                    style={{ minHeight: "48px" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 tracking-wide block">Suitable Time Slot</label>
                  <select 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-slate-50 text-sm border border-pink-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    <option value="10:30">10:30 AM - 12:00 PM</option>
                    <option value="12:00">12:00 PM - 02:00 PM</option>
                    <option value="15:00">03:00 PM - 05:00 PM</option>
                    <option value="17:00">05:00 PM - 07:00 PM</option>
                    <option value="19:00">07:00 PM - 08:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 tracking-wide block">Core Collection of Interest</label>
                <select 
                  value={bookingCategory}
                  onChange={(e) => setBookingCategory(e.target.value)}
                  className="w-full bg-slate-50 text-sm border border-pink-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                  style={{ minHeight: "48px" }}
                >
                  <option value="Bridal Sarees">Traditional Bridal Kanchipurams</option>
                  <option value="Bridal & Lehengas">Designer Velvet Lehengas</option>
                  <option value="Kurtis & Suits">Premium Anarkali Suit Sets</option>
                  <option value="Antique Jewelry">Lakshmi Temple & Kundan Jewelry</option>
                  <option value="Designer Blouses">Custom Handcrafted Blouses</option>
                </select>
              </div>

              {/* Booking Submit Trigger - Strict Touch Requirement Complied */}
              <button
                type="submit"
                disabled={bookingSuccess}
                className="w-full bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold rounded-xl text-sm py-4 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer border border-brand-gold/30 hover:scale-[1.01]"
                style={{ minHeight: "48px" }}
              >
                {bookingSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-brand-gold animate-bounce" />
                    Connecting WhatsApp Booking Line...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-brand-gold" />
                    Book & Request on WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 5. Store Information and Maps Block */}
      <section id="store-info" className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-gold-dark font-semibold">
            Visit Our Sanctuary
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 leading-tight">
            Flagship Store Hours & Location
          </h2>
          <div className="h-1 w-16 bg-brand-pink mx-auto rounded-full" />
          <p className="text-gray-500 max-w-md mx-auto text-sm font-light">
            We are nestled in Vijayawada's vibrant heart. Stop by to inspect fabric textures, custom bridal embellishments, and antique jewelry patterns interactively.
          </p>
        </div>

        {/* Info Grid Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Store Hours panel */}
          <div className="lg:col-span-5 bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-8 shadow-sm">
            
            <div className="space-y-6">
              
              {/* Store Address Header */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100 text-brand-pink shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-base">Athiva Women's World</p>
                  <p className="text-sm text-gray-500 font-light mt-1">
                    D.No 40-5-5, Sri Swathi Towers, Opposite Kandhari Hotel,<br />Pinnamaneni Polyclinic Road, Sidhartha Nagar,<br />Vijayawada, Andhra Pradesh - 520010, India.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-pink-50" />

              {/* Timings */}
              <div className="space-y-3.5">
                <p className="font-semibold text-xs font-mono uppercase tracking-wider text-brand-gold-dark">
                  Store Hours
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Saturday</span>
                    <span>10:00 AM - 09:00 PM</span>
                  </div>
                  <div className="flex justify-between text-brand-pink font-semibold">
                    <span>Sunday</span>
                    <span className="bg-pink-100/60 px-2 py-0.5 rounded text-xs">By Appointment Only</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Helpline quick buttons */}
            <div className="space-y-3">
              <p className="text-xs text-gray-400 font-light font-sans">Have questions about parking, custom order pickups, or location assistance?</p>
              <div className="flex gap-3">
                <a 
                  href="tel:+918977600600" 
                  className="flex-1 bg-slate-50 hover:bg-pink-50 border border-pink-100 text-gray-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                  style={{ minHeight: "48px" }}
                >
                  <Phone className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                  Call Store Line
                </a>
                <a 
                  href={`https://wa.me/${phoneNumber}?text=Namaste!%20I%20am%20near%20Sidhartha%20Nagar%20and%20need%20directions%20to%20Athiva%20boutique.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
                  style={{ minHeight: "48px" }}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white shrink-0" />
                  Directions Chat
                </a>
              </div>
            </div>

          </div>

          {/* Map Frame Panel */}
          <div className="lg:col-span-7 bg-white border border-pink-100 rounded-3xl p-3 shadow-sm h-[380px] lg:h-auto overflow-hidden min-h-[300px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1s0x3a35fbcbe5147be1%3A0x67fa230e9d6d7e00!2sSri%20Swathi%20Towers%2C%20Pinnamaneni%20Polyclinic%20Rd%2C%20Sidhartha%20Nagar%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520010!5m2!1sen!2sin" 
              className="w-full h-full rounded-2xl border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Athiva flagship boutique location in Vijayawada"
            />
            <div className="absolute bottom-5 left-5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] md:text-xs py-1.5 px-3 rounded-lg shadow-md font-sans pointer-events-none border border-white/10">
              📍 Pinnamaneni Polyclinic Road, Sidhartha Nagar, Vijayawada
            </div>
          </div>

        </div>
      </section>

      {/* 6. Traditional FAQ Box - Strict 48px target constraint complied */}
      <section id="faq" className="py-20 bg-pink-100/35 border-t border-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="font-display font-bold text-3xl text-gray-900">
              Boutique FAQ & Policies
            </h2>
            <div className="h-1 w-12 bg-brand-gold mx-auto rounded-full" />
            <p className="text-gray-500 text-sm font-light">
              Find instant answers to inquiries regarding personalized fittings, bridal order delivery timeframes, and video walkthrough bookings.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isSelected = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-pink-100 rounded-2xl transition-all overflow-hidden shadow-xs hover:border-pink-200"
                >
                  {/* FAQ Header Accordion Toggle Button - Strict 48px touch target aligned */}
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isSelected ? null : index)}
                    className="w-full flex items-center justify-between text-left px-5 py-4 focus:outline-none focus:bg-pink-50/50 hover:bg-pink-50/30 transition-colors select-none text-gray-800 font-semibold group cursor-pointer"
                    style={{ minHeight: "56px" }} // Explicit height over 48px limit
                  >
                    <span className="text-sm md:text-base group-hover:text-brand-pink transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-brand-pink shrink-0 transform transition-transform duration-300 ${isSelected ? "rotate-180 text-brand-gold" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-gray-500 leading-relaxed font-light border-t border-pink-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 text-gray-400 border-t-2 border-brand-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-brand-gold bg-white/5 p-0.5 flex items-center justify-center">
                <img 
                  src="/images/logo.png" 
                  alt="Athiva Flagship Logo" 
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg tracking-tight">Athiva Women's World</p>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest font-mono font-semibold">Bridal Heritage Collection</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Serving the modern woman with fine traditional textiles. From pure zari bridal sarees to elite handcrafted embroidery blouses in Vijayawada.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <p className="text-white font-bold text-xs uppercase tracking-wider font-mono">Boutique Directory</p>
            <ul className="text-xs space-y-2.5 font-light">
              <li><a href="#collections" className="hover:text-brand-pink transition-colors">Curated Bridal Sarees</a></li>
              <li><a href="#collections" className="hover:text-brand-pink transition-colors">Velvet & Silk Designer Lehengas</a></li>
              <li><a href="#collections" className="hover:text-brand-pink transition-colors">Chic Kurtis & Floor-Length Suits</a></li>
              <li><a href="#video-consultation" className="hover:text-brand-pink transition-colors">Video Call Consultations</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <p className="text-white font-bold text-xs uppercase tracking-wider font-mono">Authorized Contact</p>
            <ul className="text-xs space-y-3 font-light text-gray-400">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
                <span>Sri Swathi Towers, Pinnamaneni Polyclinic Road, Vijayawada, AP, India</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-brand-pink shrink-0" />
                <a href="tel:+918977600600" className="hover:text-white transition-colors">+91 89776 00600</a>
              </li>
              <li className="flex gap-2 items-center">
                <Clock className="w-4 h-4 text-brand-pink shrink-0" />
                <span>Mon - Sat: 10 AM - 9 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Athiva Women's World. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Terms of Service</a>
            <a href="#store-info" className="hover:text-brand-pink transition-colors">Locations</a>
          </div>
        </div>
      </footer>

      {/* 8. Elegant Floating WhatsApp Assistant Widget with Integrated Custom Messaging Prompt */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-w-[325px] sm:max-w-sm">
        
        {/* Help Bubble dialog container */}
        <AnimatePresence>
          {chatOpened && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="bg-white border border-pink-100 rounded-2xl p-4 shadow-xl flex flex-col gap-3 relative pb-3 w-[280px] sm:w-[320px]"
            >
              <button 
                onClick={() => setChatOpened(false)}
                className="absolute top-2.5 right-2.5 text-gray-400 hover:text-brand-pink p-1 rounded-full hover:bg-slate-50 transition-colors"
                style={{ width: "24px", height: "24px" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <img 
                    src="/images/logo.png" 
                    alt="Athiva Boutique Assistant" 
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                  {/* Glowing online status led dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Athiva Boutique Helpdesk</p>
                  <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                    <span>●</span> Online (Ready to Help)
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 font-light pt-1 leading-relaxed">
                "Hello beautiful visitor! 🌸 Let me know what design embroidery, Kanchipuram silk, or customizable blouses you are looking for today."
              </p>

              {/* Chat custom message prompt input */}
              <div className="space-y-2 mt-1">
                <input 
                  type="text"
                  placeholder="Type what you seek here..."
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') triggerFloatingChat(); }}
                  className="w-full bg-slate-50 text-[11px] px-3 py-2 rounded-lg border border-pink-100 focus:outline-none focus:ring-1 focus:ring-brand-pink focus:border-brand-pink text-gray-700"
                />
                <button
                  type="button"
                  onClick={triggerFloatingChat}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-[11px] py-2 rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  style={{ minHeight: "36px" }}
                >
                  <MessageSquare className="w-3 h-3 text-white" />
                  Start WhatsApp Direct Chat
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Core Floating WhatsApp Trigger Button - strict 48px circle touch targets */}
        <button
          type="button"
          onClick={() => {
            if (!chatOpened) {
              setChatOpened(true);
            } else {
              triggerFloatingChat();
            }
          }}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-green-500/20 active:scale-95 transition-all cursor-pointer whatsapp-pulse"
          style={{ minWidth: "56px", minHeight: "56px" }}
          aria-label="Contact Athiva Women's World on WhatsApp"
        >
          <Phone className="w-6 h-6 text-white" />
        </button>

      </div>

    </div>
  );
}

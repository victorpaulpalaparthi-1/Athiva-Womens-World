/**
 * Athiva Women's World - Product Database
 * Use this file to easily add, remove, or edit your items.
 */

const products = [
  {
    id: "bangles-01",
    name: "Royal Antique Gold Kara Bangles",
    category: "Bangles",
    price: "₹2,499",
    originalPrice: "₹3,999",
    description: "Premium gold-plated heritage bangles adorned with semi-precious rubies and emeralds, perfect for bridal wear.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    isPremium: true,
    inStock: true
  },
  {
    id: "bindis-01",
    name: "Classic Velvet Kumkum Bindis Palette",
    category: "Bindis",
    price: "₹149",
    originalPrice: "₹249",
    description: "A deluxe compilation of premium velvet bindis in sizes ranging from micro to statement sizes, embellished with subtle crystal accents.",
    image: "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  },
  {
    id: "cosmetics-01",
    name: "Crimson Velvet Matte Lip Kit",
    category: "Cosmetics",
    price: "₹899",
    originalPrice: "₹1,299",
    description: "Long-lasting, smudge-proof crimson lip duo that enriches your traditional Indian wedding aesthetic with a matte velvet finish.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    isPremium: true,
    inStock: true
  },
  {
    id: "haircare-01",
    name: "Herbal Hair Vitality Elixir Oil",
    category: "Haircare",
    price: "₹549",
    originalPrice: "₹799",
    description: "Cold-pressed virgin coconut and organic amla recipe to nourish roots, restore natural dark shine, and support thick volume.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  },
  {
    id: "handbags-01",
    name: "Midnight Golden Jari Potli Clutch",
    category: "Handbags",
    price: "₹1,899",
    originalPrice: "₹2,799",
    description: "Exotic velvet drawstring potli meticulously hand-crafted with golden zari embroidery and premium pearl tassel detailing.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    isPremium: true,
    inStock: true
  },
  {
    id: "gifting-01",
    name: "Utsav Premium Dry Fruits Gift Box",
    category: "Gifting",
    price: "₹1,299",
    originalPrice: "₹1,899",
    description: "Intricately detailed metallic designer box filled with premium handpicked cashews, almonds, and traditional festive delights.",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  },
  {
    id: "jewellery-01",
    name: "Aditi Antique Temple Choker Set",
    category: "Jewellery",
    price: "₹4,999",
    originalPrice: "₹7,999",
    description: "Majestic Lakshmi motif antique gold collar set with premium ruby drops and matching statement jhumkas.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    isPremium: true,
    inStock: true
  },
  {
    id: "perfumes-01",
    name: "Royal Mogra Concentrated Perfume Oud",
    category: "Perfumes",
    price: "₹1,599",
    originalPrice: "₹2,399",
    description: "A captivating, long-lasting oriental fragrance absolute featuring intoxicating notes of fresh jasmine buds and amber sandarac.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  },
  {
    id: "personal-care-01",
    name: "Organic Sandalwood Radiance Bars Set",
    category: "Personal Care",
    price: "₹349",
    originalPrice: "₹499",
    description: "Artisanal slow-batch glow bars enriched with pure sandalwood oil and kasturi turmeric to revive skin tones with botanical nourishment.",
    image: "https://images.unsplash.com/photo-1607006342411-101c24172f2a?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  },
  {
    id: "soft-toys-01",
    name: "Classic Soft Golden Play Bear",
    category: "Soft Toys",
    price: "₹699",
    originalPrice: "₹999",
    description: "Ultra-plush Hypoallergenic cute stuffed toy perfect for premium child-safe gifting and nursery décor layouts.",
    image: "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  },
  {
    id: "seasonal-01",
    name: "Hand-painted Terracotta Diwali Diya Set",
    category: "Seasonal Items",
    price: "₹299",
    originalPrice: "₹499",
    description: "Set of 6 colorful hand-painted clay oil lamps embellished with intricate floral work for festive lighting.",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=600&q=80",
    isPremium: false,
    inStock: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}

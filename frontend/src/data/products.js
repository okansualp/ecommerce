export const products = [
  {
    id: 1,
    name: "Vintage Gramofon",
    description: "1960'lardan kalma, tamamen çalışır durumda klasik gramofon. Orijinal parçaları ve muhteşem ses kalitesiyle koleksiyonunuza değer katacak bir parça.",
    price: 2499.99,
    category: "Antika",
    image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=500",
    featured: true,
    stock: 1,
    specs: {
      year: "1960",
      condition: "İyi",
      brand: "Victrola",
      dimensions: "45x35x20 cm"
    }
  },
  {
    id: 2,
    name: "Retro Deri Ceket",
    description: "70'ler tarzı, hakiki deri, kahverengi vintage ceket. Minimal yıpranma izleriyle otantik görünüm.",
    price: 899.99,
    category: "Giyim",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    featured: true,
    stock: 3,
    specs: {
      size: "M/L",
      material: "Hakiki Deri",
      condition: "Çok İyi",
      year: "1970s"
    }
  },
  {
    id: 3,
    name: "Antika Cep Saati",
    description: "1920'lerden kalma, altın kaplama cep saati. Orijinal zinciri ve çalışır durumda mekanizmasıyla nadide bir parça.",
    price: 3499.99,
    category: "Aksesuar",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500",
    featured: true,
    stock: 1,
    specs: {
      year: "1920",
      material: "Altın Kaplama",
      diameter: "45mm",
      condition: "Mükemmel"
    }
  },
  {
    id: 4,
    name: "Vintage Polaroid Kamera",
    description: "1980'lerden orijinal Polaroid kamera. Test edilmiş, çalışır durumda. Nostaljik fotoğraf deneyimi için ideal.",
    price: 699.99,
    category: "Elektronik",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    featured: true,
    stock: 2,
    specs: {
      model: "SX-70",
      year: "1980",
      condition: "Çalışır",
      type: "Instant Camera"
    }
  },
  {
    id: 5,
    name: "Retro Radyo",
    description: "1950'lerden ahşap kasalı vintage radyo. Hem dekoratif hem de çalışır durumda.",
    price: 1299.99,
    category: "Elektronik",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500",
    featured: true,
    stock: 1,
    specs: {
      brand: "Philips",
      year: "1950s",
      material: "Ahşap",
      condition: "Restore Edilmiş"
    }
  },
  {
    id: 6,
    name: "Vintage Daktilo",
    description: "1940'lardan mekanik daktilo. Tamamen çalışır durumda, orijinal çantasıyla birlikte.",
    price: 1899.99,
    category: "Ofis",
    image: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=500",
    featured: true,
    stock: 1,
    specs: {
      brand: "Remington",
      year: "1940",
      condition: "İyi",
      keyboard: "Q Türkçe"
    }
  },
  {
    id: 7,
    name: "Retro Elbise",
    description: "1950'ler tarzı puantiyeli swing elbise. Rockabilly tarzı için ideal.",
    price: 599.99,
    category: "Giyim",
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500",
    featured: false,
    stock: 4,
    specs: {
      size: "S/M/L",
      material: "Pamuk",
      style: "Swing",
      pattern: "Puantiyeli"
    }
  },
  {
    id: 8,
    name: "Antika Duvar Saati",
    description: "Viktorya döneminden kalma pirinç detaylı duvar saati. Restorasyonu yapılmış, çalışır durumda.",
    price: 4999.99,
    category: "Ev Dekor",
    image: "https://images.unsplash.com/photo-1415604934674-561df9abf539?w=500",
    featured: false,
    stock: 1,
    specs: {
      year: "1880",
      material: "Ahşap/Pirinç",
      height: "95cm",
      condition: "Restore Edilmiş"
    }
  }
];

export const categories = [
  {
    name: "Antika",
    path: "/category/antique",
    description: "Nadide antika parçalar"
  },
  {
    name: "Vintage Giyim",
    path: "/category/clothing",
    description: "Retro kıyafetler"
  },
  {
    name: "Aksesuarlar",
    path: "/category/accessories",
    description: "Vintage aksesuarlar"
  },
  {
    name: "Ev Dekor",
    path: "/category/home-decor",
    description: "Nostaljik ev dekorasyon ürünleri"
  },
  {
    name: "Elektronik",
    path: "/category/electronics",
    description: "Klasik elektronik cihazlar"
  }
];

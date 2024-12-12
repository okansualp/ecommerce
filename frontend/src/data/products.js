export const products = [
  {
    id: 1,
    name: 'Kablosuz Kulaklık',
    description: 'Yüksek ses kalitesi, aktif gürültü önleme',
    price: 1299,
    oldPrice: 1499,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Elektronik',
    featured: true,
    specs: {
      brand: 'SoundMax',
      color: ['Siyah', 'Beyaz', 'Mavi'],
      features: [
        'Aktif Gürültü Önleme',
        'Bluetooth 5.0',
        '30 Saat Pil Ömrü',
        'Su Geçirmez'
      ],
      stock: 45
    }
  },
  {
    id: 2,
    name: 'Akıllı Saat',
    description: 'Fitness takibi, bildirimler ve şık tasarım',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Elektronik',
    featured: true,
    specs: {
      brand: 'TechWatch',
      color: ['Siyah', 'Gümüş'],
      features: [
        'Kalp Ritmi Ölçümü',
        'Uyku Takibi',
        'Su Geçirmez',
        'GPS'
      ],
      stock: 30
    }
  },
  {
    id: 3,
    name: 'Tablet',
    description: '10.5 inç ekran, 128GB depolama',
    price: 4999,
    oldPrice: 5999,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500',
    category: 'Elektronik',
    featured: true,
    specs: {
      brand: 'TechPro',
      color: ['Uzay Grisi', 'Gümüş', 'Altın'],
      features: [
        '10.5 inç Retina Ekran',
        '128GB Depolama',
        '8GB RAM',
        'Parmak İzi Okuyucu'
      ],
      stock: 15
    }
  },
  {
    id: 4,
    name: 'Akıllı Telefon',
    description: '6.7 inç OLED ekran, 256GB depolama',
    price: 14999,
    oldPrice: 16999,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'Elektronik',
    featured: true,
    specs: {
      brand: 'TechMobile',
      color: ['Siyah', 'Beyaz', 'Mavi'],
      features: [
        '6.7 inç OLED Ekran',
        '256GB Depolama',
        '12GB RAM',
        '108MP Kamera'
      ],
      stock: 20
    }
  },
  {
    id: 5,
    name: 'Kablosuz Hoparlör',
    description: '360° ses deneyimi, 24 saat pil ömrü',
    price: 899,
    oldPrice: 1199,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Elektronik',
    featured: true,
    specs: {
      brand: 'SoundMax',
      color: ['Siyah', 'Mavi', 'Kırmızı'],
      features: [
        '360° Ses',
        'Bluetooth 5.0',
        '24 Saat Pil Ömrü',
        'IPX7 Su Geçirmezlik'
      ],
      stock: 35
    }
  },
  {
    id: 6,
    name: 'Oyun Konsolu',
    description: '4K gaming, 1TB SSD, kablosuz kontrolcü',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500',
    category: 'Elektronik',
    featured: true,
    specs: {
      brand: 'GameTech',
      color: ['Siyah'],
      features: [
        '4K Gaming',
        '1TB SSD',
        'Ray Tracing',
        'Kablosuz Kontrolcü'
      ],
      stock: 10
    }
  }
]

export const categories = [
  { 
    id: 1, 
    name: 'Elektronik',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
    subCategories: ['Telefonlar', 'Tabletler', 'Kulaklıklar', 'Akıllı Saatler']
  },
  { 
    id: 2, 
    name: 'Moda',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
    subCategories: ['Kadın', 'Erkek', 'Çocuk', 'Ayakkabı']
  },
  { 
    id: 3, 
    name: 'Ev & Yaşam',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500',
    subCategories: ['Mobilya', 'Dekorasyon', 'Aydınlatma', 'Mutfak']
  },
  { 
    id: 4, 
    name: 'Spor',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    subCategories: ['Spor Giyim', 'Spor Aletleri', 'Outdoor', 'Fitness']
  }
]

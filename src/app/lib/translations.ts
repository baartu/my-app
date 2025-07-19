export type Language = 'tr' | 'en';

export interface Translations {
  // Home
  home: {
    title: string;
    subtitle: string;
  };
  
  // About
  about: {
    title: string;
    content: string;
  };
  
  // Services
  services: {
    consulting: {
      title: string;
      content: string;
    };
    contactButton: string;
  };
  
  // Mission
  mission: {
    title: string;
    paragraph1: {
      bold: string;
      text: string;
    };
    paragraph2: string;
  };
  
  // Featured Services
  featuredServices: {
    title: string;
    dataAnalysis: {
      title: string;
      description: string;
    };
    visualization: {
      title: string;
      description: string;
    };
    prediction: {
      title: string;
      description: string;
    };
  };
  
  // Footer
  footer: {
    topic: string;
    page: string;
    copyright: string;
  };
  
  // Contact
  contact: {
    title: string;
    successMessage: string;
    form: {
      fullName: string;
      email: string;
      subject: string;
      message: string;
      send: string;
    };
  };
  
  // Certificates
  certificates: {
    title: string;
    subtitle: string;
    description: string;
  };
  
  // Education Packages
  educationPackages: {
    title: string;
    contactButton: string;
    featured: {
      title: string;
      description: string;
      price: string;
    };
    product1: {
      title: string;
      description: string;
      price: string;
    };
    product2: {
      title: string;
      description: string;
      price: string;
    };
  };
  
  // AI Solutions
  aiSolutions: {
    title: string;
    card1: {
      title: string;
      description: string;
    };
    card2: {
      title: string;
      description: string;
    };
    card3: {
      title: string;
      description: string;
    };
    card4: {
      title: string;
      description: string;
    };
  };
  
  // Portfolio
  portfolio: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    projectsFound: string;
    published: string;
    technologies: string;
    viewDetails: string;
    noProjectsFound: string;
    tryDifferentSearch: string;
    selectDateRange: string;
    selectDateRangeTitle: string;
    selected: string;
    clear: string;
    project: string;
    description: string;
    date: string;
    yes: string;
    no: string;
    gallery: string;
    previous: string;
    next: string;
    close: string;
    largeImage: string;
  };
  
  // Careers
  careers: {
    title: string;
    searchPlaceholder: string;
    all: string;
    remote: string;
    onSite: string;
    hybrid: string;
    type: string;
    location: string;
    details: string;
    apply: string;
    contactInfo: string;
    contactUs: string;
    applyForPosition: string;
    applicationForm: string;
    fullName: string;
    email: string;
    position: string;
    coverLetter: string;
    cvPdf: string;
    sendApplication: string;
    onlyPdfAllowed: string;
    applicationSent: string;
  };
  
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    blog: string;
    career: string;
    contact: string;
  };
  
  // Blog
  blog: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allPosts: string;
    postsFound: string;
    readMore: string;
    noPostsFound: string;
    noPostsMessage: string;
    breadcrumb: string;
    backToAll: string;
  };
  
  // Admin Panel
  admin: {
    title: string;
    blog: string;
    career: string;
    project: string;
    applications: string;
    addNew: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    confirmDelete: string;
    success: string;
    error: string;
    loading: string;
    
    // Blog fields
    blogTitle: string;
    blogDescription: string;
    blogContent: string;
    blogDate: string;
    blogTag: string;
    blogSlug: string;
    
    // Career fields
    careerName: string;
    careerType: string;
    careerLocation: string;
    careerContent: string;
    careerSlug: string;
    
    // Project fields
    projectTitle: string;
    projectDescription: string;
    projectShortDescription: string;
    projectTechnologies: string;
    projectSlug: string;
    projectStatus: string;
    projectDate: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    all: string;
  };
}

export const translations: Record<Language, Translations> = {
  tr: {
    home: {
      title: 'Yapay Zeka ile Tarihi Yeniden Keşfet',
      subtitle: 'DeepHist, veriler aracılığıyla geçmişi çözümler ve geleceğe dair öngörüler sunar.',
    },
    about: {
      title: 'Tarihçe',
      content: 'DeepHist, yapay zeka teknolojileri kullanarak tarihi verileri analiz eden ve geçmişi yeniden keşfetmemizi sağlayan bir platformdur. Veri bilimi ve makine öğrenmesi teknikleri ile tarihi olayları, sosyal değişimleri ve kültürel evrimi anlamamıza yardımcı olur.',
    },
    services: {
      consulting: {
        title: 'Danışmanlık',
        content: 'Yapay zeka ve veri analizi konularında uzman danışmanlık hizmetleri sunuyoruz. Tarihi verilerin analizi, makine öğrenmesi modelleri ve veri görselleştirme konularında destek sağlıyoruz.',
      },
      contactButton: 'İletişime Geç',
    },
    mission: {
      title: 'Misyonumuz',
      paragraph1: {
        bold: 'DeepHist olarak misyonumuz',
        text: ', yapay zeka ve veri analitiği teknolojilerini kullanarak tarihî verileri anlamlandırmak, geçmişin derinliklerini daha net görmek ve araştırmacılara, eğitimcilere ve tarih meraklılarına güvenilir dijital çözümler sunmaktır.',
      },
      paragraph2: 'Geçmişin izlerini modern teknolojilerle birleştiriyor, tarihi yeniden keşfetmeyi mümkün kılıyoruz.',
    },
    featuredServices: {
      title: 'Öne Çıkan Hizmetler',
      dataAnalysis: {
        title: 'Veri Analizi',
        description: 'Tarihî verileri yapay zeka ile analiz ederek anlamlı içgörüler sağlıyoruz.',
      },
      visualization: {
        title: 'Görselleştirme',
        description: 'Zaman çizgileri, grafikler ve interaktif araçlarla veriyi anlaşılır hale getiriyoruz.',
      },
      prediction: {
        title: 'Tarihi Tahminleme',
        description: 'Modellemelerle geçmiş eğilimleri inceleyerek gelecek hakkında tahminlerde bulunuyoruz.',
      },
    },
    footer: {
      topic: 'Konu',
      page: 'Sayfa',
      copyright: 'Tüm hakları saklıdır.',
    },
    contact: {
      title: 'İletişim',
      successMessage: 'Mesajınız başarıyla gönderildi!',
      form: {
        fullName: 'Ad Soyad',
        email: 'E-posta',
        subject: 'Konu',
        message: 'Mesajınız',
        send: 'Gönder',
      },
    },
    certificates: {
      title: 'Sertifikalarımız',
      subtitle: 'Belgelerimizle Gurur Duyuyoruz.',
      description: 'Sertifikalarımız, kalitemizin ve uzmanlığımızın bir göstergesidir.',
    },
    educationPackages: {
      title: 'Eğitim Paketleri',
      contactButton: 'Paketleri İncele',
      featured: {
        title: 'Öne Çıkan Paket',
        description: 'En popüler ve en yüksek değerlendirmeye sahip paketimiz.',
        price: '1200 TL',
      },
      product1: {
        title: 'Temel Paket',
        description: 'Temel eğitim ve bilgi paylaşımı için en uygun paket.',
        price: '500 TL',
      },
      product2: {
        title: 'Gelişmiş Paket',
        description: 'Gelişmiş özelliklerle birlikte en iyi seçenek.',
        price: '800 TL',
      },
    },
    aiSolutions: {
      title: 'Yapay Zeka Çözümleri',
      card1: {
        title: 'Veri Analizi',
        description: 'Tarihi verileri derinlemesine analiz ederek anlamlı içgörüler elde edin.',
      },
      card2: {
        title: 'Görselleştirme',
        description: 'Zaman çizgileri, grafikler ve interaktif araçlarla veriyi anlaşılır hale getirin.',
      },
      card3: {
        title: 'Tahminleme',
        description: 'Modellemelerle geçmiş eğilimleri inceleyerek gelecek hakkında tahminlerde bulunun.',
      },
      card4: {
        title: 'İşlem Otomasyonu',
        description: 'Yapay zeka teknolojileri ile veri işleme süreçlerini optimize edin.',
      },
    },
    portfolio: {
      title: 'Portföy',
      subtitle: 'Yapılan Projelerimiz',
      searchPlaceholder: 'Portföyde ara...',
      projectsFound: 'projeye bulundu',
      published: 'Yayınlanan',
      technologies: 'Teknolojiler',
      viewDetails: 'Detayları Görüntüle',
      noProjectsFound: 'Proje bulunamadı',
      tryDifferentSearch: 'Arama kriterlerinizi değiştirin.',
      selectDateRange: 'Tarih Aralığı',
      selectDateRangeTitle: 'Tarih Aralığı Seçin',
      selected: 'Seçili',
      clear: 'Temizle',
      project: 'Proje',
      description: 'Açıklama',
      date: 'Tarih',
      yes: 'Evet',
      no: 'Hayır',
      gallery: 'Galeri',
      previous: 'Önceki',
      next: 'Sonraki',
      close: 'Kapat',
      largeImage: 'Büyük Görüntü',
    },
    careers: {
      title: 'Kariyer',
      searchPlaceholder: 'Kariyerde ara...',
      all: 'Tümü',
      remote: 'Uzaktan',
      onSite: 'Ofis',
      hybrid: 'Hibrit',
      type: 'Pozisyon Türü',
      location: 'Konum',
      details: 'Detaylar',
      apply: 'Başvur',
      contactInfo: 'İletişim Bilgileri',
      contactUs: 'İletişime Geç',
      applyForPosition: 'Bu Pozisyonu Başvur',
      applicationForm: 'Başvuru Formu',
      fullName: 'Ad Soyad',
      email: 'E-posta',
      position: 'Pozisyon',
      coverLetter: 'Ön Yüzey',
      cvPdf: 'CV (PDF)',
      sendApplication: 'Başvuru Gönder',
      onlyPdfAllowed: 'Sadece PDF dosyası gönderilebilir.',
      applicationSent: 'Başvuru başarıyla gönderildi!',
    },
    nav: {
      home: 'Anasayfa',
      about: 'Hakkımızda',
      services: 'Hizmetler',
      projects: 'Projeler / Portföy',
      blog: 'Blog / Haberler',
      career: 'Kariyer',
      contact: 'İletişim',
    },
    blog: {
      title: 'Blog / Haberler',
      subtitle: 'En güncel teknoloji haberleri, projelerimiz ve sektördeki yenilikler hakkında bilgi alın.',
      searchPlaceholder: 'Blog içinde ara...',
      allPosts: 'Hepsi',
      postsFound: 'blog yazısı bulundu',
      readMore: 'Devamını oku →',
      noPostsFound: 'Blog yazısı bulunamadı',
      noPostsMessage: 'Arama kriterlerinizi değiştirmeyi deneyin.',
      breadcrumb: 'Blog',
      backToAll: 'Tüm blog yazılarına dön',
    },
    admin: {
      title: 'Admin Paneli',
      blog: 'Blog Yönetimi',
      career: 'Kariyer Yönetimi',
      project: 'Proje Yönetimi',
      applications: 'Kariyer Başvuruları',
      addNew: 'Yeni Ekle',
      edit: 'Düzenle',
      delete: 'Sil',
      save: 'Kaydet',
      cancel: 'İptal',
      confirmDelete: 'Bu öğeyi silmek istediğinizden emin misiniz?',
      success: 'Başarılı!',
      error: 'Hata!',
      loading: 'Yükleniyor...',
      
      blogTitle: 'Başlık',
      blogDescription: 'Açıklama',
      blogContent: 'İçerik (Markdown)',
      blogDate: 'Tarih',
      blogTag: 'Etiket',
      blogSlug: 'Slug',
      
      careerName: 'Pozisyon Adı',
      careerType: 'Pozisyon Türü',
      careerLocation: 'Konum',
      careerContent: 'İçerik',
      careerSlug: 'Slug',
      
      projectTitle: 'Proje Başlığı',
      projectDescription: 'Proje Açıklaması',
      projectShortDescription: 'Kısa Açıklama',
      projectTechnologies: 'Teknolojiler',
      projectSlug: 'Slug',
      projectStatus: 'Durum',
      projectDate: 'Tarih',
    },
    common: {
      loading: 'Yükleniyor...',
      error: 'Hata',
      success: 'Başarılı',
      save: 'Kaydet',
      cancel: 'İptal',
      delete: 'Sil',
      edit: 'Düzenle',
      add: 'Ekle',
      search: 'Ara',
      filter: 'Filtrele',
      all: 'Hepsi',
    },
  },
  en: {
    home: {
      title: 'Rediscover History with Artificial Intelligence',
      subtitle: 'DeepHist solves the past through data and provides insights for the future.',
    },
    about: {
      title: 'History',
      content: 'DeepHist is a platform that analyzes historical data using artificial intelligence technologies and allows us to rediscover the past. It helps us understand historical events, social changes, and cultural evolution through data science and machine learning techniques.',
    },
    services: {
      consulting: {
        title: 'Consulting',
        content: 'We provide expert consulting services in artificial intelligence and data analysis. We offer support in historical data analysis, machine learning models, and data visualization.',
      },
      contactButton: 'Contact Us',
    },
    mission: {
      title: 'Our Mission',
      paragraph1: {
        bold: 'As DeepHist, our mission',
        text: ' is to make sense of historical data using artificial intelligence and data analytics technologies, to see the depths of the past more clearly, and to provide reliable digital solutions to researchers, educators, and history enthusiasts.',
      },
      paragraph2: 'We combine the traces of the past with modern technologies, making it possible to rediscover history.',
    },
    featuredServices: {
      title: 'Featured Services',
      dataAnalysis: {
        title: 'Data Analysis',
        description: 'We provide meaningful insights by analyzing historical data with artificial intelligence.',
      },
      visualization: {
        title: 'Visualization',
        description: 'We make data understandable with timelines, graphs, and interactive tools.',
      },
      prediction: {
        title: 'Historical Prediction',
        description: 'We make predictions about the future by examining past trends through modeling.',
      },
    },
    footer: {
      topic: 'Topic',
      page: 'Page',
      copyright: 'All rights reserved.',
    },
    contact: {
      title: 'Contact',
      successMessage: 'Your message has been sent successfully!',
      form: {
        fullName: 'Full Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send',
      },
    },
    certificates: {
      title: 'Our Certificates',
      subtitle: 'We Are Proud of Our Documents.',
      description: 'Our certificates are an indicator of our quality and expertise.',
    },
    educationPackages: {
      title: 'Education Packages',
      contactButton: 'View Packages',
      featured: {
        title: 'Featured Package',
        description: 'Our most popular and highest rated package.',
        price: '$1200',
      },
      product1: {
        title: 'Basic Package',
        description: 'The most suitable package for basic education and knowledge sharing.',
        price: '$500',
      },
      product2: {
        title: 'Advanced Package',
        description: 'The best option with advanced features.',
        price: '$800',
      },
    },
    aiSolutions: {
      title: 'AI Solutions',
      card1: {
        title: 'Data Analysis',
        description: 'Analyze historical data deeply to gain meaningful insights.',
      },
      card2: {
        title: 'Visualization',
        description: 'Make data understandable with timelines, graphs, and interactive tools.',
      },
      card3: {
        title: 'Prediction',
        description: 'Make predictions about the future by examining past trends through modeling.',
      },
      card4: {
        title: 'Automation',
        description: 'Optimize data processing with artificial intelligence technologies.',
      },
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Our Completed Projects',
      searchPlaceholder: 'Search portfolio...',
      projectsFound: 'project found',
      published: 'Published',
      technologies: 'Technologies',
      viewDetails: 'View Details',
      noProjectsFound: 'No projects found',
      tryDifferentSearch: 'Try different search criteria.',
      selectDateRange: 'Date Range',
      selectDateRangeTitle: 'Select Date Range',
      selected: 'Selected',
      clear: 'Clear',
      project: 'Project',
      description: 'Description',
      date: 'Date',
      yes: 'Yes',
      no: 'No',
      gallery: 'Gallery',
      previous: 'Previous',
      next: 'Next',
      close: 'Close',
      largeImage: 'Large Image',
    },
    careers: {
      title: 'Careers',
      searchPlaceholder: 'Search careers...',
      all: 'All',
      remote: 'Remote',
      onSite: 'On-site',
      hybrid: 'Hybrid',
      type: 'Position Type',
      location: 'Location',
      details: 'Details',
      apply: 'Apply',
      contactInfo: 'Contact Information',
      contactUs: 'Contact Us',
      applyForPosition: 'Apply for this Position',
      applicationForm: 'Application Form',
      fullName: 'Full Name',
      email: 'Email',
      position: 'Position',
      coverLetter: 'Cover Letter',
      cvPdf: 'CV (PDF)',
      sendApplication: 'Send Application',
      onlyPdfAllowed: 'Only PDF files are allowed.',
      applicationSent: 'Application sent successfully!',
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects / Portfolio',
      blog: 'Blog / News',
      career: 'Career',
      contact: 'Contact',
    },
    blog: {
      title: 'Blog / News',
      subtitle: 'Get information about the latest technology news, our projects, and innovations in the sector.',
      searchPlaceholder: 'Search in blog...',
      allPosts: 'All',
      postsFound: 'blog posts found',
      readMore: 'Read more →',
      noPostsFound: 'No blog posts found',
      noPostsMessage: 'Try changing your search criteria.',
      breadcrumb: 'Blog',
      backToAll: 'Back to all blog posts',
    },
    admin: {
      title: 'Admin Panel',
      blog: 'Blog Management',
      career: 'Career Management',
      project: 'Project Management',
      applications: 'Career Applications',
      addNew: 'Add New',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      confirmDelete: 'Are you sure you want to delete this item?',
      success: 'Success!',
      error: 'Error!',
      loading: 'Loading...',
      
      blogTitle: 'Title',
      blogDescription: 'Description',
      blogContent: 'Content (Markdown)',
      blogDate: 'Date',
      blogTag: 'Tag',
      blogSlug: 'Slug',
      
      careerName: 'Position Name',
      careerType: 'Position Type',
      careerLocation: 'Location',
      careerContent: 'Content',
      careerSlug: 'Slug',
      
      projectTitle: 'Project Title',
      projectDescription: 'Project Description',
      projectShortDescription: 'Short Description',
      projectTechnologies: 'Technologies',
      projectSlug: 'Slug',
      projectStatus: 'Status',
      projectDate: 'Date',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
    },
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
} 
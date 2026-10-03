export const personalData = {
  name: "Abdelrahman Hassan Mohamed",
  displayName: "Abdelrahman Hassan",
  title: "Back-End Developer | Laravel Specialist",
  tagline: "Building scalable, high-performance backends & robust APIs",
  typingTexts: [
    "Laravel & PHP Specialist",
    "High-Performance Database Architect",
    "Scalable RESTful APIs Engineer",
    "MySQL · Redis · Sanctum Auth"
  ],
  bio: "Backend Engineer specialized in Laravel, building secure, high-throughput RESTful APIs and optimizing database architectures with MySQL and Redis. Dedicated to clean architecture, SOLID principles, and production reliability.",
  shortAbout: "Computer Science & Software Engineering student at Mansoura University, crafting production-ready web platforms, enterprise systems, and intelligent API integrations.",
  location: "Mansoura, Egypt",
  email: "abdelrahmanhasan020@gmail.com",
  phone: "+20 100 473 2940",
  phoneRaw: "01004732940",
  whatsapp: "https://wa.me/201004732940",
  github: "https://github.com/Abdelrahman5884",
  linkedin: "https://www.linkedin.com/in/abdelrahman-hassan-809b3b339/",
  cvUrl: "/cv.pdf",
  // The 3 authentic portraits distributed across sections:
  heroImage: "/images/abdelrahman_suit.jpg",         // 1. Formal Suit with Glasses (Hero)
  aboutImage: "/images/abdelrahman_casual_new.png",    // 2. Casual Balenciaga Shirt (About Me)
  journeyImage: "/images/abdelrahman_suit_car.jpg",   // 3. Full Suit by Car (Journey & ITI)
  stats: [
    { label: "Years Experience", value: "2+", icon: "fa-calendar-check" },
    { label: "Production Projects", value: "8+", icon: "fa-diagram-project" },
    { label: "ITI Certified Hours", value: "150h", icon: "fa-certificate" },
    { label: "Engineering @ Mansoura", value: "CS", icon: "fa-graduation-cap" }
  ]
};

export const skillsCategories = [
  {
    category: "Backend Development",
    icon: "fa-server",
    skills: [
      { name: "Laravel (PHP)", icon: "fa-brands fa-laravel", highlight: true },
      { name: "RESTful API Design", icon: "fa fa-network-wired", highlight: true },
      { name: "Authentication & Sanctum", icon: "fa fa-shield-halved", highlight: false },
      { name: "Middleware & Policies", icon: "fa fa-user-lock", highlight: false },
      { name: "Eloquent ORM & Relations", icon: "fa fa-cubes", highlight: false },
      { name: "Caching & Queues (Redis)", icon: "fa fa-bolt", highlight: true },
      { name: "Unit & Feature Testing (PHPUnit)", icon: "fa fa-vial-circle-check", highlight: false },
      { name: "Blade Templates", icon: "fa fa-layer-group", highlight: false }
    ]
  },
  {
    category: "Database & Architecture",
    icon: "fa-database",
    skills: [
      { name: "MySQL Schema Design", icon: "fa fa-database", highlight: true },
      { name: "Migrations & Seeders", icon: "fa fa-seedling", highlight: false },
      { name: "Query Optimization & Indexing", icon: "fa fa-gauge-high", highlight: true },
      { name: "Database Transactions", icon: "fa fa-arrow-right-arrow-left", highlight: false },
      { name: "Redis Caching & Sessions", icon: "fa fa-bolt-lightning", highlight: true }
    ]
  },
  {
    category: "Programming & Core",
    icon: "fa-code",
    skills: [
      { name: "OOP & SOLID Principles", icon: "fa fa-cubes-stacked", highlight: true },
      { name: "Data Structures & Algorithms", icon: "fa fa-diagram-project", highlight: true },
      { name: "PHP 8.x", icon: "fa-brands fa-php", highlight: true },
      { name: "C++", icon: "fa fa-terminal", highlight: false },
      { name: "C#", icon: "fa fa-laptop-code", highlight: false },
      { name: "Python", icon: "fa-brands fa-python", highlight: false }
    ]
  },
  {
    category: "Tools, DevOps & Cloud",
    icon: "fa-toolbox",
    skills: [
      { name: "Git & GitHub", icon: "fa-brands fa-github", highlight: true },
      { name: "AWS EC2", icon: "fa-brands fa-aws", highlight: true },
      { name: "Postman API Testing", icon: "fa fa-paper-plane", highlight: false },
      { name: "Apache & XAMPP", icon: "fa fa-server", highlight: false },
      { name: "VS Code & PhpStorm", icon: "fa fa-file-code", highlight: false }
    ]
  },
  {
    category: "Frontend & Web",
    icon: "fa-desktop",
    skills: [
      { name: "HTML5 & CSS3", icon: "fa-brands fa-html5", highlight: false },
      { name: "JavaScript", icon: "fa-brands fa-js", highlight: false },
      { name: "Bootstrap", icon: "fa-brands fa-bootstrap", highlight: false },
      { name: "jQuery", icon: "fa fa-code", highlight: false }
    ]
  }
];

export const educationData = [
  {
    faculty: "Faculty of Computer & Information Sciences",
    institution: "Mansoura University",
    degree: "Computer Science / Software Engineering focus",
    period: "10/2023 – 10/2026",
    status: "Currently Enrolled",
    highlight: "Major in Software Engineering. Focusing on scalable system design, distributed databases, data structures, and advanced algorithm optimization."
  },
  {
    faculty: "Faculty of Computer & Artificial Intelligence",
    institution: "Beni-Suef University",
    degree: "Foundational Computer Science",
    period: "10/2022 – 06/2023",
    status: "Transferred to Mansoura University",
    highlight: "Acquired core programming principles, discrete mathematics, object-oriented concepts, and computer architecture."
  }
];

export const projectsData = [
  {
    id: "diagnosense",
    title: "DiagnoSense",
    category: "Healthcare & AI",
    tagline: "AI-Driven Clinical Diagnostics & Patient Analytics Dashboard",
    description: "An advanced clinician intelligence platform designed to help doctors analyze patient medical records, extract clinical data, and compare test results in one place. Provides intelligent medical summaries, biomarker trend tracking (HbA1c, CRP, TSH), and high-confidence AI diagnosis suggestions.",
    image: "/images/diagnosense.jpg",
    website: "https://diagnosense.vercel.app/",
    github: "https://github.com/Abdelrahman5884",
    linkedin: "https://www.linkedin.com/in/abdelrahman-hassan-809b3b339/",
    technologies: ["Laravel", "RESTful APIs", "MySQL", "NLP & AI Analytics", "Data Visualization", "Sanctum Auth"],
    features: [
      "AI Medical Summary aggregating longitudinal patient condition records",
      "Dynamic biomarker trend tracking and abnormal lab result alerts",
      "Confidence-scored clinical insights with customizable physician review workflows",
      "Strict HIPAA-aligned role-based access policies for patient confidentiality"
    ]
  },
  {
    id: "smart-learn",
    title: "Smart Learn",
    category: "AI & EdTech",
    tagline: "AI-Powered Next-Gen Learning Ecosystem",
    description: "Smart Learn is a comprehensive e-learning platform designed to simplify the learning process and educational content management. Features interactive AI tutoring chatbot with session memory, course progress milestones, automated student assessment quizzes, and certificates.",
    image: "/images/smartlearn.png",
    website: "https://smart-learn-dusky.vercel.app/",
    github: "https://github.com/Abdelrahman5884/Smart-Learn",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_webdevelopment-php-laravel-activity-7370444747905142784-XNJK",
    technologies: ["Laravel", "REST APIs", "MySQL", "NLP AI", "Authentication", "Sanctum"],
    features: [
      "Context-aware AI tutor chatbot with session memory",
      "Student progress and course performance analytics",
      "Secure token-based authentication with Laravel Sanctum",
      "Optimized query execution for fast question retrieval"
    ]
  },
  {
    id: "azul",
    title: "AZUL",
    category: "AI & Hospitality",
    tagline: "AI Hotel Guest Support & Meta API Platform (Aeroenix)",
    description: "Contributed to the development of Aeroenix / AZUL, an AI-powered customer service platform for hotels, as part of a development team at Aeroenix Company. Integrated Meta APIs to manage guest conversations across social media, automated customer interactions using AI, and implemented real-time notifications.",
    image: "/images/azul.jpg",
    website: "https://azull.vercel.app/en/admin/login",
    github: "https://github.com/Abdelrahman5884",
    linkedin: "https://www.linkedin.com/in/abdelrahman-hassan-809b3b339/",
    technologies: ["Laravel", "Meta Graph APIs", "MySQL", "AI NLP Automation", "RESTful APIs", "WebSockets"],
    features: [
      "Meta APIs integration for omni-channel WhatsApp & Messenger hospitality support",
      "Automated AI response engine handling guest booking and concierge inquiries",
      "Real-time desk notification dispatch and agent conversation assignment",
      "Centralized guest lifecycle analytics and hotel staff management portal"
    ]
  },
  {
    id: "motafawweq",
    title: "Motafawweq (المتفوق)",
    category: "AI & EdTech",
    tagline: "Large-Scale Educational Platform with AI Mind Mapping & Speech-to-Text",
    description: "A large-scale educational platform designed for students, teachers, educational centers, and parents. Offers an integrated learning environment featuring lesson management, interactive assessments, AI-powered speech-to-text lecture transcriptions, and interactive mind maps.",
    image: "/images/motafawweq.jpg",
    website: "https://motafawweq.vercel.app/",
    github: "https://github.com/Abdelrahman5884",
    linkedin: "https://www.linkedin.com/in/abdelrahman-hassan-809b3b339/",
    technologies: ["React.js", "Laravel", "MySQL", "Audio Transcription APIs", "AI Mind Map Generator", "REST APIs"],
    features: [
      "Interactive node-based AI mind map generator for complex curricula",
      "Live lecture speech-to-text transcription engine with instant note export",
      "Course progress milestones, lesson locking, and student engagement analytics",
      "Teacher center reporting dashboard with cohort retention metrics"
    ]
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    tagline: "Role-Based Scalable Store Engine",
    description: "Built a full e-commerce web app with role-based authentication (Admin, Company, Customer), product and order management, and RESTful API integration using Laravel and MySQL. Collaborated with frontend developers to ensure smooth API integration and responsive UX.",
    image: "/images/ecommerce.png",
    github: "https://github.com/Abdelrahman5884/ecommerce",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_laravel-ecommerce-php-activity-7375879631301705728-7nEo",
    technologies: ["Laravel", "MySQL", "RESTful APIs", "Role-Based Auth", "Order Lifecycle"],
    features: [
      "Role-based authentication & authorization (Admin, Company, Customer)",
      "Comprehensive product catalog and order management workflow",
      "Database transactions to guarantee strict inventory consistency",
      "Clean RESTful endpoints tailored for frontend UX consumption"
    ]
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot",
    category: "AI & NLP",
    tagline: "Context-Aware Intelligent Conversational Service",
    description: "Built an AI-powered chatbot using Laravel and PHP that processes user inputs and generates automated, context-aware responses through clean and scalable API design.",
    image: "/images/chatbot.png",
    github: "https://github.com/Abdelrahman5884/Chatbot",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_php-mysql-backenddevelopment-activity-7354115430631788546-9ZGp",
    technologies: ["Laravel", "PHP", "NLP APIs", "MySQL", "Rate Limiting"],
    features: [
      "Natural language understanding and automated context-aware replies",
      "Robust API throttling & rate limiting via custom Laravel middleware",
      "Clean request lifecycle management and asynchronous logging",
      "Scalable service-provider design for flexible AI engine integration"
    ]
  },
  {
    id: "bright",
    title: "Bright E-Learning",
    category: "E-Learning",
    tagline: "Complete E-Learning Platform with Smart Chatbot & Real-Time Social",
    description: "Built a complete e-learning platform with course management, progress tracking, and a smart chatbot handling most user queries. Integrated real-time interactions (likes & comments) and a support ticketing system. Focused on secure backend development, optimized database performance, and user-friendly API design.",
    image: "/images/bright.png",
    github: "https://github.com/Abdelrahman5884/bright",
    linkedin: "https://www.linkedin.com/posts/shalan1_i-am-proud-to-share-a-short-story-from-our-ugcPost-7408560819531268096-iOSn",
    technologies: ["PHP", "MySQL", "Laravel", "Real-Time Events", "Smart Chatbot"],
    features: [
      "Structured course management with dynamic student progress tracking",
      "Integrated smart chatbot handling incoming student queries",
      "Real-time social interactions including post likes and threaded comments",
      "Support ticketing system with notification dispatch"
    ]
  },
  {
    id: "library-ms",
    title: "Library Management System",
    category: "System Backend",
    tagline: "Online Library & Circulation Management Engine",
    description: "Contributed to the backend development of an online library management system using Laravel. Implemented APIs for managing users, books, and borrowing operations, ensuring secure data handling and smooth integration with the frontend.",
    image: "/images/library.png",
    github: "https://github.com/Abdelrahman5884/libraryMS",
    linkedin: "https://www.linkedin.com/posts/ameeenmv_mvlib-online-library-management-system-ugcPost-7361809997564968960-L45g",
    technologies: ["Laravel", "MySQL", "RESTful APIs", "Borrowing Lifecycle", "RBAC"],
    features: [
      "Complete book cataloging, search indexing, and inventory tracking",
      "Automated borrowing life-cycle, due date tracking, and fine handling",
      "Secure user management with role-based permission policies",
      "Optimized relational database queries for high concurrency"
    ]
  }
];

export const achievementsData = [
  {
    id: "iti-cert",
    title: "FullStack Web Development Using PHP (150 hrs)",
    role: "PHP Back End Developer Intern",
    issuer: "Information Technology Institute (ITI) — Creativa Mansoura",
    period: "07/15/2025 – 09/15/2025",
    duration: "150 Hours of Intensive Professional Training",
    certImage: "/images/1757250961427.jpg",
    photoImage: "/images/iti.jpg",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_webdevelopment-php-laravel-activity-7370444747905142784-XNJK",
    officialCertNote: "Certified by Dr. Heba Saleh, Chairman of Information Technology Institute (MCIT)",
    description: "Rigorous 150-hour technical internship certified by the Information Technology Institute (ITI), covering full-stack web architectures with intensive focus on modern PHP 8.x, the Laravel framework, advanced MySQL database optimization, and team-based production project delivery.",
    hoursBreakdown: [
      { subject: "Client-Side Technologies", hours: 48, icon: "fa-desktop" },
      { subject: "PHP 8 Fundamentals & OOP", hours: 30, icon: "fa-brands fa-php" },
      { subject: "Laravel Framework & APIs", hours: 30, icon: "fa-brands fa-laravel" },
      { subject: "Graduation Project", hours: 24, icon: "fa-diagram-project" },
      { subject: "MySQL Database Architecture", hours: 18, icon: "fa-database" }
    ],
    skillsLearned: ["PHP 8.x", "Laravel Framework", "RESTful API Architecture", "MySQL Schema Design", "Unit Testing", "Git Workflow", "Team Collaboration"]
  }
];

export const servicesData = [
  {
    icon: "fa-network-wired",
    title: "RESTful API Engineering",
    description: "Designing structured, secure, and lightning-fast RESTful APIs tailored for web and mobile frontends with automated request validation."
  },
  {
    icon: "fa-database",
    title: "Database Architecture & Optimization",
    description: "Database schema design, composite indexing, complex query profiling, and Redis caching layers engineered for high-concurrency traffic."
  },
  {
    icon: "fa-shield-halved",
    title: "Authentication & Security",
    description: "Implementing Laravel Sanctum, role-based access control (RBAC), rate limiting, middleware policies, and protection against OWASP threats."
  },
  {
    icon: "fa-cloud-arrow-up",
    title: "Cloud & Server Deployment",
    description: "Configuring production environments on AWS EC2, Linux VPS, Apache/Nginx, queue workers, and automated backup strategies."
  }
];


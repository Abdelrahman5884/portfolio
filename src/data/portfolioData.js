export const personalData = {
  name: "Abdelrahman Hassan Mohamed",
  displayName: "Abdelrahman Hassan",
  title: "Software Engineer",
  tagline: "Building scalable, high-performance backends & robust APIs",
  typingTexts: [
    "High-Performance Database Architect",
    "Laravel & PHP Specialist",
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
  avatarUrl: "/images/profile.jpg",
  suitImage: "/images/abdelrahman_suit.jpg",
  // Authentic portraits & Interactive Spacesuit Reveal:
  heroImage: "/images/abdelrahman_hero_balenciaga.jpg",            // Authentic Balenciaga portrait (glasses & lowered hands)
  heroOriginalImage: "/images/abdelrahman_hero_balenciaga.jpg",     // Authentic casual portrait
  heroSpacesuitImage: "/images/abdelrahman_hero_balenciaga_suit.jpg", // Astronaut Helmet & Space Suit reveal layer
  aboutImage: "/images/abdelrahman_casual_new.png",          // Casual Balenciaga Shirt (About Me)
  journeyImage: "/images/iti.jpg",             // Authentic ITI Graduation portrait (Creativa Hub)
  stats: [
    { label: "Years Experience", value: "2+", icon: "fa-calendar-check" },
    { label: "Production Projects", value: "8+", icon: "fa-diagram-project" },
    { label: "REST APIs Built", value: "25+", icon: "fa-network-wired" },
    { label: "Engineering @ Mansoura", value: "CS", icon: "fa-graduation-cap" }
  ]
};

export const techSkills = [
  // Backend Development
  {
    id: "laravel",
    name: "Laravel",
    category: "backend",
    categoryName: "Backend & DB",
    devicon: "devicon-laravel-original colored",
    color: "#FF2D20",
    rgb: "255, 45, 32",
    tag: "Core Framework",
    highlight: true
  },
  {
    id: "php",
    name: "PHP 8.x",
    category: "backend",
    categoryName: "Backend & DB",
    devicon: "devicon-php-plain colored",
    color: "#777BB4",
    rgb: "119, 123, 180",
    tag: "Primary Language",
    highlight: true
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "backend",
    categoryName: "Backend & DB",
    devicon: "devicon-mysql-original colored",
    color: "#00758F",
    rgb: "0, 117, 143",
    tag: "Relational DB",
    highlight: true
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    categoryName: "Backend & DB",
    devicon: "devicon-redis-plain colored",
    color: "#DC382D",
    rgb: "220, 56, 45",
    tag: "Caching & Queues",
    highlight: true
  },
  {
    id: "composer",
    name: "Composer",
    category: "backend",
    categoryName: "Backend & DB",
    devicon: "devicon-composer-line colored",
    color: "#885630",
    rgb: "136, 86, 48",
    tag: "Dependency Manager",
    highlight: false
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "backend",
    categoryName: "Backend & DB",
    devicon: "devicon-sqlite-plain colored",
    color: "#003B57",
    rgb: "0, 59, 87",
    tag: "Embedded DB",
    highlight: false
  },

  // Cloud & DevOps
  {
    id: "aws",
    name: "AWS EC2",
    category: "devops",
    categoryName: "Cloud & DevOps",
    devicon: "devicon-amazonwebservices-plain-wordmark colored",
    color: "#FF9900",
    rgb: "255, 153, 0",
    tag: "Cloud Infrastructure",
    highlight: true
  },
  {
    id: "git",
    name: "Git",
    category: "devops",
    categoryName: "Cloud & DevOps",
    devicon: "devicon-git-plain colored",
    color: "#F05032",
    rgb: "240, 80, 50",
    tag: "Version Control",
    highlight: true
  },
  {
    id: "github",
    name: "GitHub",
    category: "devops",
    categoryName: "Cloud & DevOps",
    devicon: "devicon-github-original",
    color: "#F0F6FC",
    rgb: "240, 246, 252",
    tag: "CI/CD & Git Flow",
    highlight: false
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    categoryName: "Cloud & DevOps",
    devicon: "devicon-docker-plain colored",
    color: "#2496ED",
    rgb: "36, 150, 237",
    tag: "Containerization",
    highlight: false
  },
  {
    id: "linux",
    name: "Linux",
    category: "devops",
    categoryName: "Cloud & DevOps",
    devicon: "devicon-linux-plain colored",
    color: "#FCC624",
    rgb: "252, 198, 36",
    tag: "Server Environment",
    highlight: false
  },
  {
    id: "apache",
    name: "Apache",
    category: "devops",
    categoryName: "Cloud & DevOps",
    devicon: "devicon-apache-plain colored",
    color: "#D22128",
    rgb: "210, 33, 40",
    tag: "Web Server",
    highlight: false
  },

  // Programming & Core
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryName: "Programming",
    devicon: "devicon-python-plain colored",
    color: "#3776AB",
    rgb: "55, 118, 171",
    tag: "Scripting & AI Tools",
    highlight: false
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    categoryName: "Programming",
    devicon: "devicon-cplusplus-plain colored",
    color: "#00599C",
    rgb: "0, 89, 156",
    tag: "Data Structures & OOP",
    highlight: false
  },
  {
    id: "csharp",
    name: "C#",
    category: "languages",
    categoryName: "Programming",
    devicon: "devicon-csharp-plain colored",
    color: "#68217A",
    rgb: "104, 33, 122",
    tag: "OOP & CS Core",
    highlight: false
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryName: "Programming",
    devicon: "devicon-javascript-plain colored",
    color: "#F7DF1E",
    rgb: "247, 223, 30",
    tag: "ES6+ Fullstack",
    highlight: false
  },

  // Tools & IDEs
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    categoryName: "Tools & Web",
    devicon: "devicon-postman-plain colored",
    color: "#FF6C37",
    rgb: "255, 108, 55",
    tag: "API Testing & Docs",
    highlight: false
  },
  {
    id: "phpstorm",
    name: "PhpStorm",
    category: "tools",
    categoryName: "Tools & Web",
    devicon: "devicon-phpstorm-plain colored",
    color: "#FF318C",
    rgb: "255, 49, 140",
    tag: "JetBrains IDE",
    highlight: false
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    categoryName: "Tools & Web",
    devicon: "devicon-vscode-plain colored",
    color: "#007ACC",
    rgb: "0, 122, 204",
    tag: "Code Editor",
    highlight: false
  },

  // Frontend & Web
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    categoryName: "Tools & Web",
    devicon: "devicon-html5-plain colored",
    color: "#E34F26",
    rgb: "227, 79, 38",
    tag: "Semantic Markup",
    highlight: false
  },
  {
    id: "css3",
    name: "CSS3",
    category: "frontend",
    categoryName: "Tools & Web",
    devicon: "devicon-css3-plain colored",
    color: "#1572B6",
    rgb: "21, 114, 182",
    tag: "Modern Layouts",
    highlight: false
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    categoryName: "Tools & Web",
    devicon: "devicon-bootstrap-plain colored",
    color: "#7952B3",
    rgb: "121, 82, 179",
    tag: "Responsive Design",
    highlight: false
  },
  {
    id: "jquery",
    name: "jQuery",
    category: "frontend",
    categoryName: "Tools & Web",
    devicon: "devicon-jquery-plain colored",
    color: "#0769AD",
    rgb: "7, 105, 173",
    tag: "DOM Manipulation",
    highlight: false
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    categoryName: "Tools & Web",
    devicon: "devicon-react-original colored",
    color: "#61DAFB",
    rgb: "97, 218, 251",
    tag: "Client-Side UI",
    highlight: false
  }
];

export const skillsCategories = [
  {
    category: "Backend Development",
    icon: "fa-server",
    skills: [
      { name: "Laravel", devicon: "devicon-laravel-original colored", color: "#FF2D20", rgb: "255, 45, 32", highlight: true },
      { name: "PHP 8.x", devicon: "devicon-php-plain colored", color: "#777BB4", rgb: "119, 123, 180", highlight: true },
      { name: "RESTful APIs", devicon: "fa-solid fa-network-wired", isFontAwesome: true, color: "#38BDF8", rgb: "56, 189, 248", highlight: true },
      { name: "Redis", devicon: "devicon-redis-plain colored", color: "#DC382D", rgb: "220, 56, 45", highlight: true },
      { name: "Sanctum Auth", devicon: "fa-solid fa-shield-halved", isFontAwesome: true, color: "#10B981", rgb: "16, 185, 129", highlight: false },
      { name: "Composer", devicon: "devicon-composer-line colored", color: "#885630", rgb: "136, 86, 48", highlight: false }
    ]
  },
  {
    category: "Database & Architecture",
    icon: "fa-database",
    skills: [
      { name: "MySQL", devicon: "devicon-mysql-original colored", color: "#00758F", rgb: "0, 117, 143", highlight: true },
      { name: "Redis Cache", devicon: "devicon-redis-plain colored", color: "#DC382D", rgb: "220, 56, 45", highlight: true },
      { name: "PostgreSQL", devicon: "devicon-postgresql-plain colored", color: "#336791", rgb: "51, 103, 145", highlight: false },
      { name: "SQLite", devicon: "devicon-sqlite-plain colored", color: "#003B57", rgb: "0, 59, 87", highlight: false }
    ]
  },
  {
    category: "Programming & Core",
    icon: "fa-code",
    skills: [
      { name: "PHP", devicon: "devicon-php-plain colored", color: "#777BB4", rgb: "119, 123, 180", highlight: true },
      { name: "Python", devicon: "devicon-python-plain colored", color: "#3776AB", rgb: "55, 118, 171", highlight: false },
      { name: "C++", devicon: "devicon-cplusplus-plain colored", color: "#00599C", rgb: "0, 89, 156", highlight: false },
      { name: "C#", devicon: "devicon-csharp-plain colored", color: "#68217A", rgb: "104, 33, 122", highlight: false },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored", color: "#F7DF1E", rgb: "247, 223, 30", highlight: false }
    ]
  },
  {
    category: "Tools, DevOps & Cloud",
    icon: "fa-toolbox",
    skills: [
      { name: "AWS EC2", devicon: "devicon-amazonwebservices-plain-wordmark colored", color: "#FF9900", rgb: "255, 153, 0", highlight: true },
      { name: "Git", devicon: "devicon-git-plain colored", color: "#F05032", rgb: "240, 80, 50", highlight: true },
      { name: "GitHub", devicon: "devicon-github-original", isWhite: true, color: "#F0F6FC", rgb: "240, 246, 252", highlight: false },
      { name: "Postman", devicon: "devicon-postman-plain colored", color: "#FF6C37", rgb: "255, 108, 55", highlight: false },
      { name: "Docker", devicon: "devicon-docker-plain colored", color: "#2496ED", rgb: "36, 150, 237", highlight: false },
      { name: "Apache", devicon: "devicon-apache-plain colored", color: "#D22128", rgb: "210, 33, 40", highlight: false },
      { name: "VS Code", devicon: "devicon-vscode-plain colored", color: "#007ACC", rgb: "0, 122, 204", highlight: false },
      { name: "PhpStorm", devicon: "devicon-phpstorm-plain colored", color: "#FF318C", rgb: "255, 49, 140", highlight: false }
    ]
  },
  {
    category: "Frontend & Web",
    icon: "fa-desktop",
    skills: [
      { name: "HTML5", devicon: "devicon-html5-plain colored", color: "#E34F26", rgb: "227, 79, 38", highlight: false },
      { name: "CSS3", devicon: "devicon-css3-plain colored", color: "#1572B6", rgb: "21, 114, 182", highlight: false },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored", color: "#F7DF1E", rgb: "247, 223, 30", highlight: false },
      { name: "Bootstrap", devicon: "devicon-bootstrap-plain colored", color: "#7952B3", rgb: "121, 82, 179", highlight: false },
      { name: "jQuery", devicon: "devicon-jquery-plain colored", color: "#0769AD", rgb: "7, 105, 173", highlight: false },
      { name: "React", devicon: "devicon-react-original colored", color: "#61DAFB", rgb: "97, 218, 251", highlight: false }
    ]
  }
];

export const engineeringStandards = [
  { name: "SOLID Principles", icon: "fa-cubes-stacked" },
  { name: "DRY & Clean Architecture", icon: "fa-broom" },
  { name: "OWASP API Security", icon: "fa-shield-halved" },
  { name: "RESTful API Standards", icon: "fa-network-wired" },
  { name: "Query Optimization & Indexing", icon: "fa-gauge-high" },
  { name: "Database Transactions & ACID", icon: "fa-arrow-right-arrow-left" },
  { name: "Authentication & Sanctum", icon: "fa-user-lock" },
  { name: "Git Flow & Version Control", icon: "fa-code-branch" }
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
    image: "/images/diagnosense.png",
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
    image: "/images/azul.png",
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
    title: "Motafawweq",
    category: "AI & EdTech",
    tagline: "Large-Scale Educational Platform with AI Mind Mapping & Speech-to-Text",
    description: "A large-scale educational platform designed for students, teachers, educational centers, and parents. Offers an integrated learning environment featuring lesson management, interactive assessments, AI-powered speech-to-text lecture transcriptions, and interactive mind maps.",
    image: "/images/motafawweq.png",
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


export const personalData = {
  name: "Abdelrahman Hassan",
  title: "Backend Developer",
  typingTexts: [
    "Backend Developer",
    "Laravel & RESTful APIs Specialist",
    "High-Performance Database Architect",
    "MySQL · Redis · Secure Microservices"
  ],
  bio: `I specialize in designing secure, scalable back-end architectures powered by Laravel, MySQL, and Redis. My expertise lies in crafting clean RESTful APIs, optimizing database performance, and implementing robust authentication systems.

With a strong focus on code quality and maintainability, I build production-ready solutions that are engineered to scale, handle real-world traffic, and deliver long-term reliability.`,
  shortAbout: `Backend Developer specialized in Laravel and scalable API architecture. I build secure, high-performance backend systems with clean code practices, optimized databases, and production-ready authentication systems. Focused on reliability, maintainability, and real-world scalability.`,
  location: "Mansoura, Egypt",
  email: "abdelrahmanhasan020@gmail.com",
  phone: "+20 100 473 2940",
  github: "https://github.com/Abdelrahman5884",
  linkedin: "https://www.linkedin.com/in/abdelrahman-hassan-809b3b339/",
  cvUrl: "/cv.pdf",
  avatarUrl: "/images/profile.jpg",
  stats: [
    { label: "Years Experience", value: "2+", icon: "fa-calendar-check" },
    { label: "Projects Delivered", value: "20+", icon: "fa-diagram-project" },
    { label: "Happy Clients", value: "15+", icon: "fa-users" },
    { label: "Training Hours", value: "150+", icon: "fa-clock" }
  ]
};

export const skillsData = [
  {
    category: "Backend & Frameworks",
    skills: [
      { name: "Laravel", icon: "fa-brands fa-laravel", level: "Advanced" },
      { name: "PHP", icon: "fa-brands fa-php", level: "Advanced" },
      { name: "RESTful APIs", icon: "fa fa-server", level: "Expert" },
      { name: "OOP & SOLID", icon: "fa fa-code", level: "Advanced" },
      { name: "MVC Architecture", icon: "fa fa-sitemap", level: "Advanced" }
    ]
  },
  {
    category: "Databases & Caching",
    skills: [
      { name: "MySQL", icon: "fa fa-database", level: "Advanced" },
      { name: "Redis", icon: "fa fa-bolt", level: "Proficient" },
      { name: "DB Optimization", icon: "fa fa-gauge-high", level: "Advanced" },
      { name: "Eloquent ORM", icon: "fa fa-cubes", level: "Advanced" }
    ]
  },
  {
    category: "DevOps & Cloud & Tools",
    skills: [
      { name: "AWS EC2", icon: "fa-brands fa-aws", level: "Intermediate" },
      { name: "Git & GitHub", icon: "fa-brands fa-github", level: "Advanced" },
      { name: "Postman", icon: "fa fa-paper-plane", level: "Advanced" },
      { name: "Auth & Security", icon: "fa fa-shield-halved", level: "Advanced" },
      { name: "Docker Basics", icon: "fa-brands fa-docker", level: "Intermediate" }
    ]
  }
];

export const educationData = [
  {
    institution: "Mansoura University",
    faculty: "Faculty of Computer & Information Sciences",
    degree: "Computer Science / Software Engineering focus",
    period: "10/2023 – 10/2026",
    status: "Currently Enrolled",
    highlight: "Focusing on data structures, distributed systems, software design, and algorithm optimization."
  },
  {
    institution: "Beni-Suef University",
    faculty: "Faculty of Computer & Artificial Intelligence",
    degree: "Foundational Computer Science",
    period: "10/2022 – 06/2023",
    status: "Transferred to Mansoura University",
    highlight: "Acquired core programming principles, discrete math, and computer organization fundamentals."
  }
];

export const projectsData = [
  {
    id: "smart-learn",
    title: "Smart Learn",
    category: "AI & EdTech",
    tagline: "AI-Powered Next-Gen Learning Ecosystem",
    description: "An AI-powered learning platform with integrated intelligent chatbot and smart tutoring utilities. Features complete REST API backends, automated student assessment, contextual assistance, and responsive dashboard integration.",
    image: "/images/smartlearn.png",
    github: "https://github.com/Abdelrahman5884/Smart-Learn",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_webdevelopment-php-laravel-activity-7370444747905142784-XNJK",
    technologies: ["Laravel", "REST APIs", "MySQL", "NLP AI", "Authentication"],
    features: [
      "Context-aware AI tutor chatbot with session memory",
      "Robust student progress & course analytics tracking",
      "Secure token-based auth and granular role permissions",
      "Optimized query execution for fast question retrieval"
    ]
  },
  {
    id: "bright",
    title: "Bright E-Learning",
    category: "E-Learning",
    tagline: "Real-Time Interactive Educational Platform",
    description: "Modern e-learning platform with dynamic progress tracking, live interaction feeds, and structured course navigation. Engineered for high concurrent student engagement with optimized relational database structure.",
    image: "/images/bright.png",
    github: "https://github.com/Abdelrahman5884/bright",
    linkedin: "https://www.linkedin.com/posts/shalan1_i-am-proud-to-share-a-short-story-from-our-ugcPost-7408560819531268096-iOSn",
    technologies: ["Laravel", "MySQL", "REST APIs", "Redis", "Real-Time Events"],
    features: [
      "Student lesson completion and interactive milestone tracking",
      "Instructor dashboard for media uploads and cohort metrics",
      "Redis caching layer for frequently accessed course trees",
      "Clean RESTful endpoints with comprehensive request validation"
    ]
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot",
    category: "AI & NLP",
    tagline: "Context-Aware Intelligent Chat Service",
    description: "High-performance context-aware conversational agent integrated with Laravel backend and modern NLP APIs. Designed with custom session logging, rate limiting, and response fallback algorithms.",
    image: "/images/chatbot.png",
    github: "https://github.com/Abdelrahman5884/Chatbot",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_php-mysql-backenddevelopment-activity-7354115430631788546-9ZGp",
    technologies: ["Laravel", "NLP APIs", "MySQL", "Rate Limiting", "Webhooks"],
    features: [
      "Natural language understanding with contextual history retention",
      "Custom Laravel middleware for API throttling and user quotas",
      "Asynchronous webhook handlers and logging infrastructure",
      "Modular service providers allowing plug-and-play LLM engines"
    ]
  },
  {
    id: "library-ms",
    title: "Library Management",
    category: "System Backend",
    tagline: "High-Efficiency Book & Lending Architecture",
    description: "Enterprise-grade RESTful backend system built to manage book catalogs, multi-tiered user privileges, borrowing life-cycles, due dates, fines, and transaction receipts.",
    image: "/images/library.png",
    github: "https://github.com/Abdelrahman5884/libraryMS",
    linkedin: "https://www.linkedin.com/posts/ameeenmv_mvlib-online-library-management-system-ugcPost-7361809997564968960-L45g",
    technologies: ["Laravel", "MySQL", "REST APIs", "RBAC", "Cron Jobs"],
    features: [
      "Automated cron jobs for overdue alerts and fine calculation",
      "Indexed MySQL queries guaranteeing instant title/author lookups",
      "Strict relational integrity across loans, patrons, and inventory",
      "Clean swagger-ready JSON API documentation"
    ]
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    tagline: "Role-Based Scalable Store Engine",
    description: "Full-featured e-commerce backend with multi-role access (Admin, Vendor, Customer), payment gateway integrations, order workflow automation, and real-time inventory adjustments.",
    image: "/images/ecommerce.png",
    github: "https://github.com/Abdelrahman5884/Smart-Learn",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_laravel-ecommerce-php-activity-7375879631301705728-7nEo",
    technologies: ["Laravel", "MySQL", "Redis", "Payment Gateways", "REST APIs"],
    features: [
      "Secure order processing with database transactional rollbacks",
      "Multi-vendor catalog architecture with isolated inventory controls",
      "Redis cached product aggregations for sub-100ms response times",
      "Role-based access controls with fine-grained policy gates"
    ]
  }
];

export const achievementsData = [
  {
    id: "iti-cert",
    title: "FullStack PHP & Laravel Certificate",
    issuer: "Information Technology Institute (ITI)",
    hours: "150 Hours of Intensive Training",
    date: "2024",
    image: "/images/iti.jpg",
    linkedin: "https://www.linkedin.com/posts/abdelrahman-hassan-809b3b339_webdevelopment-php-laravel-activity-7370444747905142784-XNJK",
    description: "Completed 150 hours of intensive FullStack and Backend development training focusing on modern PHP standards, Laravel framework architecture, RESTful API design, database normalization, and secure web application development.",
    skillsLearned: ["PHP 8.x", "Laravel Framework", "MySQL Schema Design", "REST APIs", "Unit Testing", "Git Workflow"]
  }
];

export const servicesData = [
  {
    icon: "fa-code-branch",
    title: "RESTful API Engineering",
    description: "Designing structured, self-documenting, and lightning-fast RESTful APIs tailored for web and mobile frontends."
  },
  {
    icon: "fa-database",
    title: "Database Architecture & Optimization",
    description: "Schema design, indexing strategies, query profiling, and Redis caching layers for handling high-volume traffic."
  },
  {
    icon: "fa-shield-halved",
    title: "Authentication & Security",
    description: "Implementing JWT, Laravel Sanctum/Passport, role-based permissions, rate limiting, and defense against OWASP vulnerabilities."
  },
  {
    icon: "fa-cloud-arrow-up",
    title: "Deployment & Maintenance",
    description: "Configuring production environments on AWS EC2, Linux VPS, Nginx, queue workers, and automated backups."
  }
];

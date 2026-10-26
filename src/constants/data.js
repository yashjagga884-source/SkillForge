export const CAREERS = [
  {
    id: 1,
    name: 'Frontend Developer',
    description: 'Build beautiful, responsive user interfaces',
    icon: '🎨',
    domain: 'Web Development',
    difficulty: 'Beginner',
    duration: '6 months',
    salary: '$60k - $120k',
    demand: 'High',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
    roadmap: [
      'HTML & CSS Basics',
      'JavaScript Fundamentals',
      'DOM Manipulation',
      'React Basics',
      'State Management',
      'Routing & Navigation',
      'API Integration',
      'Performance Optimization'
    ],
    companies: ['Google', 'Facebook', 'Netflix', 'Airbnb'],
    projects: ['Portfolio Website', 'Todo App', 'Weather App', 'E-commerce Site']
  },
  {
    id: 2,
    name: 'Backend Developer',
    description: 'Design and build powerful server-side systems',
    icon: '⚙️',
    domain: 'Web Development',
    difficulty: 'Intermediate',
    duration: '8 months',
    salary: '$70k - $130k',
    demand: 'High',
    skills: ['Node.js', 'Express', 'Databases', 'REST APIs', 'Authentication', 'Cloud Services'],
    roadmap: [
      'Programming Fundamentals',
      'Server Basics',
      'Databases',
      'RESTful APIs',
      'Authentication & Authorization',
      'Caching & Performance',
      'Microservices',
      'Deployment'
    ],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google'],
    projects: ['Blog API', 'E-commerce Backend', 'Real-time Chat', 'Analytics Dashboard']
  },
  {
    id: 3,
    name: 'Full Stack Developer',
    description: 'Master both frontend and backend development',
    icon: '🚀',
    domain: 'Web Development',
    difficulty: 'Advanced',
    duration: '12 months',
    salary: '$80k - $150k',
    demand: 'High',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Docker'],
    roadmap: [
      'Frontend Fundamentals',
      'Backend Basics',
      'Database Design',
      'Full Stack Architecture',
      'DevOps Basics',
      'Testing Strategies',
      'Security',
      'Scalability'
    ],
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
    projects: ['Social Media App', 'E-learning Platform', 'Project Management Tool', 'SaaS Product']
  },
  {
    id: 4,
    name: 'Mobile Developer',
    description: 'Create amazing apps for iOS and Android',
    icon: '📱',
    domain: 'Mobile Development',
    difficulty: 'Intermediate',
    duration: '10 months',
    salary: '$65k - $125k',
    demand: 'High',
    skills: ['React Native', 'Flutter', 'JavaScript', 'Mobile UI/UX', 'APIs', 'Performance'],
    roadmap: [
      'Mobile Development Basics',
      'React Native Setup',
      'Navigation',
      'State Management',
      'Native Modules',
      'Testing',
      'Publishing',
      'Monetization'
    ],
    companies: ['Apple', 'Google', 'Meta', 'Uber'],
    projects: ['Todo App', 'Weather App', 'News Reader', 'E-commerce App']
  },
  {
    id: 5,
    name: 'Data Scientist',
    description: 'Extract insights from data and build predictive models',
    icon: '📊',
    domain: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 months',
    salary: '$90k - $160k',
    demand: 'Very High',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'TensorFlow'],
    roadmap: [
      'Python for Data Science',
      'Statistics & Probability',
      'Data Analysis',
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Big Data',
      'Model Deployment'
    ],
    companies: ['Google', 'Facebook', 'Amazon', 'Microsoft'],
    projects: ['House Price Prediction', 'Sentiment Analysis', 'Image Classification', 'Recommendation System']
  },
  {
    id: 6,
    name: 'DevOps Engineer',
    description: 'Manage infrastructure and deployment pipelines',
    icon: '🔧',
    domain: 'DevOps',
    difficulty: 'Advanced',
    duration: '10 months',
    salary: '$85k - $145k',
    demand: 'High',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
    roadmap: [
      'Linux Fundamentals',
      'Networking Basics',
      'Version Control',
      'Containerization',
      'Orchestration',
      'Infrastructure as Code',
      'Monitoring',
      'Security'
    ],
    companies: ['Amazon', 'Google', 'Netflix', 'Microsoft'],
    projects: ['Docker Setup', 'Kubernetes Deployment', 'CI/CD Pipeline', 'Infrastructure Automation']
  },
  {
    id: 7,
    name: 'UI/UX Designer',
    description: 'Design beautiful and intuitive user experiences',
    icon: '✨',
    domain: 'Design',
    difficulty: 'Beginner',
    duration: '6 months',
    salary: '$55k - $110k',
    demand: 'High',
    skills: ['Figma', 'Design Thinking', 'Prototyping', 'User Research', 'CSS', 'HTML'],
    roadmap: [
      'Design Fundamentals',
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing',
      'Portfolio Building'
    ],
    companies: ['Google', 'Apple', 'Adobe', 'Figma'],
    projects: ['App Redesign', 'Website Design', 'Design System', 'Prototype']
  },
  {
    id: 8,
    name: 'Cloud Architect',
    description: 'Design scalable cloud infrastructure',
    icon: '☁️',
    domain: 'Cloud',
    difficulty: 'Advanced',
    duration: '11 months',
    salary: '$100k - $180k',
    demand: 'Very High',
    skills: ['AWS', 'Azure', 'GCP', 'System Design', 'Security', 'Cost Optimization'],
    roadmap: [
      'Cloud Fundamentals',
      'AWS Core Services',
      'Networking',
      'Security',
      'Scalability',
      'High Availability',
      'Disaster Recovery',
      'Cost Management'
    ],
    companies: ['Amazon', 'Microsoft', 'Google', 'IBM'],
    projects: ['Multi-region Setup', 'Migration Project', 'Disaster Recovery Plan', 'Cost Optimization']
  }
]

export const TECHNOLOGIES = [
  {
    id: 1,
    name: 'JavaScript',
    category: 'Programming Language',
    level: 'Beginner',
    icon: '⚡',
    description: 'The language of the web',
    learningTime: '4 weeks',
    resources: ['MDN Web Docs', 'freeCodeCamp', 'Codecademy'],
    relatedCareers: ['Frontend Developer', 'Full Stack Developer', 'Backend Developer']
  },
  {
    id: 2,
    name: 'React',
    category: 'Frontend Framework',
    level: 'Intermediate',
    icon: '⚛️',
    description: 'Build interactive UIs with components',
    learningTime: '8 weeks',
    resources: ['React Docs', 'freeCodeCamp', 'Scrimba'],
    relatedCareers: ['Frontend Developer', 'Full Stack Developer']
  },
  {
    id: 3,
    name: 'Node.js',
    category: 'Backend Runtime',
    level: 'Intermediate',
    icon: '🟢',
    description: 'JavaScript on the server',
    learningTime: '6 weeks',
    resources: ['Node.js Docs', 'Traversy Media', 'The Net Ninja'],
    relatedCareers: ['Backend Developer', 'Full Stack Developer']
  },
  {
    id: 4,
    name: 'MongoDB',
    category: 'Database',
    level: 'Beginner',
    icon: '🍃',
    description: 'NoSQL document database',
    learningTime: '4 weeks',
    resources: ['MongoDB University', 'Coursera', 'Udemy'],
    relatedCareers: ['Backend Developer', 'Full Stack Developer']
  },
  {
    id: 5,
    name: 'Python',
    category: 'Programming Language',
    level: 'Beginner',
    icon: '🐍',
    description: 'Versatile and beginner-friendly',
    learningTime: '6 weeks',
    resources: ['Python.org', 'freeCodeCamp', 'Real Python'],
    relatedCareers: ['Data Scientist', 'Backend Developer']
  },
  {
    id: 6,
    name: 'Docker',
    category: 'DevOps Tool',
    level: 'Advanced',
    icon: '🐳',
    description: 'Containerize applications',
    learningTime: '3 weeks',
    resources: ['Docker Docs', 'Udemy', 'Linux Academy'],
    relatedCareers: ['DevOps Engineer', 'Full Stack Developer']
  },
  {
    id: 7,
    name: 'AWS',
    category: 'Cloud Platform',
    level: 'Intermediate',
    icon: '🔶',
    description: 'Amazon cloud services',
    learningTime: '10 weeks',
    resources: ['AWS Training', 'A Cloud Guru', 'Coursera'],
    relatedCareers: ['Cloud Architect', 'DevOps Engineer']
  },
  {
    id: 8,
    name: 'Machine Learning',
    category: 'AI/ML',
    level: 'Advanced',
    icon: '🤖',
    description: 'Build intelligent systems',
    learningTime: '12 weeks',
    resources: ['Coursera', 'Andrew Ng Course', 'Fast.ai'],
    relatedCareers: ['Data Scientist']
  },
  {
    id: 9,
    name: 'TypeScript',
    category: 'Programming Language',
    level: 'Intermediate',
    icon: '📘',
    description: 'Typed JavaScript',
    learningTime: '4 weeks',
    resources: ['TypeScript Handbook', 'Egghead', 'freeCodeCamp'],
    relatedCareers: ['Frontend Developer', 'Full Stack Developer']
  },
  {
    id: 10,
    name: 'SQL',
    category: 'Database',
    level: 'Beginner',
    icon: '🗄️',
    description: 'Query relational databases',
    learningTime: '3 weeks',
    resources: ['Mode Analytics', 'LeetCode SQL', 'W3Schools'],
    relatedCareers: ['Backend Developer', 'Data Scientist']
  },
  {
    id: 11,
    name: 'Figma',
    category: 'Design Tool',
    level: 'Beginner',
    icon: '🎨',
    description: 'Collaborative design platform',
    learningTime: '2 weeks',
    resources: ['Figma Docs', 'YouTube Tutorials', 'Design Courses'],
    relatedCareers: ['UI/UX Designer']
  },
  {
    id: 12,
    name: 'Kubernetes',
    category: 'Orchestration',
    level: 'Advanced',
    icon: '🐙',
    description: 'Container orchestration platform',
    learningTime: '8 weeks',
    resources: ['Kubernetes Docs', 'Linux Academy', 'Udemy'],
    relatedCareers: ['DevOps Engineer', 'Cloud Architect']
  }
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Frontend Developer at Google',
    image: '👩‍💼',
    content: 'SkillForge AI helped me transition from design to frontend development. The structured roadmap and project-based learning made all the difference!'
  },
  {
    id: 2,
    name: 'Arjun Patel',
    role: 'Data Scientist at Amazon',
    image: '👨‍💻',
    content: 'The AI-powered career guidance was incredibly accurate. It helped me identify the gaps in my knowledge and create a personalized learning plan.'
  },
  {
    id: 3,
    name: 'Neha Gupta',
    role: 'Full Stack Developer at Meta',
    image: '👩‍🔬',
    content: 'Love how SkillForge combines learning with portfolio building. My project showcase from the platform helped me land my dream job!'
  },
  {
    id: 4,
    name: 'Rahul Singh',
    role: 'DevOps Engineer at Microsoft',
    image: '👨‍🎓',
    content: 'The learning streak feature keeps me motivated every day. Seeing my progress visualized made learning so much more engaging.'
  }
]

export const FAQS = [
  {
    id: 1,
    question: 'How does SkillForge AI personalize learning?',
    answer: 'SkillForge uses AI to analyze your current skills, interests, and career goals. Based on this analysis, it creates a personalized learning roadmap that guides you through the exact skills you need for your target career.'
  },
  {
    id: 2,
    question: 'Can I switch careers using SkillForge?',
    answer: 'Absolutely! SkillForge AI is designed to help career switchers. You can explore different career paths, understand the skill gaps, and get a customized roadmap to transition into your desired field.'
  },
  {
    id: 3,
    question: 'How long does it take to complete a roadmap?',
    answer: 'The duration varies by career path and your learning pace. Most career paths take 6-12 months of consistent learning. SkillForge provides flexible schedules that adapt to your pace.'
  },
  {
    id: 4,
    question: 'Are the learning resources free?',
    answer: 'SkillForge curates both free and paid resources. We prioritize free options but also integrate premium courses for deeper learning when needed.'
  },
  {
    id: 5,
    question: 'Can I track my progress?',
    answer: 'Yes! SkillForge includes comprehensive progress tracking with milestones, streaks, and visual analytics. You can see exactly how far you\'ve come and what lies ahead.'
  },
  {
    id: 6,
    question: 'How can I get interview preparation help?',
    answer: 'SkillForge includes an interview prep module with curated questions for each career path, practice scenarios, and feedback to help you ace your interviews.'
  }
]

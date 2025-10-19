export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    features: string[];
    motivations: string;
    ghanaContext: string;
    impact: string;
    promotionStrategy: string;
    category: 'health' | 'tech' | 'social' | 'fintech';
}

export interface ResearchItem {
    id: string;
    title: string;
    author: string;
    abstract: string;
    year: number;
    type: 'paper' | 'study' | 'whitepaper';
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    tags: string[];
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'conference' | 'workshop' | 'meeting' | 'social';
}

export interface Opportunity {
    id: string;
    title: string;
    description: string;
    organization: string;
    type: 'internship' | 'grant' | 'program' | 'scholarship';
    deadline: string;
    requirements: string[];
    benefits: string[];
    category: 'health' | 'tech' | 'social' | 'academic';
}

export interface Venture {
    id: string;
    title: string;
    pitch: string;
    founder: string;
    contact: string;
    image: string;
    category: 'tech' | 'health' | 'social' | 'education';
    status: 'active' | 'pilot' | 'development';
    supportWays: string[];
}

export const projects: Project[] = [
    {
        id: 'azaman',
        title: 'Azaman',
        tagline: 'Send Am.',
        description: 'A campus-focused payment and navigation platform designed for university students in Ghana, starting with the University of Ghana. This sleek, youthful, and highly interactive platform lets students easily send and receive money, explore campus, and discover verified businesses, clubs, and services around them.',
        features: [
            'Interactive campus map with liquid glass aesthetic and glassmorphism design',
            'Sendam payment system with search functionality for users, businesses, and clubs',
            'Clean, glassy transaction cards with animated send buttons and ripple effects',
            'Request money functionality with QR code generation and scanning',
            'Business & clubs directory with verified campus businesses and clubs',
            'Profile cards with logos, categories, ratings, and reviews',
            'University-specific sign-up and UG verification with digital student ID preview',
            'My Wallet and My Reviews pages for comprehensive user management',
            'Smooth transitions, touch animations, and motion blur effects',
            'Mobile-first design with bottom navigation tabs'
        ],
        motivations: 'Azaman addresses the unique financial and navigation needs of university students in Ghana. Traditional banking and payment systems are often inaccessible or inconvenient for students, while campus navigation can be confusing for newcomers. This platform creates a seamless, student-focused ecosystem that combines payments, navigation, and social discovery in one unified experience.',
        ghanaContext: 'Starting with University of Ghana, Azaman is designed specifically for the Ghanaian university ecosystem. The platform accommodates local payment preferences, integrates with Ghanaian mobile money systems, and understands the unique challenges of campus life in Ghana. Future expansion will support all Ghanaian universities with API-based verification for students and registered businesses.',
        impact: 'Azaman has the potential to revolutionize campus life in Ghana by creating a comprehensive digital ecosystem for students. The platform will improve financial inclusion, enhance campus navigation, support local businesses, and foster student community engagement. By starting with UG and expanding to all Ghanaian universities, Azaman can become the go-to platform for student life management.',
        promotionStrategy: 'Launch with a pilot program at University of Ghana, partnering with student organizations and campus businesses. Use social media campaigns targeting students, create partnerships with campus clubs and societies, and offer early adopter incentives. Showcase the platform at university events and tech meetups to build awareness and adoption.',
        category: 'fintech'
    },
    {
        id: 'mediguard',
        title: 'MediGuard',
        tagline: 'Safe prescribing, smarter pharmacy decisions.',
        description: 'A comprehensive drug interaction and clinical decision support tool designed to help pharmacists and prescribers avoid dangerous drug interactions, duplicate therapy, dosing mistakes, and allergies. This is especially crucial in settings with polypharmacy and limited clinical support.',
        features: [
            'Drug–drug interaction checker with real-time alerts',
            'Allergy & contraindication warnings',
            'Duplicate therapy detection and prevention',
            'Dosing guidance with renal/hepatic adjustment recommendations',
            'Exportable interaction reports for patient records',
            'API integration for pharmacy/clinic systems',
            'Mobile-responsive interface for point-of-care access'
        ],
        motivations: 'There is huge value in patient safety, especially in Ghana where dispensing errors have strong negative impact. This tool would serve as a differentiator for pharmacies to advertise "interaction-safe dispensing" and position early in the growing global market for clinical decision support tools.',
        ghanaContext: 'Must align with Ghana\'s National Electronic Pharmacy Platform (NEPP) and Pharmacy Council standards. Building a reliable drug database is resource-intensive, so we\'ll start with core essential medicines commonly used in Ghana. The tool needs to work with existing pharmacy management systems and integrate with local healthcare infrastructure.',
        impact: 'This tool has the potential to significantly reduce medication errors, improve patient outcomes, and enhance the reputation of participating pharmacies. By preventing dangerous drug interactions, we can save lives and reduce healthcare costs associated with adverse drug events.',
        promotionStrategy: 'Offer pilot access to campus clinics and student health centers. Promote via Student Ventures as a flagship project to solicit users and testers. Create case studies of prevented interactions to market the tool\'s effectiveness and build credibility in the healthcare community.',
        category: 'health'
    },
    {
        id: 'stockrx',
        title: 'StockRx',
        tagline: 'Optimized stock, fewer waste, better margins.',
        description: 'An intelligent inventory management system for pharmacies that tracks stock levels, expiry dates, lot numbers, and automates reorder recommendations from suppliers. This system helps reduce expired stock and prevent stockouts while improving operational efficiency.',
        features: [
            'Comprehensive stock ledger organized by SKU',
            'Expiry and lot tracking with automated alerts',
            'Supplier order automation and integration',
            'Demand forecasting and trend analysis',
            'CSV import/export for data migration',
            'Real-time inventory dashboards',
            'Low-stock and expiry notifications',
            'Supplier performance analytics'
        ],
        motivations: 'This provides immediate operational benefit to pharmacies by reducing waste and preventing stockouts. It\'s easier to pilot in campus pharmacies with lower clinical risk compared to drug-checking tools. The system enables Gyampo to forge partnerships with pharmacies and suppliers while building expertise in healthcare technology.',
        ghanaContext: 'Local supplier integration is key, connecting to Ghanaian wholesalers and distributors. The system helps pharmacies in Ghana digitize their inventory management, as many are still using manual processes. It must accommodate local pricing structures, currency, and supply chain challenges unique to the Ghanaian market.',
        impact: 'Pharmacies can expect significant cost savings through reduced waste and optimized inventory levels. The system improves cash flow by preventing overstocking and reduces the risk of expired medications. Better inventory management leads to improved customer satisfaction and operational efficiency.',
        promotionStrategy: 'Pilot with student-run or campus pharmacies to demonstrate value. Show concrete cost savings and reduction in waste metrics. Use the Student Ventures page to recruit pilot participants and showcase success stories. Partner with local pharmacy associations for broader adoption.',
        category: 'health'
    },
    {
        id: 'pharmcare-connect',
        title: 'PharmCare Connect',
        tagline: 'Connect patients and pharmacists — anytime, anywhere.',
        description: 'A comprehensive telepharmacy and medication adherence platform that bridges patients and licensed pharmacists. The platform enables remote consultations, medication reminders, adherence tracking, and refill management, making pharmacy care more accessible to patients across Ghana.',
        features: [
            'Patient dashboard with medication schedules and reminder alerts',
            'Pharmacist portal for viewing patient adherence and consult requests',
            'Secure messaging and chat between patients and pharmacists',
            'Automated refill request system',
            'Analytics on adherence trends and patient outcomes',
            'Video consultation capabilities',
            'Medication education resources',
            'Integration with local pharmacy systems'
        ],
        motivations: 'This platform has high social impact potential by improving medication adherence, which may reduce hospitalizations and improve patient outcomes. It distinguishes Gyampo\'s leadership in digital health innovation and offers long-term subscription model potential. The platform addresses accessibility challenges in healthcare delivery.',
        ghanaContext: 'Telepharmacy regulations require collaboration with pharmacy councils and healthcare authorities. Connectivity constraints in some areas necessitate planning for offline access or SMS fallback systems. The platform must accommodate local languages, cultural considerations, and integrate with existing healthcare infrastructure in Ghana.',
        impact: 'Improved medication adherence leads to better health outcomes and reduced healthcare costs. The platform makes pharmacy care more accessible, especially in rural areas. It creates new revenue streams for pharmacists while improving patient engagement and health literacy.',
        promotionStrategy: 'Pilot among chronic-condition patients, particularly diabetic students on campus. Partner with campus health centers and local clinics. Showcase adherence improvements as marketing proof and case studies. Engage with patient advocacy groups and healthcare providers for broader adoption.',
        category: 'health'
    }
];

export const researchItems: ResearchItem[] = [
    {
        id: 'pharmacy-education',
        title: 'Digital Transformation in Pharmacy Education: A Ghanaian Perspective',
        author: 'Gyampo, K.A.',
        abstract: 'This study explores the integration of digital tools and technologies in pharmacy education at the University of Ghana, examining the impact on student learning outcomes and clinical preparedness.',
        year: 2024,
        type: 'study'
    },
    {
        id: 'medication-safety',
        title: 'Medication Safety in Ghanaian Healthcare Settings: Current Challenges and Digital Solutions',
        author: 'Gyampo, K.A. et al.',
        abstract: 'A comprehensive analysis of medication safety challenges in Ghana and the potential for digital health solutions to address these issues, with focus on drug interaction prevention and clinical decision support.',
        year: 2024,
        type: 'whitepaper'
    },
    {
        id: 'student-leadership',
        title: 'Student Leadership in Healthcare Innovation: Case Study of SRC Initiatives',
        author: 'Gyampo, K.A.',
        abstract: 'An examination of student-led healthcare innovation initiatives at the University of Ghana, highlighting the role of student leadership in driving digital health transformation.',
        year: 2024,
        type: 'paper'
    }
];

export const blogPosts: BlogPost[] = [
    {
        id: 'digital-health-future',
        title: 'The Future of Digital Health in Ghana',
        excerpt: 'Exploring how technology can transform healthcare delivery in Ghana, from telemedicine to AI-powered diagnostics.',
        content: 'The healthcare landscape in Ghana is on the brink of a digital transformation...',
        author: 'Gyampo, K.A.',
        date: '2024-01-15',
        image: '/images/blog/digital-health.jpg',
        tags: ['healthcare', 'technology', 'innovation']
    },
    {
        id: 'pharmacy-innovation',
        title: 'Innovation in Pharmacy Practice: A Student\'s Perspective',
        excerpt: 'How pharmacy students can drive innovation in healthcare through technology and entrepreneurship.',
        content: 'As pharmacy students, we have a unique opportunity to shape the future of healthcare...',
        author: 'Gyampo, K.A.',
        date: '2024-01-10',
        image: '/images/blog/pharmacy-innovation.jpg',
        tags: ['pharmacy', 'innovation', 'students']
    },
    {
        id: 'leadership-journey',
        title: 'My Journey as Vice SRC President',
        excerpt: 'Reflections on leadership, service, and the responsibility of representing student interests.',
        content: 'Serving as Vice SRC President has been one of the most rewarding experiences...',
        author: 'Gyampo, K.A.',
        date: '2024-01-05',
        image: '/images/blog/leadership.jpg',
        tags: ['leadership', 'service', 'student-life']
    }
];

export const events: Event[] = [
    {
        id: 'health-tech-summit',
        title: 'Health Tech Innovation Summit',
        description: 'Join us for a day of discussions on the latest innovations in healthcare technology and their applications in Ghana.',
        date: '2024-02-15',
        time: '9:00 AM - 5:00 PM',
        location: 'University of Ghana, Legon',
        type: 'conference'
    },
    {
        id: 'pharmacy-workshop',
        title: 'Digital Tools in Pharmacy Practice Workshop',
        description: 'Hands-on workshop on using digital tools to improve pharmacy practice and patient care.',
        date: '2024-02-20',
        time: '2:00 PM - 4:00 PM',
        location: 'School of Pharmacy, UG',
        type: 'workshop'
    },
    {
        id: 'src-meeting',
        title: 'SRC General Assembly',
        description: 'Monthly general assembly meeting to discuss student issues and upcoming initiatives.',
        date: '2024-02-25',
        time: '6:00 PM - 8:00 PM',
        location: 'SRC Building, UG',
        type: 'meeting'
    }
];

export const opportunities: Opportunity[] = [
    {
        id: 'health-internship',
        title: 'Digital Health Internship Program',
        description: 'Join our team as an intern to work on cutting-edge digital health projects and gain hands-on experience in healthcare technology.',
        organization: 'Gyampo Digital Health Initiative',
        type: 'internship',
        deadline: '2024-03-01',
        requirements: [
            'Currently enrolled in a health-related program',
            'Basic programming knowledge preferred',
            'Passion for healthcare innovation',
            'Strong communication skills'
        ],
        benefits: [
            'Hands-on experience with real projects',
            'Mentorship from industry professionals',
            'Networking opportunities',
            'Certificate of completion'
        ],
        category: 'health'
    },
    {
        id: 'innovation-grant',
        title: 'Student Innovation Grant',
        description: 'Funding opportunity for students with innovative ideas in healthcare, technology, or social impact.',
        organization: 'University of Ghana SRC',
        type: 'grant',
        deadline: '2024-03-15',
        requirements: [
            'Current UG student',
            'Innovative project proposal',
            'Clear implementation plan',
            'Budget breakdown'
        ],
        benefits: [
            'Up to GHS 5,000 funding',
            'Mentorship support',
            'Access to resources',
            'Recognition and publicity'
        ],
        category: 'academic'
    },
    {
        id: 'tech-program',
        title: 'Tech for Good Program',
        description: 'A comprehensive program teaching students how to use technology to solve social problems.',
        organization: 'Ghana Tech Hub',
        type: 'program',
        deadline: '2024-04-01',
        requirements: [
            'Basic computer skills',
            'Commitment to social impact',
            'Team collaboration skills',
            'Project presentation ability'
        ],
        benefits: [
            'Free training and resources',
            'Project development support',
            'Industry connections',
            'Potential job opportunities'
        ],
        category: 'tech'
    }
];

export const ventures: Venture[] = [
    {
        id: 'campus-delivery',
        title: 'Campus Quick Delivery',
        pitch: 'A delivery service connecting students with local businesses for quick and affordable food and essentials delivery on campus.',
        founder: 'Sarah Mensah',
        contact: 'sarah.mensah@st.ug.edu.gh',
        image: '/images/ventures/campus-delivery.jpg',
        category: 'tech',
        status: 'active',
        supportWays: [
            'Use the service for your deliveries',
            'Partner as a local business',
            'Join as a delivery rider',
            'Share with friends and family'
        ]
    },
    {
        id: 'study-buddy',
        title: 'Study Buddy Connect',
        pitch: 'A platform connecting students for study groups, tutoring, and academic collaboration across different programs.',
        founder: 'Kwame Asante',
        contact: 'kwame.asante@st.ug.edu.gh',
        image: '/images/ventures/study-buddy.jpg',
        category: 'education',
        status: 'pilot',
        supportWays: [
            'Join study groups in your program',
            'Offer tutoring services',
            'Share study materials',
            'Provide feedback and suggestions'
        ]
    },
    {
        id: 'green-campus',
        title: 'Green Campus Initiative',
        pitch: 'An environmental sustainability project focused on waste reduction, recycling, and green energy solutions for campus.',
        founder: 'Ama Serwaa',
        contact: 'ama.serwaa@st.ug.edu.gh',
        image: '/images/ventures/green-campus.jpg',
        category: 'social',
        status: 'development',
        supportWays: [
            'Participate in recycling programs',
            'Volunteer for clean-up activities',
            'Donate to the initiative',
            'Spread awareness on social media'
        ]
    }
];

// Local storage utilities
export const storageKeys = {
    projects: 'gyampo_projects',
    research: 'gyampo_research',
    blogPosts: 'gyampo_blog_posts',
    events: 'gyampo_events',
    opportunities: 'gyampo_opportunities',
    ventures: 'gyampo_ventures',
    adminAuth: 'gyampo_admin_auth'
};

export const getStoredData = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const setStoredData = <T>(key: string, data: T): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
    }
};

export const initializeData = (): void => {
    if (typeof window === 'undefined') return;

    // Initialize data if not present
    if (!localStorage.getItem(storageKeys.projects)) {
        setStoredData(storageKeys.projects, projects);
    }
    if (!localStorage.getItem(storageKeys.research)) {
        setStoredData(storageKeys.research, researchItems);
    }
    if (!localStorage.getItem(storageKeys.blogPosts)) {
        setStoredData(storageKeys.blogPosts, blogPosts);
    }
    if (!localStorage.getItem(storageKeys.events)) {
        setStoredData(storageKeys.events, events);
    }
    if (!localStorage.getItem(storageKeys.opportunities)) {
        setStoredData(storageKeys.opportunities, opportunities);
    }
    if (!localStorage.getItem(storageKeys.ventures)) {
        setStoredData(storageKeys.ventures, ventures);
    }
};


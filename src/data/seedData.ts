import { CivicReport, AssetTwin, PredictiveRiskZone, User, Notification } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-101',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  role: 'citizen',
  ward: 'Ward 142 - Indiranagar',
  city: 'Bengaluru',
  civicKarma: 480,
  badges: ['Pothole Pioneer', 'Green Guardian', 'Rapid Reporter', 'Community Validator'],
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  preferredLanguage: 'en',
  verifiedCitizen: true,
};

export const INITIAL_REPORTS: CivicReport[] = [
  {
    id: 'CP-8842',
    title: 'Severe crater-like pothole on 100ft Road junction',
    description: 'Deep pothole measuring approximately 4 feet across and 6 inches deep near the metro pillar junction. Causing severe risk for two-wheelers during evening traffic and rain.',
    category: 'pothole',
    subCategory: 'Deep asphalt surface failure',
    status: 'in_progress',
    severityScore: 9,
    emergencyLevel: 'High',
    isEmergency: true,
    confidenceScore: 96,
    citizenImpact: 'Affects ~1,200 vehicles/hr on major arterial road connecting to tech corridor.',
    department: 'Public Works Department (PWD)',
    assignedOfficer: {
      id: 'eng-402',
      name: 'Er. Rajesh Kumar',
      designation: 'Assistant Executive Engineer',
      phone: '+91 94481 02931',
      division: 'East Zone Road Infrastructure'
    },
    location: {
      latitude: 12.9783,
      longitude: 77.6408,
      address: 'Near Metro Pillar #142, 100 Feet Road, Indiranagar',
      ward: 'Ward 142 - Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      landmark: 'Opposite Metro Station Exit B'
    },
    images: {
      before: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80'],
      after: ['https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80']
    },
    mediaType: 'image',
    language: 'en',
    summaryEn: 'High severity asphalt depression on high-traffic arterial route. Road safety hazard flagged with immediate dispatch.',
    summaryLocal: '१०० फीट रोड पर गहरा गड्ढा। दोपहिया वाहनों के लिए गंभीर खतरा। पीडब्ल्यूडी टीम मरम्मत हेतु तैनात।',
    createdAt: '2026-09-24T08:30:00.000Z',
    updatedAt: '2026-09-25T09:15:00.000Z',
    upvotes: 42,
    userHasUpvoted: true,
    reporter: {
      id: 'usr-101',
      name: 'Aarav Sharma',
      isAnonymous: false,
      reputation: 98
    },
    evidence: {
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      exifTimestamp: '2026-09-24T08:28:12.000Z',
      gpsVerified: true,
      aiIntegrityScore: 99,
      deviceFingerprint: 'DEV-AND-BLR-889'
    },
    timeline: [
      {
        status: 'reported',
        timestamp: '2026-09-24T08:30:00.000Z',
        actor: 'Aarav Sharma (Citizen)',
        actorRole: 'Citizen Reporter',
        note: 'Report submitted via mobile camera with GPS lock.'
      },
      {
        status: 'verified',
        timestamp: '2026-09-24T08:45:00.000Z',
        actor: 'AI Vision Engine & Control Room',
        actorRole: 'Automated AI Dispatcher',
        note: 'Severity classified 9/10 (Critical Arterial Risk). Auto-routed to East Zone PWD.'
      },
      {
        status: 'assigned',
        timestamp: '2026-09-24T09:30:00.000Z',
        actor: 'Chief Ward Engineer',
        actorRole: 'Ward Administrator',
        note: 'Assigned to Er. Rajesh Kumar. Work order #WO-BLR-2026-889 generated.'
      },
      {
        status: 'in_progress',
        timestamp: '2026-09-25T09:15:00.000Z',
        actor: 'Er. Rajesh Kumar',
        actorRole: 'Assistant Executive Engineer',
        note: 'Cold-mix asphalt patch truck and roller on site. Barricades placed.'
      }
    ],
    tags: ['ArterialRoad', 'CriticalHazard', 'MetroCorridor'],
    estimatedRepairDays: 1,
    requiredEquipment: ['Cold-mix asphalt compactor', 'Warning reflective cones'],
    safetyPrecautions: ['Traffic diversion during compaction', 'High-visibility safety vests']
  },
  {
    id: 'CP-7721',
    title: 'Major water main leakage causing street flooding',
    description: 'Treated drinking water pipeline burst underneath pavement. Water gushing onto the road at high pressure, flooding 200m of residential lane.',
    category: 'water_leakage',
    subCategory: 'Treated Water Distribution Pipe Burst',
    status: 'resolved',
    severityScore: 8,
    emergencyLevel: 'High',
    isEmergency: true,
    confidenceScore: 98,
    citizenImpact: 'Potable water supply interrupted for ~85 households; localized water stagnation.',
    department: 'Water Supply & Sewerage Board',
    assignedOfficer: {
      id: 'eng-201',
      name: 'Er. Meenakshi Sundaram',
      designation: 'Sub-Divisional Engineer (Water)',
      phone: '+91 98840 19283',
      division: 'Zone 4 Water Utility'
    },
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
      address: '7th Cross Road, 4th Block, Koramangala',
      ward: 'Ward 151 - Koramangala',
      city: 'Bengaluru',
      pincode: '560034',
      landmark: 'Behind Community Park'
    },
    images: {
      before: ['https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80'],
      after: ['https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80']
    },
    mediaType: 'image',
    language: 'en',
    summaryEn: 'High volume potable water line rupture under paved street. Valve isolated, pipe welded and trench backfilled.',
    summaryLocal: 'ಕುಡಿಯುವ ನೀರಿನ ಪೈಪ್ ಒಡೆದು ರಸ್ತೆಯಲ್ಲಿ ನೀರು ನಿಂತಿತ್ತು. ನೀರು ಸರಬರಾಜು ಮಂಡಳಿಯಿಂದ ಪೈಪ್ ದುರಸ್ತಿ ಪೂರ್ಣಗೊಂಡಿದೆ.',
    createdAt: '2026-09-23T11:20:00.000Z',
    updatedAt: '2026-09-24T18:00:00.000Z',
    upvotes: 28,
    userHasUpvoted: false,
    reporter: {
      id: 'usr-205',
      name: 'Priya Nambiar',
      isAnonymous: false,
      reputation: 85
    },
    evidence: {
      sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      exifTimestamp: '2026-09-23T11:15:44.000Z',
      gpsVerified: true,
      aiIntegrityScore: 98,
      deviceFingerprint: 'DEV-IOS-BLR-114'
    },
    timeline: [
      {
        status: 'reported',
        timestamp: '2026-09-23T11:20:00.000Z',
        actor: 'Priya Nambiar (Citizen)',
        actorRole: 'Citizen Reporter',
        note: 'Reported with video and geolocation proof.'
      },
      {
        status: 'verified',
        timestamp: '2026-09-23T11:30:00.000Z',
        actor: 'AI Emergency Triager',
        actorRole: 'Automated AI Dispatcher',
        note: 'Emergency classification: Water Resource Loss > 5000L/hr.'
      },
      {
        status: 'assigned',
        timestamp: '2026-09-23T11:45:00.000Z',
        actor: 'Water Board Desk',
        actorRole: 'Control Room Officer',
        note: 'Assigned to emergency plumbing unit #4.'
      },
      {
        status: 'in_progress',
        timestamp: '2026-09-23T13:00:00.000Z',
        actor: 'Er. Meenakshi Sundaram',
        actorRole: 'Sub-Divisional Engineer',
        note: 'Excavation completed, 6-inch collar clamp fitted.'
      },
      {
        status: 'resolved',
        timestamp: '2026-09-24T18:00:00.000Z',
        actor: 'Er. Meenakshi Sundaram',
        actorRole: 'Sub-Divisional Engineer',
        note: 'Water flow tested and normalized. Pavement patch reinstated.'
      }
    ],
    resolutionAudit: {
      isVerified: true,
      confidence: 96,
      verdict: 'VERIFIED_RESOLVED',
      notes: 'AI vision confirmed pipeline joint seal intact and dry asphalt surface reinstated.',
      workQualityRating: 5,
      verifiedAt: '2026-09-24T18:15:00.000Z',
      inspectorName: 'AI Vision Audit Subsystem'
    },
    tags: ['WaterPipeline', 'ResourceSaving', 'Repaired'],
    estimatedRepairDays: 1,
    requiredEquipment: ['Backhoe loader', 'Pipe clamp weld kit']
  },
  {
    id: 'CP-9904',
    title: 'Overflowing community garbage dump creating sanitary hazard',
    description: 'Solid waste accumulating on roadside for 4 days outside primary school. Stray animal nuisance and severe odor hazard for schoolchildren and residents.',
    category: 'garbage',
    subCategory: 'Unattended secondary waste collection point',
    status: 'citizen_verified',
    severityScore: 7,
    emergencyLevel: 'Medium',
    isEmergency: false,
    confidenceScore: 94,
    citizenImpact: 'Affects 400 school students, teachers, and nearby food stalls.',
    department: 'Solid Waste Management (SWM)',
    assignedOfficer: {
      id: 'eng-108',
      name: 'Rameshwar Patil',
      designation: 'Health & Sanitation Inspector',
      phone: '+91 97654 33211',
      division: 'Ward Sanitation Crew'
    },
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Near Govt Primary School Gate, Sampangi Rama Nagar',
      ward: 'Ward 109 - Chickpet',
      city: 'Bengaluru',
      pincode: '560027',
      landmark: 'Opposite Public Park'
    },
    images: {
      before: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'],
      after: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80']
    },
    mediaType: 'image',
    language: 'hi',
    summaryEn: 'Overflowing municipal secondary dumpster near educational facility. Site cleared, sanitized with lime powder and 2 new enclosed bins installed.',
    summaryLocal: 'स्कूल के पास कचरे का ढेर साफ किया गया। चूने के पाउडर का छिड़काव और नए बंद डस्टबिन लगाए गए।',
    createdAt: '2026-09-22T07:10:00.000Z',
    updatedAt: '2026-09-23T16:30:00.000Z',
    upvotes: 35,
    userHasUpvoted: true,
    reporter: {
      id: 'usr-304',
      name: 'Sunita Devi',
      isAnonymous: false,
      reputation: 92
    },
    evidence: {
      sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      exifTimestamp: '2026-09-22T07:05:10.000Z',
      gpsVerified: true,
      aiIntegrityScore: 97,
      deviceFingerprint: 'DEV-AND-BLR-021'
    },
    timeline: [
      { status: 'reported', timestamp: '2026-09-22T07:10:00.000Z', actor: 'Sunita Devi', actorRole: 'Citizen', note: 'Reported with voice note in Hindi.' },
      { status: 'verified', timestamp: '2026-09-22T07:25:00.000Z', actor: 'AI Language & Vision Engine', actorRole: 'AI Model', note: 'Transcribed Hindi audio, detected school zone hazard.' },
      { status: 'assigned', timestamp: '2026-09-22T08:00:00.000Z', actor: 'SWM Control Room', actorRole: 'Dispatcher', note: 'Compactor vehicle #KA-01-G-9923 dispatched.' },
      { status: 'in_progress', timestamp: '2026-09-22T10:00:00.000Z', actor: 'Rameshwar Patil', actorRole: 'Sanitation Inspector', note: 'Waste lifting underway.' },
      { status: 'resolved', timestamp: '2026-09-22T14:00:00.000Z', actor: 'Rameshwar Patil', actorRole: 'Sanitation Inspector', note: 'Site cleared and sanitized.' },
      { status: 'citizen_verified', timestamp: '2026-09-23T16:30:00.000Z', actor: 'Sunita Devi', actorRole: 'Original Reporter', note: 'Citizen inspected in person and gave 5-star rating.' }
    ],
    resolutionAudit: {
      isVerified: true,
      confidence: 99,
      verdict: 'VERIFIED_RESOLVED',
      notes: 'Total clearance of solid waste. Disinfectant applied.',
      workQualityRating: 5,
      verifiedAt: '2026-09-22T14:10:00.000Z'
    },
    citizenVerification: {
      isSatisfied: true,
      rating: 5,
      comment: 'Very fast action by the municipal team! The school entrance is now clean and odor free.',
      verifiedAt: '2026-09-23T16:30:00.000Z',
      citizenName: 'Sunita Devi'
    },
    tags: ['SchoolSafety', 'CleanCity', 'Sanitation'],
    estimatedRepairDays: 1
  },
  {
    id: 'CP-6019',
    title: 'High-mast streetlight flickering and exposed dangling wire',
    description: 'High-voltage cable exposed at base of street illumination pole. Sparking during light rain, creating severe electrocution hazard near pedestrian pathway.',
    category: 'broken_streetlight',
    subCategory: 'Exposed Electrical Junction & Fixture Failure',
    status: 'assigned',
    severityScore: 10,
    emergencyLevel: 'Critical',
    isEmergency: true,
    confidenceScore: 99,
    citizenImpact: 'Extreme electrocution risk for pedestrians, street vendors, and stray animals.',
    department: 'Electricity Supply & Lighting (DISCOM)',
    assignedOfficer: {
      id: 'eng-311',
      name: 'Er. Ananya Mukherjee',
      designation: 'Junior Electrical Engineer',
      phone: '+91 94331 87210',
      division: 'Substation & Street Lighting Unit 2'
    },
    location: {
      latitude: 12.9279,
      longitude: 77.6271,
      address: 'Near Madivala Lake Promenade, BTM 1st Stage',
      ward: 'Ward 176 - BTM Layout',
      city: 'Bengaluru',
      pincode: '560068',
      landmark: 'Opposite Lake Jogging Track'
    },
    images: {
      before: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80']
    },
    mediaType: 'image',
    language: 'en',
    summaryEn: 'Critical electrical safety hazard: exposed live junction box at public park walkway. Emergency power shutdown and rewiring crew dispatched.',
    summaryLocal: 'सार्वजनिक रास्ते पर बिजली के खंभे से खुला तार और स्पार्किंग। तत्काल बिजली बंद कर मरम्मत दल भेजा गया।',
    createdAt: '2026-09-25T06:15:00.000Z',
    updatedAt: '2026-09-25T07:00:00.000Z',
    upvotes: 56,
    userHasUpvoted: true,
    reporter: {
      id: 'usr-412',
      name: 'Karthik Raman',
      isAnonymous: false,
      reputation: 94
    },
    evidence: {
      sha256Hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      exifTimestamp: '2026-09-25T06:12:00.000Z',
      gpsVerified: true,
      aiIntegrityScore: 99,
      deviceFingerprint: 'DEV-AND-BLR-664'
    },
    timeline: [
      { status: 'reported', timestamp: '2026-09-25T06:15:00.000Z', actor: 'Karthik Raman', actorRole: 'Citizen', note: 'Flagged as immediate danger to morning joggers.' },
      { status: 'verified', timestamp: '2026-09-25T06:18:00.000Z', actor: 'AI Emergency Triager', actorRole: 'AI Model', note: 'Emergency level set to CRITICAL (10/10). SMS alert sent to substation duty officer.' },
      { status: 'assigned', timestamp: '2026-09-25T07:00:00.000Z', actor: 'Chief Electrical Inspector', actorRole: 'Discom Admin', note: 'Assigned to Er. Ananya Mukherjee. Emergency van on transit.' }
    ],
    tags: ['ElectrocutionRisk', 'HighVoltage', 'Emergency'],
    estimatedRepairDays: 1,
    requiredEquipment: ['Bucket lift truck', 'Insulated testing multimeter', 'Weatherproof junction cover']
  },
  {
    id: 'CP-5520',
    title: 'Monsoon stormwater drain choke causing knee-deep waterlogging',
    description: 'Plastic waste and construction debris blocking the main culvert inlet. Rainwater entering ground floor residences and halting vehicle traffic.',
    category: 'flooding',
    subCategory: 'Stormwater Culvert Blockage',
    status: 'reported',
    severityScore: 8,
    emergencyLevel: 'High',
    isEmergency: true,
    confidenceScore: 95,
    citizenImpact: 'Inundation affecting 30+ residential homes and impassable road.',
    department: 'Disaster Management & Drainage',
    location: {
      latitude: 12.9856,
      longitude: 77.5801,
      address: 'Railway Underpass Road, Malleshwaram 8th Cross',
      ward: 'Ward 45 - Malleshwaram',
      city: 'Bengaluru',
      pincode: '560003',
      landmark: 'Underpass Bridge #3'
    },
    images: {
      before: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80']
    },
    mediaType: 'image',
    language: 'kn',
    summaryEn: 'Severe drainage blockage at railway subway. Water stagnation level 45cm. Immediate dewatering pump and suction truck required.',
    summaryLocal: 'ಮಲ್ಲೇಶ್ವರಂ ರೈಲ್ವೆ ಅಂಡರ್‌ಪಾಸ್‌ನಲ್ಲಿ ನೀರು ನಿಂತಿದೆ. ಮಳೆನೀರು ಕಾಲುವೆ ಕಸದಿಂದ ತುಂಬಿದ್ದು ತಕ್ಷಣ ಪಂಪ್ ಮೂಲಕ ನೀರು ತೆಗೆಯಬೇಕು.',
    createdAt: '2026-09-25T09:40:00.000Z',
    updatedAt: '2026-09-25T09:40:00.000Z',
    upvotes: 19,
    userHasUpvoted: false,
    reporter: {
      id: 'usr-501',
      name: 'Venkatesh Murthy',
      isAnonymous: false,
      reputation: 88
    },
    evidence: {
      sha256Hash: 'c2b74052f53d4c82c23f666cfb74967ee35940422c54f483c072eb2828b6d053',
      exifTimestamp: '2026-09-25T09:35:12.000Z',
      gpsVerified: true,
      aiIntegrityScore: 96,
      deviceFingerprint: 'DEV-WEB-BLR-309'
    },
    timeline: [
      { status: 'reported', timestamp: '2026-09-25T09:40:00.000Z', actor: 'Venkatesh Murthy', actorRole: 'Citizen', note: 'Reported with GPS tag.' }
    ],
    tags: ['MonsoonRisk', 'Underpass', 'Drainage'],
    estimatedRepairDays: 1,
    requiredEquipment: ['High-volume diesel dewatering pump', 'Super-sucker silt jetting machine']
  }
];

export const INITIAL_ASSETS: AssetTwin[] = [
  {
    id: 'AST-RD-142',
    name: '100ft Road Arterial Corridor',
    type: 'Road',
    ward: 'Ward 142 - Indiranagar',
    zone: 'East Zone',
    conditionScore: 68, // Health Index
    lastInspected: '2026-08-15',
    nextScheduledAudit: '2026-11-15',
    installedYear: 2021,
    criticality: 'Critical',
    openTicketsCount: 3,
    coordinates: { lat: 12.9783, lng: 77.6408 },
    specifications: {
      lengthKm: '4.8 km',
      laneCount: '4 Lanes + Median',
      surfaceType: 'Dense Bituminous Macadam (DBM)',
      trafficDensity: '45,000 PCU/day'
    },
    maintenanceHistory: [
      { date: '2025-10-12', workType: 'Milling and 40mm BC Resurfacing', contractor: 'Shree Infra Ltd', cost: '₹48,00,000', status: 'Completed' },
      { date: '2026-04-18', workType: 'Storm drain inlet clearing', contractor: 'Ward Operations', cost: '₹1,20,000', status: 'Completed' }
    ]
  },
  {
    id: 'AST-BR-089',
    name: 'Domlur Flyover Span #4',
    type: 'Bridge',
    ward: 'Ward 112 - Domlur',
    zone: 'Central Zone',
    conditionScore: 84,
    lastInspected: '2026-07-20',
    nextScheduledAudit: '2026-10-20',
    installedYear: 2017,
    criticality: 'High',
    openTicketsCount: 0,
    coordinates: { lat: 12.9609, lng: 77.6387 },
    specifications: {
      structuralType: 'Prestressed Concrete Box Girder',
      spanLength: '120 meters',
      loadCapacity: 'IRC Class 70R',
      bearingType: 'Pot-PTFE Bearings'
    },
    maintenanceHistory: [
      { date: '2025-11-04', workType: 'Expansion joint sealant & elastomeric pad check', contractor: 'National Bridge Corp', cost: '₹8,50,000', status: 'Completed' }
    ]
  },
  {
    id: 'AST-DR-044',
    name: 'Primary Stormwater Box Drain - K-100',
    type: 'Stormwater_Drain',
    ward: 'Ward 151 - Koramangala',
    zone: 'South Zone',
    conditionScore: 59,
    lastInspected: '2026-09-01',
    nextScheduledAudit: '2026-10-01',
    installedYear: 2019,
    criticality: 'Critical',
    openTicketsCount: 2,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    specifications: {
      catchmentArea: '14.2 sq km',
      crossSection: '3.5m x 2.2m RCC Box',
      dischargeCapacity: '42 cumecs',
      siltLevel: '32% occupied'
    },
    maintenanceHistory: [
      { date: '2026-05-10', workType: 'Pre-monsoon robotic desilting', contractor: 'CleanStreams JV', cost: '₹14,20,000', status: 'Completed' }
    ]
  },
  {
    id: 'AST-TR-210',
    name: 'Substation Feeder Transformer 250kVA',
    type: 'Transformer',
    ward: 'Ward 176 - BTM Layout',
    zone: 'South-East Zone',
    conditionScore: 72,
    lastInspected: '2026-08-28',
    nextScheduledAudit: '2026-11-28',
    installedYear: 2022,
    criticality: 'High',
    openTicketsCount: 1,
    coordinates: { lat: 12.9279, lng: 77.6271 },
    specifications: {
      rating: '250 kVA / 11kV to 415V',
      coolingType: 'ONAN (Oil Natural Air Natural)',
      oilDielectricStrength: '55 kV',
      connectedFeeders: '4 Residential Grid Segments'
    },
    maintenanceHistory: [
      { date: '2026-02-14', workType: 'Oil filtration and breather silica gel replacement', contractor: 'DISCOM Maintenance Wing', cost: '₹45,000', status: 'Completed' }
    ]
  }
];

export const INITIAL_PREDICTIVE_ZONES: PredictiveRiskZone[] = [
  {
    zoneName: 'Majestic City Subway & Underpass Corridor',
    riskType: 'Flooding',
    probability: 88,
    recommendedAction: 'Deploy high-capacity mobile dewatering pumps & desilt stormwater inlet grates before monsoon peak.',
    preventativeCostSavings: '₹4.2 Lakhs vs post-flood emergency remediation',
    coordinates: { lat: 12.9774, lng: 77.5708 }
  },
  {
    zoneName: 'Outer Ring Road - Bellandur Tech Corridor',
    riskType: 'Road Collapse',
    probability: 76,
    recommendedAction: 'Apply micro-surfacing bitumen sealant along heavy transit axle lanes.',
    preventativeCostSavings: '₹12.5 Lakhs vs full sub-base rebuilding',
    coordinates: { lat: 12.9260, lng: 77.6762 }
  },
  {
    zoneName: 'Commercial Street Heritage Transformer Feeder',
    riskType: 'Transformer Overload',
    probability: 69,
    recommendedAction: 'Execute load balancing and thermal camera inspection of distribution transformer.',
    preventativeCostSavings: '₹3.8 Lakhs in blackout avoidance',
    coordinates: { lat: 12.9822, lng: 77.6083 }
  },
  {
    zoneName: 'Old Airport Road Primary Drainage Culvert',
    riskType: 'Drainage Choke',
    probability: 82,
    recommendedAction: 'Automated grab-bucket desilting to remove plastic choke ahead of heavy rainfall.',
    preventativeCostSavings: '₹6.1 Lakhs in flood damage prevention',
    coordinates: { lat: 12.9592, lng: 77.6534 }
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Work Crew On Site #CP-8842',
    message: 'PWD road maintenance team has arrived at 100ft Road junction with cold-mix asphalt.',
    type: 'status_update',
    reportId: 'CP-8842',
    timestamp: '2026-09-25T09:15:00.000Z',
    read: false
  },
  {
    id: 'notif-2',
    title: '+50 Civic Karma Awarded!',
    message: 'Your verified report helped 1,200 commuters avoid traffic hazards.',
    type: 'karma_reward',
    reportId: 'CP-8842',
    timestamp: '2026-09-24T08:45:00.000Z',
    read: false
  },
  {
    id: 'notif-3',
    title: '🚨 Emergency Alert: High Voltage Wire',
    message: 'Critical safety alert logged in BTM 1st Stage. Substation crew dispatched.',
    type: 'emergency_alert',
    reportId: 'CP-6019',
    timestamp: '2026-09-25T06:18:00.000Z',
    read: true
  }
];

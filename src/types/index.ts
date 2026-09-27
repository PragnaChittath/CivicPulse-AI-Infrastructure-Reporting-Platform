export type UserRole = 'citizen' | 'authority' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  ward: string;
  city: string;
  civicKarma: number;
  badges: string[];
  avatar: string;
  preferredLanguage: string;
  verifiedCitizen: boolean;
}

export type IssueCategory =
  | 'pothole'
  | 'garbage'
  | 'water_leakage'
  | 'broken_streetlight'
  | 'damaged_road'
  | 'fallen_tree'
  | 'flooding'
  | 'damaged_building'
  | 'sewer_overflow'
  | 'traffic_signal'
  | 'illegal_encroachment'
  | 'other';

export type IssueStatus =
  | 'reported'
  | 'verified'
  | 'assigned'
  | 'in_progress'
  | 'inspection'
  | 'resolved'
  | 'citizen_verified';

export type EmergencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ReportLocation {
  latitude: number;
  longitude: number;
  address: string;
  ward: string;
  city: string;
  pincode: string;
  landmark?: string;
}

export interface TimelineEntry {
  status: IssueStatus;
  timestamp: string;
  actor: string;
  actorRole: string;
  note: string;
  mediaUrl?: string;
}

export interface EvidenceRecord {
  sha256Hash: string;
  exifTimestamp: string;
  gpsVerified: boolean;
  aiIntegrityScore: number;
  deviceFingerprint: string;
}

export interface ResolutionAudit {
  isVerified: boolean;
  confidence: number;
  verdict: 'VERIFIED_RESOLVED' | 'NEEDS_REINSPECTION' | 'REJECTED_DEFECTIVE';
  notes: string;
  workQualityRating: number;
  verifiedAt: string;
  inspectorName?: string;
}

export interface CivicReport {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  subCategory: string;
  status: IssueStatus;
  severityScore: number; // 1 to 10
  emergencyLevel: EmergencyLevel;
  isEmergency: boolean;
  confidenceScore: number; // 0 to 100
  citizenImpact: string;
  department: string;
  assignedOfficer?: {
    id: string;
    name: string;
    designation: string;
    phone: string;
    division: string;
  };
  location: ReportLocation;
  images: {
    before: string[];
    after?: string[];
  };
  mediaType: 'image' | 'video' | 'audio' | 'text';
  audioTranscript?: string;
  language: string;
  summaryEn: string;
  summaryLocal: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  userHasUpvoted?: boolean;
  reporter: {
    id: string;
    name: string;
    isAnonymous: boolean;
    reputation: number;
  };
  evidence: EvidenceRecord;
  timeline: TimelineEntry[];
  resolutionAudit?: ResolutionAudit;
  duplicateOf?: string;
  tags: string[];
  estimatedRepairDays: number;
  requiredEquipment?: string[];
  safetyPrecautions?: string[];
  offlinePendingSync?: boolean;
  citizenVerification?: {
    isSatisfied: boolean;
    rating: number;
    comment: string;
    verifiedAt: string;
    citizenName: string;
  };
}

export interface AssetTwin {
  id: string;
  name: string;
  type: 'Road' | 'Bridge' | 'Stormwater_Drain' | 'Water_Main' | 'Transformer' | 'High_Mast_Lamp' | 'Waste_Transfer_Station';
  ward: string;
  zone: string;
  conditionScore: number; // 0 to 100 (Health Index)
  lastInspected: string;
  nextScheduledAudit: string;
  installedYear: number;
  criticality: 'Low' | 'Medium' | 'High' | 'Critical';
  openTicketsCount: number;
  coordinates: { lat: number; lng: number };
  specifications: Record<string, string>;
  maintenanceHistory: Array<{
    date: string;
    workType: string;
    contractor: string;
    cost: string;
    status: string;
  }>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'status_update' | 'emergency_alert' | 'karma_reward' | 'nearby_hazard';
  reportId?: string;
  timestamp: string;
  read: boolean;
}

export interface PredictiveRiskZone {
  zoneName: string;
  riskType: 'Flooding' | 'Road Collapse' | 'Transformer Overload' | 'Drainage Choke';
  probability: number;
  recommendedAction: string;
  preventativeCostSavings: string;
  coordinates: { lat: number; lng: number };
}

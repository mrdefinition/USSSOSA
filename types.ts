
export enum UserRole {
  PUBLIC = 'public',
  MEMBER = 'member',
  ADMIN = 'admin',
  PLATFORM_ADMIN = 'platform_admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  graduatingYear?: number;
  location?: string;
  phone?: string;
}

export enum EventType {
  BIRTHDAY = 'Birthday',
  DEATH = 'Death',
  ACHIEVEMENT = 'Achievement',
  OTHER = 'Other'
}

export interface MemberEvent {
  id: string;
  memberId: string;
  eventType: EventType;
  description: string;
  eventDate: string;
  isPublic: boolean;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image: string;
}

export type ProjectCategory = 
  | 'Education & Scholarships' 
  | 'School Development Initiatives' 
  | 'Mentorship & Career Development' 
  | 'Community Outreach' 
  | 'Sustainability & Investment Initiatives';

export interface Project {
  id: string;
  name: string;
  status: 'ongoing' | 'completed' | 'planned';
  description: string;
  category: ProjectCategory;
  image: string;
  targetAmount?: number;
  raisedAmount?: number;
  impact?: string;
  documents?: string[];
  setId?: string; 
}

export interface GovernanceMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: 'Board' | 'Executive' | 'Committee';
}

export interface SetExecutive {
  name: string;
  role: string;
  image: string;
}

export interface AlumniSet {
  id: string;
  year: number;
  leader: string; 
  memberCount: number;
  image: string;
  executives?: SetExecutive[];
}

export interface AlumniEvent {
  id: string;
  title: string;
  date: string; 
  time: string;
  location: string;
  description: string;
  category: 'Reunion' | 'Meeting' | 'Social' | 'Impact';
  rsvps: string[]; 
  setId?: string; 
}

export interface WhatsAppMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'received' | 'read';
  isIncoming: boolean;
}

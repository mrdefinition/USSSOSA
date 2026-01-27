
export enum UserRole {
  PUBLIC = 'public',
  MEMBER = 'member',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  graduatingYear?: number;
  location?: string;
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
  setId?: string; // Optional: Link project to a specific graduating set
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
  leader: string; // The primary contact/chairperson
  memberCount: number;
  image: string;
  executives?: SetExecutive[];
}

export interface AlumniEvent {
  id: string;
  title: string;
  date: string; // ISO format
  time: string;
  location: string;
  description: string;
  category: 'Reunion' | 'Meeting' | 'Social' | 'Impact';
  rsvps: string[]; // Array of user IDs
  setId?: string; // Optional: ID of the specific graduating set
}


import { NewsItem, Project, GovernanceMember, AlumniSet, AlumniEvent } from './types';

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: '2024 Grand Reunion Gala Night',
    date: 'Dec 15, 2024',
    category: 'Event',
    summary: 'The biggest gathering of Unity High alumni is happening this December in Lagos.',
    content: 'Full details about the event venue, ticketing, and special guests...',
    image: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'New Library Project Completed',
    date: 'Oct 10, 2024',
    category: 'Project',
    summary: 'The 1995 Set has successfully renovated the school library.',
    content: 'The project includes 50 new computers, air conditioning, and 5000 new books...',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Excellence Scholarship Fund',
    status: 'ongoing',
    category: 'Education & Scholarships',
    description: 'Providing full tuition for the top 5 students in each senior grade level to ensure financial barriers do not hinder academic excellence.',
    image: 'https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=800',
    targetAmount: 5000000,
    raisedAmount: 3200000,
    impact: 'Over 45 students currently benefit from this fund annually.'
  },
  {
    id: 'p2',
    name: 'ICT Center Modernization',
    status: 'planned',
    category: 'School Development Initiatives',
    description: 'Equipping the school with high-speed internet, modern hardware, and solar power backup for uninterrupted learning.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
    targetAmount: 15000000,
    raisedAmount: 2500000,
    setId: 's1995'
  },
  {
    id: 'p3',
    name: 'Alumni Mentorship Circle',
    status: 'ongoing',
    category: 'Mentorship & Career Development',
    description: 'Connecting final year students with seasoned professionals in law, medicine, tech, and engineering for career guidance.',
    image: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800',
    impact: '85% of mentees successfully gained admission into top-tier universities.'
  },
  {
    id: 'p4',
    name: 'USSSOSA Endowment Fund',
    status: 'ongoing',
    category: 'Sustainability & Investment Initiatives',
    description: 'A long-term investment vehicle designed to generate passive income for the continuous maintenance of school facilities.',
    image: 'https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg?auto=compress&cs=tinysrgb&w=800',
    targetAmount: 50000000,
    raisedAmount: 12000000
  },
  {
    id: 'p5',
    name: 'Health & Wellness Outreach',
    status: 'completed',
    category: 'Community Outreach',
    description: 'Annual medical checkups and health awareness seminars for the Olodi Apapa host community and current students.',
    image: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=800',
    impact: 'Treated over 1,200 residents in the 2023 cycle.',
    setId: 's1990'
  }
];

export const GOVERNANCE: GovernanceMember[] = [
  {
    id: 'g1',
    name: 'Engr. Adebayo Ogunlesi',
    role: 'President',
    category: 'Executive',
    bio: 'Class of 1982. Professional engineer with 20 years of experience in project management.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'g2',
    name: 'Dr. Chioma Nnadi',
    role: 'Secretary General',
    category: 'Executive',
    bio: 'Class of 1995. Education specialist and passionate advocate for girl-child education.',
    image: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const ALUMNI_SETS: AlumniSet[] = [
  { 
    id: 's1982', 
    year: 1982, 
    leader: 'Engr. Adebayo Ogunlesi', 
    memberCount: 85, 
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    executives: [
      { name: 'Engr. Adebayo Ogunlesi', role: 'Chairperson', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Mr. Babatunde Raji', role: 'Secretary', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Mrs. Funke Akindele', role: 'Treasurer', image: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  { 
    id: 's1985', 
    year: 1985, 
    leader: 'Chief Benson Idahosa', 
    memberCount: 120, 
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    executives: [
      { name: 'Chief Benson Idahosa', role: 'Chairperson', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Elder Gabriel Enahoro', role: 'Vice Chairperson', image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  { id: 's1990', year: 1990, leader: 'Mrs. Funmilayo Ransome', memberCount: 155, image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { 
    id: 's1995', 
    year: 1995, 
    leader: 'Dr. Chioma Nnadi', 
    memberCount: 198, 
    image: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=400',
    executives: [
      { name: 'Dr. Chioma Nnadi', role: 'Chairperson', image: 'https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Engr. Segun Arinze', role: 'Secretary', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Dr. Amina Yusuf', role: 'Welfare Officer', image: 'https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Mr. Emeka Obi', role: 'Treasurer', image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  },
  { id: 's2000', year: 2000, leader: 'Mr. David Adeleke', memberCount: 210, image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's2005', year: 2005, leader: 'Mrs. Titilayo Balogun', memberCount: 245, image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's2010', year: 2010, leader: 'Mr. Segun Arinze', memberCount: 310, image: 'https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's2015', year: 2015, leader: 'Miss Ifeanyi Onyeka', memberCount: 420, image: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's2022', year: 2022, leader: 'Mr. Emmanuel Ojo', memberCount: 505, image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const EVENTS: AlumniEvent[] = [
  {
    id: 'e1',
    title: 'National AGM 2024',
    date: '2024-11-20',
    time: '10:00 AM',
    location: 'Main Auditorium, USSS Olodi Apapa',
    description: 'Annual General Meeting to discuss progress, budget, and electing new executives.',
    category: 'Meeting',
    rsvps: []
  },
  {
    id: 'e2',
    title: 'Lagos Branch Beach Hangout',
    date: '2024-12-05',
    time: '2:00 PM',
    location: 'Landmark Beach, VI',
    description: 'A relaxed networking event for alumni residing in Lagos.',
    category: 'Social',
    rsvps: []
  },
  {
    id: 'e3',
    title: 'Mentorship Webinar: Tech Careers',
    date: '2024-10-25',
    time: '7:00 PM',
    location: 'Zoom (Link provided after RSVP)',
    description: 'Hear from our alumni working at Google, Meta, and Flutterwave.',
    category: 'Impact',
    rsvps: []
  },
  {
    id: 'se1',
    title: '1995 Set End-of-Year Dinner',
    date: '2024-12-22',
    time: '7:00 PM',
    location: 'Radisson Blu, Victoria Island',
    description: 'A special dinner for the Class of 1995 to celebrate another successful year.',
    category: 'Social',
    rsvps: [],
    setId: 's1995'
  },
  {
    id: 'se2',
    title: '1995 Set Library Donation Ceremony',
    date: '2024-10-10',
    time: '11:00 AM',
    location: 'Unity School Library',
    description: 'The official handover ceremony of the renovated library project.',
    category: 'Impact',
    rsvps: [],
    setId: 's1995'
  }
];

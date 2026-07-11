export interface User {
  email: string;
  name: string;
  role: 'citizen' | 'authority';
  avatarUrl?: string;
}

export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ComplaintCategory = 'Road' | 'Garbage' | 'Water' | 'Streetlight' | 'Drainage' | 'Others';

export interface Complaint {
  id: string;
  issue: string;
  district: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  date: string;
  upvotes: number;
}

export interface AuthorityNode {
  id: string;
  name: string;
  designation: string;
  department: string;
  district: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave';
}

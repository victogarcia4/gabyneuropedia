export interface ChecklistItem {
  id: string;
  category: 'behavioral' | 'differential' | 'emotional';
  text: string;
  explanation: string;
}

export interface LeadData {
  name: string;
  email: string;
  role?: string;
  childAge: string;
  consents: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  imageUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CopyworkSection {
  title: string;
  description: string;
  originalText: string;
  copywritingCommentary: string;
}

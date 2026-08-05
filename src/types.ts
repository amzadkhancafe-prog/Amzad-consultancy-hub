export interface ServiceItem {
  id: string;
  title: string;
  category: 'loan' | 'insurance' | 'property' | 'wealth';
  description: string;
  iconName: string;
  rate?: string;
  maxAmount?: string;
  tenure?: string;
  features: string[];
  popular?: boolean;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  serviceUsed: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'loans' | 'insurance' | 'process';
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  amountNeeded: string;
  message: string;
}

export interface EligibilityFormData {
  employmentType: 'salaried' | 'self-employed' | 'business';
  monthlyIncome: string;
  existingEmi: string;
  desiredLoanType: string;
  creditScoreRange: string;
}

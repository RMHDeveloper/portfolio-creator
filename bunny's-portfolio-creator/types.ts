
export enum QuestionType {
  TEXT = 'TEXT',
  LIST = 'LIST',
  IMAGE = 'IMAGE'
}

export interface Question {
  id: keyof PortfolioData;
  category: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  placeholder?: string;
  maxEntries?: number;
}

export interface PortfolioData {
  fullName: string;
  designation: string;
  profilePhoto: string;
  companyName: string;
  officeLocation: string;
  industry: string;
  yearsInBusiness: string;
  previousExperience: string;
  spouseName: string;
  children: string;
  pets: string;
  residence: string;
  yearsInCity: string;
  hobbies: string;
  activities: string;
  burningDesire: string;
  secret: string;
  successKey: string;
  goals: string;
  accomplishments: string;
  currentInterests: string;
  network: string;
  referralPartners: string;
  clientServices: string;
  mobile: string;
  email: string;
  website: string;
}
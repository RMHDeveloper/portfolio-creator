
import { Question, QuestionType } from './types';

export const PORTFOLIO_STEPS: Question[] = [
  { id: 'fullName', category: 'Identity', title: "Full Name", type: QuestionType.TEXT, placeholder: "e.g. Amit Kumar Sharma" },
  { id: 'designation', category: 'Identity', title: "Designation", type: QuestionType.TEXT, placeholder: "e.g. Managing Director" },
  { id: 'profilePhoto', category: 'Identity', title: "Profile Photo", type: QuestionType.IMAGE },
  { id: 'companyName', category: 'Business', title: "Company Name", type: QuestionType.TEXT, placeholder: "e.g. Sharma Enterprise Pvt Ltd" },
  { id: 'officeLocation', category: 'Business', title: "Office Location", type: QuestionType.TEXT, placeholder: "e.g. T. Nagar, Chennai" },
  { id: 'industry', category: 'Business', title: "Industry / Profession", type: QuestionType.TEXT, placeholder: "e.g. Chartered Accountant" },
  { id: 'yearsInBusiness', category: 'Business', title: "Years in Business", type: QuestionType.TEXT, placeholder: "e.g. 12 Years" },
  { id: 'previousExperience', category: 'Business', title: "Previous Work Experience", type: QuestionType.TEXT, placeholder: "e.g. Ex-Senior Manager, TCS" },
  { id: 'spouseName', category: 'Family', title: "Spouse Name", type: QuestionType.TEXT, placeholder: "e.g. Priya Sharma" },
  { id: 'children', category: 'Family', title: "Children", type: QuestionType.TEXT, placeholder: "e.g. Ananya (8), Rahul (5)" },
  { id: 'pets', category: 'Family', title: "Pets at Home", type: QuestionType.TEXT, placeholder: "e.g. Golden Retriever named Buddy" },
  { id: 'residence', category: 'Family', title: "Current Residence", type: QuestionType.TEXT, placeholder: "e.g. Adyar, Chennai" },
  { id: 'yearsInCity', category: 'Family', title: "Years in this City", type: QuestionType.TEXT, placeholder: "e.g. Born and brought up here" },
  { id: 'hobbies', category: 'Personal', title: "Hobbies", type: QuestionType.TEXT, placeholder: "e.g. Cricket, Photography" },
  { id: 'activities', category: 'Personal', title: "Activities / Interests", type: QuestionType.TEXT, placeholder: "e.g. Yoga, Rotary Club" },
  { id: 'burningDesire', category: 'Personal', title: "Burning Desire", type: QuestionType.TEXT, placeholder: "e.g. To lead the industry in ethics" },
  { id: 'secret', category: 'Personal', title: "Something no one knows about you", type: QuestionType.TEXT, placeholder: "e.g. I can play the flute" },
  { id: 'successKey', category: 'Personal', title: "Key to Success", type: QuestionType.TEXT, placeholder: "e.g. Persistence and Empathy" },
  { id: 'goals', category: 'GAINS', title: "Your Goals", type: QuestionType.TEXT, placeholder: "e.g. Expand to 3 new cities" },
  { id: 'accomplishments', category: 'GAINS', title: "Accomplishments", type: QuestionType.TEXT, placeholder: "e.g. Handled 1000+ client projects" },
  { id: 'currentInterests', category: 'GAINS', title: "Current Interests", type: QuestionType.TEXT, placeholder: "e.g. AI in Business Automation" },
  { id: 'network', category: 'GAINS', title: "Your Network", type: QuestionType.TEXT, placeholder: "e.g. CII Member, Lions Club" },
  { id: 'referralPartners', category: 'Referrals', title: "Ideal Referral Partners", type: QuestionType.LIST, placeholder: "Real Estate Agents", maxEntries: 4 },
  { id: 'clientServices', category: 'Referrals', title: "What do you do for clients?", type: QuestionType.LIST, placeholder: "End-to-end Tax Planning", maxEntries: 4 },
  { id: 'mobile', category: 'Contact', title: "Mobile Number", type: QuestionType.TEXT, placeholder: "+91 98765 43210" },
  { id: 'email', category: 'Contact', title: "Email Address", type: QuestionType.TEXT, placeholder: "name@company.com" },
  { id: 'website', category: 'Contact', title: "Website / LinkedIn", type: QuestionType.TEXT, placeholder: "www.company.com" }
];
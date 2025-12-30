import { PolicyData } from './types';

// 1. Risk Control: Forbidden words that trigger immediate fallback
export const RISK_WORDS = [
  'gamble', 'betting', 'illegal', 'hack', 'violence', 'kill', 'scam', 
  'bribe', 'laundering'
];

// 2. Mock Database for "Read-Only" Commercial Fleet Policy Queries
export const MOCK_POLICY_DB: Record<string, PolicyData> = {
  'POL-8888': {
    id: 'POL-8888',
    holder: 'Mr. Zhang (Fleet Admin)',
    companyName: 'Speedy Logistics Group Ltd.',
    status: 'Active',
    expiryDate: '2025-12-31',
    type: 'Commercial Fleet Comprehensive Insurance',
    vehicleCount: 50
  },
  'POL-9999': {
    id: 'POL-9999',
    holder: 'Ms. Li (Operations)',
    companyName: 'City Transport Corp.',
    status: 'Expired',
    expiryDate: '2023-01-01',
    type: 'Commercial Third Party Liability',
    vehicleCount: 12
  }
};

// 3. Static Q&A Map (Local fast-path for B2B)
export const STATIC_QA: Record<string, string> = {
  'hotline': 'Our VIP Corporate Hotline is 400-800-8888.',
  'phone': 'Our VIP Corporate Hotline is 400-800-8888.',
  'hours': 'Corporate services are available Mon-Fri, 9:00 AM - 6:00 PM.',
  'claim': 'For large group claims, please contact your dedicated Account Manager directly or access the "Group Claims" portal.',
  'address': 'Headquarters: No. 123 Financial Street, Beijing.',
};
import { MOCK_POLICY_DB } from '../constants';
import { PolicyData } from '../types';

export const queryPolicyDatabase = async (policyId: string): Promise<PolicyData | null> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const formattedId = policyId.toUpperCase().trim();
  return MOCK_POLICY_DB[formattedId] || null;
};

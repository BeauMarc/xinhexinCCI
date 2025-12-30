export enum Role {
  MODEL = 'model',
  USER = 'user'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface PolicyData {
  id: string;
  holder: string;
  companyName: string;
  status: string;
  expiryDate: string;
  type: string;
  vehicleCount: number;
}

export interface IntentDefinition {
  id: string;
  name: string;
  keywords: string[];
  threshold: number; // 0-1
}

export interface IntentMatch {
  id: string;
  name: string;
  confidence: number; // 0-1
  matchedKeywords: string[];
  modelToUse: string;
  usedFallback: boolean;
}

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
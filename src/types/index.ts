export interface User {
  id: string;
  name: string;
  email: string;
  profile: {
    age: number;
    income: number;
    location: string;
    occupation: string;
    familySize: number;
  };
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Scheme {
  _id: string;
  name: string;
  details: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  benefits: string;
  applicationDeadline?: string;
  applicationProcess: string[];
  exclusion?: string[];
  category: "education" | "health" | "housing" | "employment" | "other";
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  user: string | User;
  type: string;
  status: "pending" | "verified" | "rejected";
  url: string;
  verificationDetails?: {
    verifiedAt: string;
    verifiedBy: string;
    comments: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AIModel {
  id: string;
  name: string;
  type: "document-verification" | "eligibility-check";
  status: "training" | "ready" | "error";
  configuration: Record<string, any>;
  metrics?: {
    accuracy: number;
    precision: number;
    recall: number;
  };
  lastTrained?: string;
  createdAt: string;
  updatedAt: string;
}

import { BadgeCounts } from './static-type';

export interface Question {
  id: number;
  title: string;
  explanation: string;
  views: number;
  upvotes: number;
  answers: number;
  downvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  slug: string;
  author: UserBasicInfo;
  saved: boolean;
  tags: TagBasicInfo[];
  createdAt: string;
  updatedAt?: string;
}

export interface TagBasicInfo {
  id: number;
  name: string;
  description?: string;
}

// user type

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accountName: string;
  picture?: string;
  bio?: string;
  roles: string[];
  tags?: TagBasicInfo[];
  location?: string;
  portfolioWebsite? :string;
  mfaEnabled: boolean;
  authProvider: string;

  createdAt: string;
  updatedAt?: string;
}
export interface PreviewUserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accountName: string;
  portfolioWebsite?: string;
  reputation: number;
  totalQuestions: number;
  totalAnswers: number;
  badgeCounts: BadgeCounts;
  location?: string;
  picture: string;
  bio?: string;
  createdAt: Date;
  updatedAt?: string;
}

export interface UserBasicInfo {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
}

// answer type

export interface Answer {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;

  question:QuestionBasicInfo;
  upvoted: boolean;
  downvoted: boolean;
  author: UserBasicInfo;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionBasicInfo 
  {
    id: number;
    title: string;
    slug: string;
  }


export interface Tag {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  following?: boolean;
}

export interface Question {
  id: string;
  type: 'Text' | 'CheckBox' | 'Grid';
  title: string;
  description?: string;
  required: boolean;
  image?: string;
  options?: string[];
  gridRows?: string[];
  gridColumns?: string[];
}

export interface Form {
  id?: string;
  title: string;
  description?: string;
  headerImage?: string;
  questions: Question[];
  isPublished: boolean;
}

export interface RespondentInfo {
  name: string;
  email: string;
}

export interface FormResponse {
  questionId: string;
  answer: string | string[];
}
import React from 'react';
import { Question } from '../../../types/form';
import QuestionBasicFields from './QuestionBasicFields';

interface TextQuestionProps {
  question: Question;
  onChange: (updates: Partial<Question>) => void;
}

export default function TextQuestion({ question, onChange }: TextQuestionProps) {
  return (
    <QuestionBasicFields
      question={question}
      onChange={onChange}
    />
  );
}
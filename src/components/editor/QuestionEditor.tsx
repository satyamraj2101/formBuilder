import React from 'react';
import { Question } from '../../types/form';
import TextQuestion from './question-types/TextQuestion';
import CheckboxQuestion from './question-types/CheckboxQuestion';
import GridQuestion from './question-types/GridQuestion';

interface QuestionEditorProps {
  question: Question;
  onChange: (updates: Partial<Question>) => void;
}

export default function QuestionEditor({ question, onChange }: QuestionEditorProps) {
  const QuestionComponent = {
    Text: TextQuestion,
    CheckBox: CheckboxQuestion,
    Grid: GridQuestion,
  }[question.type];

  return (
    <div className="bg-white p-6 rounded-lg">
      <QuestionComponent
        question={question}
        onChange={onChange}
      />
    </div>
  );
}
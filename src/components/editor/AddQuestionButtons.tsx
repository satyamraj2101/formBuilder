import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Question } from '../../types/form';

interface AddQuestionButtonsProps {
  onAddQuestion: (question: Question) => void;
}

export default function AddQuestionButtons({ onAddQuestion }: AddQuestionButtonsProps) {
  const createQuestion = (type: Question['type']): Question => ({
    id: Date.now().toString(),
    type,
    title: '',
    required: false,
    options: type === 'CheckBox' ? ['Option 1'] : undefined,
    gridRows: type === 'Grid' ? ['Row 1'] : undefined,
    gridColumns: type === 'Grid' ? ['Column 1'] : undefined,
  });

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onAddQuestion(createQuestion('Text'))}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <PlusCircle className="w-4 h-4" />
        Text Question
      </button>
      <button
        onClick={() => onAddQuestion(createQuestion('CheckBox'))}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <PlusCircle className="w-4 h-4" />
        Checkbox Question
      </button>
      <button
        onClick={() => onAddQuestion(createQuestion('Grid'))}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        <PlusCircle className="w-4 h-4" />
        Grid Question
      </button>
    </div>
  );
}
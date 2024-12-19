import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Question } from '../../../types/form';
import QuestionBasicFields from './QuestionBasicFields';

interface CheckboxQuestionProps {
  question: Question;
  onChange: (updates: Partial<Question>) => void;
}

export default function CheckboxQuestion({ question, onChange }: CheckboxQuestionProps) {
  const addOption = () => {
    const options = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
    onChange({ options });
  };

  const updateOption = (index: number, value: string) => {
    if (question.options) {
      const options = [...question.options];
      options[index] = value;
      onChange({ options });
    }
  };

  const removeOption = (index: number) => {
    if (question.options) {
      const options = question.options.filter((_, i) => i !== index);
      onChange({ options });
    }
  };

  return (
    <div className="space-y-4">
      <QuestionBasicFields
        question={question}
        onChange={onChange}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder={`Option ${index + 1}`}
            />
            <button
              onClick={() => removeOption(index)}
              className="p-1 text-red-500 hover:text-red-600"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add Option
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { Image } from 'lucide-react';
import { Question } from '../../../types/form';
import { handleImageUpload } from '../../../utils/imageUtils';

interface QuestionBasicFieldsProps {
  question: Question;
  onChange: (updates: Partial<Question>) => void;
}

export default function QuestionBasicFields({ question, onChange }: QuestionBasicFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={question.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Question Title"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <textarea
          value={question.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Question Description (optional)"
          className="w-full p-2 border rounded"
          rows={2}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => onChange({ required: e.target.checked })}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Required</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
          <Image className="w-4 h-4" />
          <span>Add Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, onChange)}
            className="hidden"
          />
        </label>
      </div>

      {question.image && (
        <div className="relative">
          <img
            src={question.image}
            alt="Question"
            className="max-h-48 rounded"
          />
          <button
            onClick={() => onChange({ image: undefined })}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
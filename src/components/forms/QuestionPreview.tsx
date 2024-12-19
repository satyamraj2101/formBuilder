import React from 'react';
import { Question } from '../../types/form';

interface QuestionPreviewProps {
  question: Question;
  response: string | string[] | undefined;
  onResponseChange: (value: string | string[]) => void;
}

export default function QuestionPreview({
  question,
  response,
  onResponseChange,
}: QuestionPreviewProps) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">
        {question.title}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {question.description && (
        <p className="text-sm text-gray-500">{question.description}</p>
      )}
      {question.image && (
        <img src={question.image} alt="Question" className="max-h-48 rounded" />
      )}

      {question.type === 'Text' && (
        <input
          type="text"
          required={question.required}
          value={response as string || ''}
          onChange={(e) => onResponseChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      )}

      {question.type === 'CheckBox' && (
        <div className="space-y-2">
          {question.options?.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={(response as string[] || []).includes(option)}
                onChange={(e) => {
                  const currentResponses = (response as string[]) || [];
                  const newResponses = e.target.checked
                    ? [...currentResponses, option]
                    : currentResponses.filter((r) => r !== option);
                  onResponseChange(newResponses);
                }}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === 'Grid' && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2"></th>
                {question.gridColumns?.map((column, index) => (
                  <th key={index} className="border p-2">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {question.gridRows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border p-2 font-medium">{row}</td>
                  {question.gridColumns?.map((_, colIndex) => (
                    <td key={colIndex} className="border p-2 text-center">
                      <input
                        type="radio"
                        name={`${question.id}-${rowIndex}`}
                        onChange={() => {
                          const currentResponses = (response as string[]) || [];
                          currentResponses[rowIndex] = colIndex.toString();
                          onResponseChange(currentResponses);
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
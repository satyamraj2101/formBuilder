import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Question } from '../../../types/form';
import QuestionBasicFields from './QuestionBasicFields';

interface GridQuestionProps {
  question: Question;
  onChange: (updates: Partial<Question>) => void;
}

export default function GridQuestion({ question, onChange }: GridQuestionProps) {
  const addRow = () => {
    const gridRows = [...(question.gridRows || []), `Row ${(question.gridRows?.length || 0) + 1}`];
    onChange({ gridRows });
  };

  const addColumn = () => {
    const gridColumns = [...(question.gridColumns || []), `Column ${(question.gridColumns?.length || 0) + 1}`];
    onChange({ gridColumns });
  };

  const updateRow = (index: number, value: string) => {
    if (question.gridRows) {
      const gridRows = [...question.gridRows];
      gridRows[index] = value;
      onChange({ gridRows });
    }
  };

  const updateColumn = (index: number, value: string) => {
    if (question.gridColumns) {
      const gridColumns = [...question.gridColumns];
      gridColumns[index] = value;
      onChange({ gridColumns });
    }
  };

  const removeRow = (index: number) => {
    if (question.gridRows) {
      const gridRows = question.gridRows.filter((_, i) => i !== index);
      onChange({ gridRows });
    }
  };

  const removeColumn = (index: number) => {
    if (question.gridColumns) {
      const gridColumns = question.gridColumns.filter((_, i) => i !== index);
      onChange({ gridColumns });
    }
  };

  return (
    <div className="space-y-4">
      <QuestionBasicFields
        question={question}
        onChange={onChange}
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Rows</label>
          {question.gridRows?.map((row, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={row}
                onChange={(e) => updateRow(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder={`Row ${index + 1}`}
              />
              <button
                onClick={() => removeRow(index)}
                className="p-1 text-red-500 hover:text-red-600"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addRow}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Columns</label>
          {question.gridColumns?.map((column, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={column}
                onChange={(e) => updateColumn(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder={`Column ${index + 1}`}
              />
              <button
                onClick={() => removeColumn(index)}
                className="p-1 text-red-500 hover:text-red-600"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addColumn}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4" />
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
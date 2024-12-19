import React from 'react';
import { Download } from 'lucide-react';
import { Form } from '../../types/form';
import { exportToCSV } from '../../utils/export';

interface ResponsesHeaderProps {
  form: Form;
  responsesCount: number;
}

export default function ResponsesHeader({ form, responsesCount }: ResponsesHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{form.title} - Responses</h1>
        <p className="text-gray-600">
          {responsesCount} {responsesCount === 1 ? 'response' : 'responses'} received
        </p>
      </div>
      <button
        onClick={() => exportToCSV(form, [])}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <Download className="w-4 h-4 mr-2" />
        Export to CSV
      </button>
    </div>
  );
}
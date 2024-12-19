import React from 'react';
import { Form } from '../../types/form';

interface ResponsesTableProps {
  form: Form;
  responses: any[];
}

export default function ResponsesTable({ form, responses }: ResponsesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Respondent
              </th>
              {form.questions.map((question) => (
                <th
                  key={question.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {question.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {responses.map((response, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {response.respondentInfo?.name || 'Anonymous'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {response.respondentInfo?.email || 'No email'}
                  </div>
                </td>
                {form.questions.map((question) => {
                  const answer = response.answers.find(
                    (a: any) => a.questionId === question.id
                  );
                  return (
                    <td key={question.id} className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {Array.isArray(answer?.answer)
                          ? answer.answer.join(', ')
                          : answer?.answer || '-'}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
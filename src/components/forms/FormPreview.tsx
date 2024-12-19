import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormResponse, RespondentInfo } from '../../types/form';
import QuestionPreview from './QuestionPreview';
import { submitFormResponse } from '../../api/formApi';
import toast from 'react-hot-toast';

interface FormPreviewProps {
  form: Form;
}

export default function FormPreview({ form }: FormPreviewProps) {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [respondentInfo, setRespondentInfo] = useState<RespondentInfo>({
    name: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formattedResponses: FormResponse[] = form.questions.map((question) => ({
        questionId: question.id,
        answer: responses[question.id] || '',
      }));

      await submitFormResponse(form.id!, formattedResponses, respondentInfo);
      toast.success('Form submitted successfully');
      navigate('/forms');
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error('Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
        {form.description && (
          <p className="text-gray-600 mb-6">{form.description}</p>
        )}
        {form.headerImage && (
          <img
            src={form.headerImage}
            alt="Form header"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={respondentInfo.name}
              onChange={(e) =>
                setRespondentInfo({ ...respondentInfo, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={respondentInfo.email}
              onChange={(e) =>
                setRespondentInfo({ ...respondentInfo, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {form.questions.map((question) => (
            <QuestionPreview
              key={question.id}
              question={question}
              response={responses[question.id]}
              onResponseChange={(value) =>
                setResponses({ ...responses, [question.id]: value })
              }
            />
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '../types/form';
import { BarChart2, Download } from 'lucide-react';
import ResponsesTable from '../components/responses/ResponsesTable';
import EmptyState from '../components/common/EmptyState';
import ResponsesHeader from '../components/responses/ResponsesHeader';

export default function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFormAndResponses();
  }, [id]);

  const loadFormAndResponses = async () => {
    try {
      // Simulated API call
      setTimeout(() => {
        setForm(null);
        setResponses([]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load form responses:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">Form not found</h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ResponsesHeader form={form} responsesCount={responses.length} />

      {responses.length === 0 ? (
        <EmptyState
          icon={BarChart2}
          title="No responses yet"
          description="Share your form to start collecting responses"
        />
      ) : (
        <ResponsesTable form={form} responses={responses} />
      )}
    </div>
  );
}
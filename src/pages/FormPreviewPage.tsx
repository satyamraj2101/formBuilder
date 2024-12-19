import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '../types/form';
import FormPreview from '../components/forms/FormPreview';
import { getForm } from '../api/formApi';
import toast from 'react-hot-toast';

export default function FormPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadForm(id);
    }
  }, [id]);

  const loadForm = async (formId: string) => {
    try {
      const data = await getForm(formId);
      setForm(data);
    } catch (error) {
      console.error('Failed to load form:', error);
      toast.error('Failed to load form');
    } finally {
      setLoading(false);
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

  return <FormPreview form={form} />;
}
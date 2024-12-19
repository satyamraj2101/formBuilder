import React from 'react';
import { useParams } from 'react-router-dom';
import FormEditor from '../components/FormEditor';
import { useForm } from '../hooks/useForm';

export default function FormEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { form, loading, error } = useForm(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">Failed to load form</h3>
        <p className="text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  const emptyForm: Form = {
    title: '',
    description: '',
    questions: [],
    isPublished: false,
  };

  return (
    <FormEditor
      form={form || emptyForm}
      isEditing={!!id}
    />
  );
}
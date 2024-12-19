import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Form } from '../types/form';
import FormHeader from './editor/FormHeader';
import QuestionList from './editor/QuestionList';
import AddQuestionButtons from './editor/AddQuestionButtons';
import { createForm, updateForm } from '../api/formApi';
import toast from 'react-hot-toast';

interface FormEditorProps {
  form: Form;
  isEditing?: boolean;
}

export default function FormEditor({ form: initialForm, isEditing }: FormEditorProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Form>(initialForm);
  const [saving, setSaving] = useState(false);

  const handleFormUpdate = (updates: Partial<Form>) => {
    setFormData({ ...formData, ...updates });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const questions = Array.from(formData.questions);
    const [reorderedQuestion] = questions.splice(result.source.index, 1);
    questions.splice(result.destination.index, 0, reorderedQuestion);

    setFormData({ ...formData, questions });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Please add a title to your form');
      return;
    }

    setSaving(true);
    try {
      if (isEditing && formData.id) {
        await updateForm(formData.id, formData);
        toast.success('Form updated successfully');
      } else {
        await createForm(formData);
        toast.success('Form created successfully');
      }
      navigate('/forms');
    } catch (error) {
      console.error('Failed to save form:', error);
      toast.error('Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <FormHeader
          form={formData}
          onUpdate={handleFormUpdate}
        />
        
        <AddQuestionButtons
          onAddQuestion={(question) => setFormData({
            ...formData,
            questions: [...formData.questions, question]
          })}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <QuestionList
                provided={provided}
                questions={formData.questions}
                onUpdate={(questionId, updates) => {
                  setFormData({
                    ...formData,
                    questions: formData.questions.map((q) =>
                      q.id === questionId ? { ...q, ...updates } : q
                    ),
                  });
                }}
                onRemove={(questionId) => {
                  setFormData({
                    ...formData,
                    questions: formData.questions.filter((q) => q.id !== questionId),
                  });
                }}
              />
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Form' : 'Create Form'}
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2, Edit2 } from 'lucide-react';
import { Form } from '../../types/form';

interface FormCardProps {
  form: Form;
  onDelete: (id: string) => void;
}

export default function FormCard({ form, onDelete }: FormCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{form.title}</h3>
        <div className="flex space-x-2">
          <Link
            to={`/forms/${form.id}/edit`}
            className="text-gray-500 hover:text-blue-500"
          >
            <Edit2 className="w-5 h-5" />
          </Link>
          <button
            onClick={() => form.id && onDelete(form.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {form.description || 'No description'}
      </p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded text-sm ${
            form.isPublished
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {form.isPublished ? 'Published' : 'Draft'}
        </span>
        <Link
          to={`/forms/${form.id}`}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Link>
      </div>
    </div>
  );
}
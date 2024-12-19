import React from 'react';
import { Image } from 'lucide-react';
import { Form } from '../../types/form';

interface FormHeaderProps {
  form: Form;
  onUpdate: (updates: Partial<Form>) => void;
}

export default function FormHeader({ form, onUpdate }: FormHeaderProps) {
  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ headerImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={form.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        placeholder="Form Title"
        className="w-full text-2xl font-bold mb-4 p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none"
      />
      
      <textarea
        value={form.description || ''}
        onChange={(e) => onUpdate({ description: e.target.value })}
        placeholder="Form Description (optional)"
        className="w-full p-2 mb-4 border rounded"
        rows={3}
      />

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Image className="w-5 h-5" />
          <span>Add Header Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleHeaderImageChange}
            className="hidden"
          />
        </label>
        {form.headerImage && (
          <img
            src={form.headerImage}
            alt="Header"
            className="mt-4 max-h-48 rounded"
          />
        )}
      </div>
    </div>
  );
}
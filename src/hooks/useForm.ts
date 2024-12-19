import { useState, useEffect } from 'react';
import { Form } from '../types/form';
import { getForm } from '../api/formApi';

export function useForm(id?: string) {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getForm(id);
        setForm(data);
      } catch (error) {
        console.error('Failed to load form:', error);
        setError('Failed to load form');
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [id]);

  return { form, loading, error };
}
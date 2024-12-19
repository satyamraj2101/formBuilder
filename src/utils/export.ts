import { Form } from '../types/form';

export const exportToCSV = (form: Form, responses: any[]) => {
  if (!form || !responses.length) return;

  const headers = ['Respondent Name', 'Email', ...form.questions.map(q => q.title)];
  const rows = responses.map(response => {
    const row = [
      response.respondentInfo?.name || '',
      response.respondentInfo?.email || '',
    ];
    form.questions.forEach(question => {
      const answer = response.answers.find((a: any) => a.questionId === question.id);
      row.push(Array.isArray(answer?.answer) ? answer.answer.join(', ') : answer?.answer || '');
    });
    return row;
  });

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${form.title}-responses.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
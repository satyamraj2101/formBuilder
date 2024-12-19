import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './providers/AuthProvider';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import FormListPage from './pages/FormListPage';
import FormPreviewPage from './pages/FormPreviewPage';
import FormResponsesPage from './pages/FormResponsesPage';
import FormEditor from './components/FormEditor';
import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/layout/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/forms"
              element={
                <PrivateRoute>
                  <FormListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/forms/new"
              element={
                <PrivateRoute>
                  <FormEditor
                    form={{
                      title: '',
                      description: '',
                      questions: [],
                      isPublished: false,
                    }}
                    onSave={() => {}}
                  />
                </PrivateRoute>
              }
            />
            <Route path="/forms/:id" element={<FormPreviewPage />} />
            <Route
              path="/forms/:id/responses"
              element={
                <PrivateRoute>
                  <FormResponsesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/forms/:id/edit"
              element={
                <PrivateRoute>
                  <FormEditor form={null} onSave={() => {}} />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}
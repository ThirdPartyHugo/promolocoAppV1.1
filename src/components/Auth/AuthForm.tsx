import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { FormInput } from './FormInput';
import { FormError } from './FormError';
import { SubmitButton } from './SubmitButton';
import { ErrorBoundary } from './ErrorBoundary';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { email: string; password: string; companyName?: string }) => Promise<void>;
  loading: boolean;
}

export default function AuthForm({ type, onSubmit, loading }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  useEffect(() => {
    return () => {
      clearError();
      setValidationError(null);
    };
  }, [clearError]);

  const validateForm = () => {
    if (!formData.email) {
      setValidationError('Email is required');
      return false;
    }
    if (!formData.password) {
      setValidationError('Password is required');
      return false;
    }
    if (type === 'signup' && !formData.companyName) {
      setValidationError('Company name is required');
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }
    if (!formData.email.includes('@')) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setValidationError(null);
    clearError();

    if (!validateForm()) return;
    
    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password,
      companyName: formData.companyName.trim(),
    };

    try {
      await onSubmit(trimmedData);
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(null);
    clearError();
  };

  return (
    <ErrorBoundary>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {type === 'signup' && (
          <FormInput
            id="companyName"
            name="companyName"
            type="text"
            label="Company name"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        )}

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete={type === 'signup' ? 'new-password' : 'current-password'}
          minLength={6}
        />

        <FormError error={validationError || error} />
        <SubmitButton loading={loading} type={type} />
      </form>
    </ErrorBoundary>
  );
}
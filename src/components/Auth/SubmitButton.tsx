import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  type: 'login' | 'signup';
}

export function SubmitButton({ loading, type }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full justify-center items-center space-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>
        {loading
          ? `${type === 'login' ? 'Signing in...' : 'Creating account...'}`
          : `${type === 'login' ? 'Sign in' : 'Create account'}`}
      </span>
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
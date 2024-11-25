import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthForm from './AuthForm';
import { ErrorBoundary } from './ErrorBoundary';

type LoginFormProps = {
  onLogin: () => void;
  onSwitchToSignup: () => void;
};

export default function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const signIn = (email: string, password: string) => {
    // Replace this with your actual sign-in logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) resolve(true);
        else reject(new Error('Invalid credentials'));
      }, 1000);
    });
  };

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      onLogin(); // Notify parent component that the user is authenticated
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <AuthForm type="login" onSubmit={handleSubmit} loading={loading} />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onSwitchToSignup}
                  className="flex w-full justify-center items-center space-x-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                >
                  <span>Create an account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

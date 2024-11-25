import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import AuthForm from './AuthForm';

const features = [
  'Full Agency Dashboard',
  'Team Management',
  'Financial Tracking',
  'Client Assignment System',
  'Performance Analytics',
  '24/7 Support'
];

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((state) => state.signUp);

  const handleSubmit = async ({ email, password, companyName }: { email: string; password: string; companyName?: string }) => {
    if (!companyName) return;
    setLoading(true);
    try {
      await signUp(email, password, companyName);
      toast.success('Welcome to Alfred! Check your email to verify your account.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex justify-center">
              <Brain className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Start your free trial
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              No credit card required. 14-day free trial.
            </p>

            <div className="mt-8">
              <AuthForm type="signup" onSubmit={handleSubmit} loading={loading} />

              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => window.location.href = '/login'} className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block relative flex-1 bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700"></div>
          <div className="relative h-full flex flex-col justify-center px-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              Everything you need to run your agency
            </h2>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
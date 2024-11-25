import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {isLogin ? (
        <div>
          <LoginForm />
          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(false)}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      ) : (
        <div>
          <SignupForm />
          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(true)}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
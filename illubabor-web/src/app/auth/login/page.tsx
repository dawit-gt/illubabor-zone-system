'use client';

import { useState, FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-coffee-950/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-xl font-semibold text-coffee-950">
          Admin Sign In
        </h1>

        <p className="mt-1 text-sm text-coffee-800">
          Illubabor Zone Administration System
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-950">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-950">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-coffee-950/20 px-3 py-2 pr-10 text-sm focus:border-clay-600 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-600 hover:text-coffee-950"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

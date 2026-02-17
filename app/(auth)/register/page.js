'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const roles = [
  {
    id: 'STUDENT',
    label: 'Student',
    price: '₹29/mo',
    description: 'Track your syllabus & progress',
    icon: '🎓',
  },
  {
    id: 'TEACHER',
    label: 'Teacher',
    price: '₹59/mo',
    description: 'Manage students & performance',
    icon: '👨‍🏫',
  },
  {
    id: 'INSTITUTION',
    label: 'Institution',
    price: '₹109/mo',
    description: 'Full institution management',
    icon: '🏫',
  },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: selectedRole,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create user in our DB via API
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supabaseId: data.user.id,
        email,
        name,
        phone,
        role: selectedRole,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      setError(err.message || 'Registration failed')
      setLoading(false)
      return
    }

    router.push('/onboarding')
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Create account</h2>
      <p className="text-gray-500 text-sm mb-6">Join VidyaYog today</p>

      {/* Step 1 — Role Selection */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-3">I am a...</p>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedRole(role.id)
                setStep(2)
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                ${selectedRole === role.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-100 hover:border-orange-200 hover:bg-orange-50'
                }`}
            >
              <span className="text-2xl">{role.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{role.label}</p>
                <p className="text-xs text-gray-500">{role.description}</p>
              </div>
              <span className="text-orange-600 font-bold text-sm">{role.price}</span>
            </button>
          ))}

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}

      {/* Step 2 — Details Form */}
      {step === 2 && (
        <form onSubmit={handleRegister} className="space-y-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-orange-600 hover:underline mb-2 flex items-center gap-1"
          >
            ← Change role
          </button>

          <div className="bg-orange-50 rounded-xl px-4 py-2 text-sm text-orange-700 font-medium mb-2">
            Registering as: {roles.find(r => r.id === selectedRole)?.label} ({roles.find(r => r.id === selectedRole)?.price})
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selectedRole === 'INSTITUTION' ? 'Institution Name' : 'Full Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={selectedRole === 'INSTITUTION' ? 'ABC Coaching Centre' : 'Rahul Sharma'}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              minLength={6}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      )}
    </>
  )
}
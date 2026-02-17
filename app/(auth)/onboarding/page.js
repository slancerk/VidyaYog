'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingPage() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getRole() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setRole(user.user_metadata?.role || '')
      setLoading(false)
    }
    getRole()
  }, [router])

  function goToDashboard() {
    if (role === 'STUDENT') router.push('/student/dashboard')
    else if (role === 'TEACHER') router.push('/teacher/dashboard')
    else if (role === 'INSTITUTION') router.push('/institution/dashboard')
    else router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to VidyaYog!</h2>
        <p className="text-gray-500 text-sm mb-2">
          Your account has been created successfully.
        </p>
        <p className="text-orange-600 font-medium text-sm mb-8">
          You have a 7-day free trial. No payment required yet.
        </p>

        <div className="bg-orange-50 rounded-xl p-4 mb-8 text-left space-y-2">
          <p className="text-sm font-semibold text-gray-700">Your plan:</p>
          {role === 'STUDENT' && (
            <>
              <p className="text-sm text-gray-600">✅ Syllabus tracker</p>
              <p className="text-sm text-gray-600">✅ Progress overview</p>
              <p className="text-sm text-orange-600 font-medium">₹29/month after trial</p>
            </>
          )}
          {role === 'TEACHER' && (
            <>
              <p className="text-sm text-gray-600">✅ Student management</p>
              <p className="text-sm text-gray-600">✅ Performance tracking</p>
              <p className="text-sm text-gray-600">✅ Class management</p>
              <p className="text-sm text-orange-600 font-medium">₹59/month after trial</p>
            </>
          )}
          {role === 'INSTITUTION' && (
            <>
              <p className="text-sm text-gray-600">✅ Teacher management</p>
              <p className="text-sm text-gray-600">✅ Student management</p>
              <p className="text-sm text-gray-600">✅ Full reports</p>
              <p className="text-sm text-orange-600 font-medium">₹109/month after trial</p>
            </>
          )}
        </div>

        <button
          onClick={goToDashboard}
          className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  )
}
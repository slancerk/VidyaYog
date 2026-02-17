import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in → go to login
  if (!user) redirect('/login')

  // Try to find user in our DB
  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { role: true },
  })

  // User exists in Supabase but not our DB
  // Sign them out and send to register fresh
  if (!dbUser) {
    await supabase.auth.signOut()
    redirect('/register')
  }

  // Redirect based on role
  if (dbUser.role === 'STUDENT') redirect('/student/dashboard')
  if (dbUser.role === 'TEACHER') redirect('/teacher/dashboard')
  if (dbUser.role === 'INSTITUTION') redirect('/institution/dashboard')

  // Fallback
  redirect('/login')
}
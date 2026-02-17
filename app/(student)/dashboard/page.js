import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import StudentDashboardClient from './StudentDashboardClient'

export default async function StudentDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: {
      student: {
        include: {
          syllabus: true,
        },
      },
      subscription: true,
    },
  })

  if (!dbUser) redirect('/login')
  if (dbUser.role !== 'STUDENT') redirect('/dashboard')

  return <StudentDashboardClient user={dbUser} />
}
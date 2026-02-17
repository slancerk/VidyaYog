import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import SyllabusClient from './SyllabusClient'

export default async function SyllabusPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: {
      student: {
        include: { syllabus: { orderBy: { createdAt: 'desc' } } },
      },
    },
  })

  if (!dbUser?.student) redirect('/login')

  return (
    <SyllabusClient
      studentId={dbUser.student.id}
      initialItems={dbUser.student.syllabus}
    />
  )
}
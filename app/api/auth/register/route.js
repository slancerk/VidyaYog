import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { studentId, title, subject, description } = await request.json()

    if (!studentId || !title) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const item = await prisma.syllabusItem.create({
      data: {
        studentId,
        title,
        subject: subject || null,
        description: description || null,
        status: 'NOT_STARTED',
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Syllabus POST error:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
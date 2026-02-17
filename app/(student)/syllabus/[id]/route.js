import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const { status } = await request.json()

    const item = await prisma.syllabusItem.update({
      where: { id },
      data: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Syllabus PATCH error:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    await prisma.syllabusItem.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Syllabus DELETE error:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
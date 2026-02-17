'use client'

import { useState } from 'react'

const statusOptions = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']

const statusConfig = {
  NOT_STARTED: { label: 'Pending', color: 'bg-gray-100 text-gray-500', icon: '⬜' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-orange-50 text-orange-600', icon: '🔄' },
  COMPLETED: { label: 'Completed', color: 'bg-green-50 text-green-600', icon: '✅' },
}

export default function SyllabusClient({ studentId, initialItems }) {
  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('ALL')

  const filtered = filter === 'ALL' ? items : items.filter(i => i.status === filter)

  async function handleAdd(e) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/student/syllabus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, title, subject, description }),
    })

    if (res.ok) {
      const newItem = await res.json()
      setItems([newItem, ...items])
      setTitle('')
      setSubject('')
      setDescription('')
      setShowForm(false)
    }
    setLoading(false)
  }

  async function handleStatusChange(id, status) {
    const res = await fetch(`/api/student/syllabus/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    if (res.ok) {
      setItems(items.map(i => i.id === id ? { ...i, status } : i))
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this topic?')) return

    const res = await fetch(`/api/student/syllabus/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setItems(items.filter(i => i.id !== id))
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Syllabus</h2>
          <p className="text-gray-500 text-sm mt-1">{items.length} topics total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors"
        >
          + Add Topic
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-orange-100 p-5 mb-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">New Topic</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Topic title (e.g. Newton's Laws of Motion)"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject (e.g. Physics)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Notes (optional)"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-700 disabled:opacity-60 transition-colors"
              >
                {loading ? 'Adding...' : 'Add Topic'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 px-5 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {['ALL', ...statusOptions].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === s
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-orange-300'
            }`}
          >
            {s === 'ALL' ? 'All' : statusConfig[s].label}
            <span className="ml-1.5 opacity-70">
              {s === 'ALL' ? items.length : items.filter(i => i.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Items List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-400 text-sm">
            {filter === 'ALL' ? 'No topics yet. Add your first topic!' : `No ${statusConfig[filter]?.label} topics.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
              <span className="text-xl mt-0.5">{statusConfig[item.status].icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                {item.subject && (
                  <p className="text-xs text-gray-400 mt-0.5">{item.subject}</p>
                )}
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={item.status}
                  onChange={e => handleStatusChange(item.id, e.target.value)}
                  className={`text-xs font-medium px-2 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300 ${statusConfig[item.status].color}`}
                >
                  {statusOptions.map(s => (
                    <option key={s} value={s}>{statusConfig[s].label}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
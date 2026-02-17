'use client'

export default function StudentDashboardClient({ user }) {
  const syllabus = user.student?.syllabus || []
  const total = syllabus.length
  const completed = syllabus.filter(s => s.status === 'COMPLETED').length
  const inProgress = syllabus.filter(s => s.status === 'IN_PROGRESS').length
  const notStarted = syllabus.filter(s => s.status === 'NOT_STARTED').length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  const sub = user.subscription
  const isActive = sub?.status === 'ACTIVE' || sub?.status === 'TRIAL'
  const isTrial = sub?.status === 'TRIAL'
  const trialEnd = sub?.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.name.split(' ')[0]} 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">Here's your learning overview</p>
      </div>

      {/* Subscription Banner */}
      {isTrial && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-700">
              🎁 Free Trial Active
            </p>
            <p className="text-xs text-orange-500 mt-0.5">
              Trial ends on {trialEnd}. Subscribe at ₹29/month to continue.
            </p>
          </div>
          <button className="bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Subscribe
          </button>
        </div>
      )}

      {!isActive && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
          <p className="text-sm font-medium text-red-700">
            ⚠️ Your subscription has expired. Please renew to continue using VidyaYog.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Total Topics</p>
          <p className="text-3xl font-bold text-gray-800">{total}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">{completed}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">In Progress</p>
          <p className="text-3xl font-bold text-orange-500">{inProgress}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Not Started</p>
          <p className="text-3xl font-bold text-gray-400">{notStarted}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-700">Overall Progress</p>
          <p className="text-sm font-bold text-orange-600">{percent}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        {total === 0 && (
          <p className="text-xs text-gray-400 mt-3 text-center">
            No syllabus items yet.{' '}
            <a href="/student/syllabus" className="text-orange-600 hover:underline font-medium">
              Add your first topic →
            </a>
          </p>
        )}
      </div>

      {/* Recent Syllabus Items */}
      {syllabus.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">Recent Topics</p>
            <a href="/student/syllabus" className="text-xs text-orange-600 hover:underline">
              View all →
            </a>
          </div>
          <div className="space-y-2">
            {syllabus.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className={`text-base ${
                  item.status === 'COMPLETED' ? '✅' :
                  item.status === 'IN_PROGRESS' ? '🔄' : '⬜'
                }`}>
                  {item.status === 'COMPLETED' ? '✅' :
                   item.status === 'IN_PROGRESS' ? '🔄' : '⬜'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.title}</p>
                  {item.subject && (
                    <p className="text-xs text-gray-400">{item.subject}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.status === 'COMPLETED' ? 'bg-green-50 text-green-600' :
                  item.status === 'IN_PROGRESS' ? 'bg-orange-50 text-orange-600' :
                  'bg-gray-50 text-gray-400'
                }`}>
                  {item.status === 'COMPLETED' ? 'Done' :
                   item.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
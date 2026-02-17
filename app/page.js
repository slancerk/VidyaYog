import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-orange-600 mb-2">VidyaYog</h1>
        <p className="text-gray-500 text-lg">Empowering Indian Education</p>
      </div>

      {/* Tagline */}
      <div className="text-center mb-12 max-w-md">
        <p className="text-gray-600 text-base leading-relaxed">
          Manage syllabus, track performance, and connect students, teachers, and institutions — all in one place.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 w-full max-w-2xl">
        <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-orange-100">
          <p className="text-sm text-gray-500 mb-1">Student</p>
          <p className="text-3xl font-bold text-orange-600">₹29<span className="text-sm font-normal text-gray-400">/mo</span></p>
          <p className="text-xs text-gray-400 mt-2">Syllabus tracker</p>
        </div>
        <div className="bg-orange-600 rounded-2xl p-5 text-center shadow-md">
          <p className="text-sm text-orange-200 mb-1">Teacher</p>
          <p className="text-3xl font-bold text-white">₹59<span className="text-sm font-normal text-orange-200">/mo</span></p>
          <p className="text-xs text-orange-200 mt-2">Performance tracking</p>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-orange-100">
          <p className="text-sm text-gray-500 mb-1">Institution</p>
          <p className="text-3xl font-bold text-orange-600">₹109<span className="text-sm font-normal text-gray-400">/mo</span></p>
          <p className="text-xs text-gray-400 mt-2">Full management</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <Link
          href="/register"
          className="flex-1 bg-orange-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="flex-1 bg-white text-orange-600 text-center py-3 rounded-xl font-semibold border border-orange-200 hover:bg-orange-50 transition-colors"
        >
          Login
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8">Made with ❤️ for Bharat</p>
    </main>
  )
}

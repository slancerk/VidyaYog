export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">VidyaYog</h1>
          <p className="text-gray-500 text-sm mt-1">Empowering Indian Education</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
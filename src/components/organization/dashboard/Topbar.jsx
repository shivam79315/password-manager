export default function Topbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-semibold">Organization Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Welcome, Admin</span>
        {/* Profile / Avatar later */}
      </div>
    </header>
  )
}
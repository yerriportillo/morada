'use client'

/**
 * Custom Payload Admin Dashboard
 * Displays a welcome message and quick stats for operators
 *
 * Future enhancements (Phase 11+):
 * - Upcoming bookings calendar
 * - Revenue metrics
 * - Recent bookings list
 * - Diaspora conversion rate (regresoVisitor tracking)
 * - Quick actions (create booking, view calendar)
 */

export default function CustomDashboard() {
  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenido a Morada
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to Morada - White-label tourism platform for El Salvador
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Operators Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operadores</p>
              <p className="text-sm text-gray-500">Operators</p>
            </div>
            <div className="text-3xl font-bold text-gray-900">—</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Active tourism operators
          </p>
        </div>

        {/* Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reservas</p>
              <p className="text-sm text-gray-500">Bookings</p>
            </div>
            <div className="text-3xl font-bold text-gray-900">—</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Total bookings this month
          </p>
        </div>

        {/* Regreso Visitors Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">🇸🇻 Regreso</p>
              <p className="text-sm text-gray-500">Diaspora Visitors</p>
            </div>
            <div className="text-3xl font-bold text-gray-900">—</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Salvadorans returning home
          </p>
        </div>

        {/* Programs Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Programas</p>
              <p className="text-sm text-gray-500">Programs</p>
            </div>
            <div className="text-3xl font-bold text-gray-900">—</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Active bookable items
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas / Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/collections/operators"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              🏢
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Operators</p>
              <p className="text-sm text-gray-600">View all operators</p>
            </div>
          </a>

          <a
            href="/admin/collections/bookings"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              📅
            </div>
            <div>
              <p className="font-medium text-gray-900">View Bookings</p>
              <p className="text-sm text-gray-600">See all reservations</p>
            </div>
          </a>

          <a
            href="/admin/collections/bookable-items"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              🏄
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Programs</p>
              <p className="text-sm text-gray-600">Edit offerings</p>
            </div>
          </a>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Estado del Sistema / System Status
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Collections</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✓ 9 Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Bilingual Support</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✓ ES/EN Enabled
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Regreso Module</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🇸🇻 Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">API Integrations</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              ⏱ Pending (Phase 11+)
            </span>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Phase 8 Complete:</strong> Admin dashboard UI is ready. Next steps include
          community features (Phase 9), UI polish (Phase 10), and API integrations starting
          in Phase 11 (Cal.com, Stripe, WhatsApp, etc.).
        </p>
      </div>
    </div>
  )
}

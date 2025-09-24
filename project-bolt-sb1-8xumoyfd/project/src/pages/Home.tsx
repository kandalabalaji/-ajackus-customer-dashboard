import React from 'react';
import { Users, ArrowRight, Database, Search, Edit3, Trash2 } from 'lucide-react';

interface HomeProps {
  onNavigateToDashboard: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateToDashboard }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                User Management
                <span className="block text-blue-600">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                A comprehensive solution for managing user data with advanced filtering, 
                search capabilities, and full CRUD operations powered by JSONPlaceholder API.
              </p>
              <button
                onClick={onNavigateToDashboard}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage users efficiently with modern web technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* CRUD Operations */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Full CRUD Operations
              </h3>
              <p className="text-gray-600 text-sm">
                Create, read, update, and delete users with comprehensive form validation and error handling.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Advanced Search & Filter
              </h3>
              <p className="text-gray-600 text-sm">
                Real-time search across all fields with advanced filtering options for precise data discovery.
              </p>
            </div>

            {/* Responsive Design */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Edit3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600 text-sm">
                Optimized for all devices with mobile-first design and adaptive layouts.
              </p>
            </div>

            {/* Data Management */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-red-100 rounded-lg w-fit mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Data Management
              </h3>
              <p className="text-gray-600 text-sm">
                Pagination, sorting, and bulk operations with confirmation dialogs for safe data management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leveraging the best tools and practices for a production-ready application
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">React 18</div>
              <p className="text-sm text-gray-600">Modern UI Library</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">TypeScript</div>
              <p className="text-sm text-gray-600">Type Safety</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">Tailwind CSS</div>
              <p className="text-sm text-gray-600">Utility-First CSS</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">JSONPlaceholder</div>
              <p className="text-sm text-gray-600">Mock API</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Manage Your Users?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start exploring the dashboard and experience powerful user management capabilities.
            </p>
            <button
              onClick={onNavigateToDashboard}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Launch Dashboard
              <ArrowRight className="ml-3 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 User Management Dashboard. Developed for technical assessment.
          </p>
        </div>
      </footer>
    </div>
  );
};
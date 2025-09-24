import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 User Management Dashboard. Built with React, TypeScript, and JSONPlaceholder API.</p>
          <p className="mt-2">
            Developed as part of a technical assessment demonstrating modern web development practices.
          </p>
        </div>
      </div>
    </footer>
  );
};
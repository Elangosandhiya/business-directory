import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BusinessListPage from './pages/BusinessListPage';
import BusinessDetailPage from './pages/BusinessDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<BusinessListPage />} />
            <Route path="/business/:id" element={<BusinessDetailPage />} />
            {/* Catch-all route redirects to home */}
            <Route path="*" element={<BusinessListPage />} />
          </Routes>
        </div>

        <footer className="border-t border-slate-200 bg-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} Kovai Business Directory. Fictional listings crafted for technical assignment.
            </p>
            <p className="flex items-center gap-1">
              Serving Peelamedu, RS Puram, Gandhipuram, Saravanampatti & beyond.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

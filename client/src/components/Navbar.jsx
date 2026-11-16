import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:bg-brand-700 transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
              Kovai<span className="text-brand-600">Directory</span>
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <MapPin className="w-3 h-3 text-brand-500" />
              <span>Coimbatore, Tamil Nadu</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
            Local Business Guide
          </span>
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}

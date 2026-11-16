import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Clock } from 'lucide-react';

export default function BusinessDetailPage() {
  const { id } = useParams();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 mx-auto flex items-center justify-center mb-5">
          <Building2 className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
          <Clock className="w-3.5 h-3.5" />
          Preview Stub View
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Business Profile #{id}
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
          The full dedicated business detail page with photo gallery, reviews, opening hours, and direct map directions is scheduled for a future phase.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-95 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>
    </main>
  );
}

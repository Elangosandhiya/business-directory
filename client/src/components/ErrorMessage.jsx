import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-center max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-red-900 mb-1">
        Unable to Load Directory
      </h3>
      <p className="text-sm text-red-700 mb-4">
        {message || 'Something went wrong while connecting to the directory server.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-red-800 bg-red-100 hover:bg-red-200 active:scale-95 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}

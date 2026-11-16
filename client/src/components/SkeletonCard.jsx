import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Badge & Category Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-slate-200 rounded-full" />
            <div className="h-5 w-16 bg-slate-100 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <div className="h-6 w-3/4 bg-slate-200 rounded-md" />

          {/* Location Skeleton */}
          <div className="h-4 w-1/2 bg-slate-100 rounded-md" />

          {/* Description Skeleton */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full bg-slate-100 rounded" />
            <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="h-9 w-20 bg-slate-200 rounded-lg" />
          <div className="h-9 w-24 bg-slate-200 rounded-lg" />
          <div className="h-9 w-20 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

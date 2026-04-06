import React from 'react';

const Skeleton = ({ className = '', height = 'h-4', width = 'w-full', rounded = 'rounded-lg' }) => (
  <div
    className={`animate-pulse bg-slate-700/60 ${height} ${width} ${rounded} ${className}`}
  />
);

export const SkeletonCard = () => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 space-y-3">
    <Skeleton height="h-3" width="w-1/3" />
    <Skeleton height="h-8" width="w-2/3" />
    <Skeleton height="h-3" width="w-1/2" />
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center gap-4 py-3 px-4">
    <Skeleton height="h-8" width="w-8" rounded="rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton height="h-3" width="w-1/3" />
      <Skeleton height="h-2" width="w-1/5" />
    </div>
    <Skeleton height="h-4" width="w-20" />
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 space-y-3">
    <Skeleton height="h-3" width="w-1/4" />
    <Skeleton height="h-48" />
  </div>
);

export default Skeleton;

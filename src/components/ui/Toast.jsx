import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import useAppStore from '../../context/AppContext';

const iconMap = {
  success: <CheckCircle size={16} className="text-emerald-400" />,
  danger: <AlertCircle size={16} className="text-rose-400" />,
  warning: <AlertTriangle size={16} className="text-amber-400" />,
  info: <Info size={16} className="text-blue-400" />,
};

const bgMap = {
  success: 'border-emerald-500/30 bg-emerald-500/10',
  danger: 'border-rose-500/30 bg-rose-500/10',
  warning: 'border-amber-500/30 bg-amber-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
};

const ToastItem = ({ toast }) => {
  const removeToast = useAppStore((s) => s.removeToast);
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg animate-slide-up ${bgMap[toast.type] || bgMap.info} text-white min-w-[280px] max-w-sm`}
      role="alert"
    >
      {iconMap[toast.type] || iconMap.info}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="p-0.5 rounded text-slate-400 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useAppStore((s) => s.toasts);
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { useState, useEffect, createContext, useContext } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-10 right-10 z-[200] space-y-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`pointer-events-auto flex items-center gap-4 p-5 rounded-[1.5rem] glass-panel border shadow-2xl min-w-[320px] ${
                toast.type === "success" 
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                : toast.type === "error"
                ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                : "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
              }`}
            >
              <div className={`p-2 rounded-xl bg-white/5`}>
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
                {toast.type === "info" && <Info className="w-5 h-5" />}
              </div>
              <p className="flex-1 text-[13px] font-black uppercase tracking-tight leading-tight">{toast.message}</p>
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="p-1 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-4 h-4 opacity-50" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

"use client";

import { toast } from "sonner";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

const iconColors: Record<ToastType, string> = {
  success: "#22c55e",
  error: "#ef4444",
  info: "#3b82f6",
  warning: "#eab308",
};

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
  error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
  info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
};

export function showToast(type: ToastType, options: ToastOptions) {
  const { title, description, duration = 4000 } = options;
  const color = iconColors[type];
  const style = toastStyles[type];

  let icon: string;
  if (type === "success") {
    icon = `✓`;
  } else if (type === "error") {
    icon = `✕`;
  } else if (type === "info") {
    icon = `ℹ`;
  } else {
    icon = `⚠`;
  }

  toast(`${icon} ${title}${description ? ` - ${description}` : ""}`, {
    duration,
    className: style,
  });
}

export const notify = {
  success: (title: string, description?: string) =>
    showToast("success", { title, description }),

  error: (title: string, description?: string) =>
    showToast("error", { title, description }),

  info: (title: string, description?: string) =>
    showToast("info", { title, description }),

  warning: (title: string, description?: string) =>
    showToast("warning", { title, description }),
};

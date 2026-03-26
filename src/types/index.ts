// Application Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  avatar?: string;
  createdAt?: string;
  status?: "active" | "inactive";
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Navigation Types
export type FontSize = "small" | "medium" | "large";
export type PrimaryColor = "violet" | "blue" | "green" | "red" | "orange" | "yellow" | "pink" | "slate";
export type SidebarPosition = "left" | "right";
export type Theme = "light" | "dark";
export type DateRange = "today" | "week" | "month" | "quarter" | "year" | "custom";

// Chart Types
export type ChartPeriod = "weekly" | "monthly" | "yearly";
export type ChartType = "area" | "bar" | "line" | "pie";

// Dashboard Types
export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface Sale {
  id: string;
  name: string;
  email: string;
  amount: string;
  initials: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: string;
}

// Report Types
export interface ReportConfig {
  title: string;
  filename: string;
  data: Record<string, unknown>[];
  sheetName?: string;
}

// Navigation Item
export interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

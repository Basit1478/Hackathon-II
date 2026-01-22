"use client";

import { DashboardLayout } from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back!">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-700 dark:bg-secondary-800">
          <h3 className="text-sm font-medium text-secondary-500">Total Tasks</h3>
          <p className="mt-2 text-3xl font-bold text-secondary-900 dark:text-white">12</p>
        </div>
        <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-700 dark:bg-secondary-800">
          <h3 className="text-sm font-medium text-secondary-500">Completed</h3>
          <p className="mt-2 text-3xl font-bold text-emerald-600">8</p>
        </div>
        <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-700 dark:bg-secondary-800">
          <h3 className="text-sm font-medium text-secondary-500">Pending</h3>
          <p className="mt-2 text-3xl font-bold text-amber-600">4</p>
        </div>
        <div className="rounded-2xl border border-secondary-200 bg-white p-6 dark:border-secondary-700 dark:bg-secondary-800">
          <h3 className="text-sm font-medium text-secondary-500">Completion Rate</h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">67%</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

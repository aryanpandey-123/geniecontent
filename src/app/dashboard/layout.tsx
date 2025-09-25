// Shared UI for dashboard pages (sidebar, nav)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <main>{children}</main>
    </div>
  );
}
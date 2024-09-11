import Main from '@/components/Main';
import Dashboard from '@/components/Dashboard';

export const metadata = {
  title: "Dashboard",
  description: "Track your habits and improve your life.",
};

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
import { Outlet } from "react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

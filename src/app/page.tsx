import HotwheelsTable from "./components/hotwheels-table";
import { ThemeSwitcher } from "./components/theme-switcher";

export default function Home() {
  return (
    <main>
      <div className="flex justify-between items-center p-4 border-b w-full">
        <p className="text-lg font-semibold">Hot wheels tracker App</p>
        <ThemeSwitcher />
      </div>
      <div className="p-4">
        <HotwheelsTable />
      </div>
    </main>
  );
}

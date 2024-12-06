import HotwheelsTable from "./components/hotwheels-table";

export default function Home() {
  return (
    <main>
      <div className="p-4 border-b-[1px] border-b-slate-200 w-full">
        <p className="text-lg">Hot wheels tracker App</p>
      </div>
      <div className="p-4">
        <HotwheelsTable />
      </div>
    </main>
  );
}

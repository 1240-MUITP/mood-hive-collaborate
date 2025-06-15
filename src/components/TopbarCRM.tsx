
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopbarCRM({
  section,
}: {
  section: string;
}) {
  return (
    <header className="sticky top-0 w-full z-40 h-[62px] bg-[#101117] border-b border-[#23242A] flex items-center justify-between px-1 sm:px-8">
      <div className="w-28" />
      <h1 className="text-xl sm:text-2xl font-bold text-white text-center flex-1 tracking-tight">{section}</h1>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-[#22232A] group focus:outline-none">
          <Bell className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          <span className="sr-only">Notifications</span>
        </button>
        <div className="flex items-center gap-[-7px]">
          <div className="flex -space-x-2">
            <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg border-2 border-[#25262C] shadow">
              N
            </span>
            <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold text-lg border-2 border-[#25262C] shadow">
              U
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

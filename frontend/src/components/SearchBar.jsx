import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex justify-center pb-10">
      <div className="flex w-full max-w-md items-center gap-2.5 rounded-full bg-white px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <Search size={18} className="text-gallery-inkSoft" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search artworks by title..."
          className="w-full rounded-full border-none bg-transparent text-sm outline-none focus:ring-2 focus:ring-gallery-accent/45"
        />
      </div>
    </div>
  );
}
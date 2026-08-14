import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center pb-10">
      <div className="flex w-full max-w-md items-center gap-2.5 rounded-full bg-white px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <Search size={18} className="text-gallery-inkSoft" />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full rounded-full border-none bg-transparent text-sm outline-none focus:ring-2 focus:ring-gallery-accent/45"
        />
      </div>
    </div>
  );
}
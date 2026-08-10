import { Link } from "react-router-dom";

// artwork: { id, title, image } — `image` should be the ArtistWork's
// picture field URL from your DRF serializer.
export default function ArtworkCard({ artwork }) {
  return (
    <Link
      to={`/works/${artwork.id}`}
      className="group block rounded-2xl bg-white p-2.5 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-xl">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-[1.06]"
        />
      </div>
      <div className="font-heading px-1 pb-1 pt-3 text-[15px] font-bold text-gallery-ink transition-colors duration-250 group-hover:text-gallery-accentDark">
        {artwork.title}
      </div>
    </Link>
  );
}
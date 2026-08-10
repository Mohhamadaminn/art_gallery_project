import ArtworkCard from "./ArtworkCard";

export default function ArtworkGrid({ artworks = [], query = "" }) {
  if (!artworks.length) {
    return (
      <p className="py-16 text-center text-gallery-inkSoft">
        No artworks match &ldquo;{query}.&rdquo;
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6 px-6 pb-6 pt-10">
      {artworks.map((a) => (
        <ArtworkCard key={a.id} artwork={a} />
      ))}
    </div>
  );
}

export default function Footer({ artist }) {

  if (!artist) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EAE8E3] pt-14 pb-8">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <h3
            className="text-2xl mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {artist.name}
          </h3>

          <p className="text-[#6B6B6B] leading-7 max-w-md">
            {artist.bio?.length > 160
              ? artist.bio.substring(0, 160) + "..."
              : artist.bio}
          </p>
        </div>

        <div className="md:text-right space-y-2 text-sm text-[#6B6B6B]">
          {artist.location && (
            <p>{artist.location}</p>
          )}

          {artist.email && (
            <p>
              <a
                href={`mailto:${artist.email}`}
                className="hover:text-[#C97B63] transition-colors"
              >
                {artist.email}
              </a>
            </p>
          )}

          {artist.phone && (
            <p>
              <a
                href={`tel:${artist.phone}`}
                className="hover:text-[#C97B63] transition-colors"
              >
                {artist.phone}
              </a>
            </p>
          )}

          {artist.instagram && (
            <p>
              <a
                href={`https://instagram.com/${artist.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C97B63] transition-colors"
              >
                @{artist.instagram.replace("@", "")}
              </a>
            </p>
          )}
        </div>

      </div>

      <div className="mt-14 pt-6 border-t border-[#EAE8E3] flex flex-col md:flex-row justify-between items-center text-xs tracking-[0.12em] uppercase text-[#9A9A9A]">

        <p>
          © {currentYear} {artist.name}
        </p>

        <p className="mt-4 md:mt-0">
          Built with Django REST Framework & React
        </p>

      </div>
    </footer>
  );
}
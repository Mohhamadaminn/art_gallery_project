import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiClient from "../../api/client";

export default function Footer() {
  const { t } = useTranslation();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    apiClient
      .get("/artists/profile/")
      .then((res) => setArtist(res.data))
      .catch(console.error);
  }, []);

  return (
    <footer className="mt-32 border-t border-gallery-line">
      <div className="mx-auto max-w-6xl px-10 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="font-heading mb-5 text-2xl font-extrabold tracking-tight text-gallery-ink">
              Sahar Alizadeh
            </h2>
            <p className="max-w-sm text-sm leading-7 text-gallery-inkSoft">
              {t("footer.description")}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-gallery-inkSoft">
              {t("footer.explore")}
            </h3>
            <div className="flex flex-col gap-4 text-sm text-gallery-ink">
              <Link
                to="/"
                className="transition-colors duration-250 hover:text-gallery-accentDark"
              >
                {t("nav.home")}
              </Link>

              <Link
                to="/events"
                className="transition-colors duration-250 hover:text-gallery-accentDark"
              >
                {t("nav.events")}
              </Link>

              <Link
                to="/bio"
                className="transition-colors duration-250 hover:text-gallery-accentDark"
              >
                {t("footer.biography")}
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-gallery-inkSoft">
              {t("footer.connect")}
            </h3>

            <div className="flex flex-col gap-4 text-sm text-gallery-ink">
              {artist?.instagram && (
                <a
                  href={`https://instagram.com/${artist.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-250 hover:text-gallery-accentDark"
                >
                  Instagram
                </a>
              )}

              {artist?.email && (
                <a
                  href={`mailto:${artist.email}`}
                  className="transition-colors duration-250 hover:text-gallery-accentDark"
                >
                  {artist.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-gallery-line pt-6 text-xs text-gallery-inkSoft">
          <p>
            © {new Date().getFullYear()} Sahar Alizadeh.{" "}
            {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
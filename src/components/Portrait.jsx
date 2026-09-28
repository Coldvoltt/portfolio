import { site } from "../data/site.js";

/* Headshot, circular with a white ring. Square source so the circle crops
   cleanly; WebP with a JPEG fallback at 1x and 2x. High priority because it
   sits in the hero, above the fold. */
export default function Portrait() {
  return (
    <figure className="portrait">
      <div className="portrait__frame">
        <picture>
          <source
            type="image/webp"
            srcSet="/paul-otulaja.webp 560w, /paul-otulaja@2x.webp 1120w"
            sizes="(min-width: 1040px) 352px, (min-width: 600px) 28vw, 88vw"
          />
          <img
            src="/paul-otulaja.jpg"
            srcSet="/paul-otulaja.jpg 560w, /paul-otulaja@2x.jpg 1120w"
            sizes="(min-width: 1040px) 352px, (min-width: 600px) 28vw, 88vw"
            width="560"
            height="560"
            alt={`${site.name}, ${site.role}`}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
    </figure>
  );
}

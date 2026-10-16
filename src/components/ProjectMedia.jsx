export default function ProjectMedia({ item }) {
  return (
    <figure className={item.tall ? "media media-tall" : "media"}>
      {item.type === "video" ? (
        <video
          controls
          preload="metadata"
          playsInline
          poster={item.poster}
          aria-label={item.alt}
        >
          <source src={item.src} type="video/mp4" />
          Your browser cannot play this video.
        </video>
      ) : (
        <a href={item.src} aria-label={`Open full-size image: ${item.caption}`}>
          <img src={item.src} alt={item.alt} loading="lazy" />
        </a>
      )}
      <figcaption>{item.caption}</figcaption>
    </figure>
  );
}

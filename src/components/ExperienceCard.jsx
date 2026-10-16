export default function ExperienceCard({ experience }) {
  return (
    <article className="entry">
      <div className="entry-head">
        <h3>
          {experience.role}, <span className="org">{experience.org}</span>
        </h3>
        <p className="dates">{experience.dates}</p>
      </div>
      <ul>
        {experience.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

import Link from "next/link";
import type { Technique } from "@/lib/techniques";

const effortLabel: Record<Technique["effort"], string> = {
  micro: "< 5 min",
  light: "< 30 min",
  medium: "< 90 min"
};

export function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <article className="card" aria-labelledby={`${technique.id}-title`}>
      <header>
        <div className="tag-row">
          <span className="badge">{technique.category}</span>
          <span className="tag">Effort: {effortLabel[technique.effort]}</span>
          <span className="tag">Cadence: {technique.cadence}</span>
        </div>
        <h3 id={`${technique.id}-title`}>{technique.title}</h3>
      </header>
      <p>{technique.description}</p>
      <div className="technique-score" role="group" aria-label="Leverage rating">
        <div className="score-meter" aria-hidden="true">
          <div className="score-fill" style={{ width: `${technique.leverage}%` }} />
        </div>
        <span className="score-label">{technique.leverage}/100 leverage</span>
      </div>
      <footer>
        <span>{technique.tags.slice(0, 3).join(" · ")}</span>
        {technique.resource ? (
          <Link className="resource-link" href={technique.resource.url} target="_blank">
            {technique.resource.label}
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
      </footer>
    </article>
  );
}

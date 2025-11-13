"use client";

import { useMemo, useState } from "react";
import { TechniqueCard } from "@/components/TechniqueCard";
import { FilterBar } from "@/components/FilterBar";
import { categories, techniques } from "@/lib/techniques";

type FilterValue = string;

function filterTechniques(filter: FilterValue) {
  if (!filter) {
    return techniques;
  }

  if (filter.startsWith("effort:")) {
    const effort = filter.split(":")[1];
    return techniques.filter((technique) => technique.effort === effort);
  }

  return techniques.filter((technique) => technique.category === filter);
}

export default function Page() {
  const [filter, setFilter] = useState<FilterValue>("");
  const [search, setSearch] = useState("");

  const filteredTechniques = useMemo(() => {
    const base = filterTechniques(filter);
    if (!search.trim()) {
      return base;
    }

    const normalized = search.trim().toLowerCase();
    return base.filter((technique) => {
      return (
        technique.title.toLowerCase().includes(normalized) ||
        technique.description.toLowerCase().includes(normalized) ||
        technique.tags.some((tag) => tag.toLowerCase().includes(normalized))
      );
    });
  }, [filter, search]);

  return (
    <main>
      <section className="hero">
        <div>
          <h1>Simple Techniques, Fresh Momentum</h1>
          <p>
            A curated set of lightweight experiments that unlock leverage without heavy process. Explore
            compact rituals for collaboration, focus, learning, and automation that you can pilot this week.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="button-primary"
              onClick={() => setFilter("")}
            >
              Show everything new
            </button>
            <button
              type="button"
              className="button-secondary"
              onClick={() => setFilter("Automation")}
            >
              High leverage automation
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Explore the playbook</h2>
        <p className="section-subtitle">
          Filter by focus area, search by theme, and grab a ready-made experiment to trial with your team.
        </p>
        <FilterBar categories={categories} activeFilter={filter} onFilterChange={setFilter} />
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
          <label style={{ flex: "1 1 260px" }}>
            <span style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "6px" }}>
              Quick search
            </span>
            <input
              type="search"
              placeholder="Find a technique by keyword or outcome..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "rgba(15, 23, 42, 0.75)",
                color: "#e2e8f0",
                fontSize: "1rem"
              }}
            />
          </label>
          <div
            style={{
              minWidth: "200px",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              background: "rgba(15, 23, 42, 0.6)",
              color: "#cbd5f5",
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Currently viewing</span>
            <strong style={{ fontSize: "1.1rem", color: "#f8fafc" }}>{filteredTechniques.length} techniques</strong>
          </div>
        </div>

        {filteredTechniques.length ? (
          <div className="grid techniques">
            {filteredTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            No techniques match that combo yet. Clear filters or switch effort levels to discover something new.
          </div>
        )}
      </section>
    </main>
  );
}

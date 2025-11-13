interface FilterBarProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const effortPresets = [
  { label: "All effort", value: "" },
  { label: "Micro", value: "effort:micro" },
  { label: "Light", value: "effort:light" },
  { label: "Medium", value: "effort:medium" }
];

export function FilterBar({ categories, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="toolbar" aria-label="Technique filters">
      <button
        type="button"
        className="filter-chip"
        data-active={activeFilter === ""}
        onClick={() => onFilterChange("")}
      >
        All techniques
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="filter-chip"
          data-active={activeFilter === category}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </button>
      ))}
      {effortPresets.map((preset) => (
        <button
          key={preset.value}
          type="button"
          className="filter-chip"
          data-active={activeFilter === preset.value}
          onClick={() => onFilterChange(preset.value)}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}

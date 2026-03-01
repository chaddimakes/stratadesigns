"use client";

const filaments = [
  { name: "PLA", color: "#6b9bd2", maxTemp: "~40\u00b0C / 104\u00b0F", strength: 2, uv: 1, bestFor: "Prototyping and fit checks only. Will warp and fail in a hot vehicle interior or direct sun.", ppUse: "Not used.", ppNote: "Too fragile for any truck application.", stock: false, badge: null },
  { name: "PETG", color: "#5fa8a0", maxTemp: "~70\u00b0C / 158\u00b0F", strength: 3, uv: 2, bestFor: "Interior parts in moderate climates. Not recommended for anything exterior or near heat sources.", ppUse: "Not used.", ppNote: "Interior temps in a Tacoma can exceed PETG limits on a hot day.", stock: false, badge: null },
  { name: "TPU", color: "#8b7ec8", maxTemp: "~50\u00b0C / 122\u00b0F", strength: 2, uv: 1, bestFor: "Flexible gaskets, bump stops, vibration dampeners. Poor UV and heat tolerance.", ppUse: "Case by case.", ppNote: "Useful for gasket-style parts where flex matters.", stock: false, badge: null },
  { name: "ABS", color: "#c4a55a", maxTemp: "~98\u00b0C / 208\u00b0F", strength: 3, uv: 2, bestFor: "Interior panels, underhood covers away from direct heat. UV degrades it over time.", ppUse: "Not used.", ppNote: "ASA gives better UV resistance with similar temp range and fewer print headaches.", stock: false, badge: null },
  { name: "ASA", color: "#f47f20", maxTemp: "~95\u00b0C / 203\u00b0F", strength: 4, uv: 5, bestFor: "Exterior trim, roof rack mounts, mirror caps, interior panels. Best UV resistance of any common filament.", ppUse: "Primary material.", ppNote: "Used for most exterior products \u2014 raptor light brackets, SmartCap mounts, speaker grilles.", stock: true, badge: "Primary Material" },
  { name: "ASA-CF", color: "#e05a00", maxTemp: "~100\u00b0C / 212\u00b0F", strength: 5, uv: 5, bestFor: "High-stress exterior mounts, load-bearing brackets that need rigidity under real mechanical load.", ppUse: "Premium option.", ppNote: "Used for structural brackets and high-vibration mounting applications.", stock: true, badge: "Premium Option" },
  { name: "Nylon (PA6)", color: "#7ec47e", maxTemp: "~120\u00b0C / 248\u00b0F", strength: 4, uv: 2, bestFor: "Bushings, clips, load-bearing hinges, wear surfaces. Absorbs moisture and UV degrades it.", ppUse: "Not currently used.", ppNote: "Strong candidate for future mechanical parts with wear requirements.", stock: false, badge: null },
  { name: "Polycarbonate", color: "#c47e7e", maxTemp: "~115\u00b0C / 239\u00b0F", strength: 4, uv: 2, bestFor: "High-temp mounts, headlight brackets. Requires a high-temp printer setup.", ppUse: "Not currently used.", ppNote: "Considered for underhood applications as product line expands.", stock: false, badge: null },
  { name: "PEEK / PEI", color: "#b8b8b8", maxTemp: "260\u00b0C+ / 500\u00b0F+", strength: 5, uv: 5, bestFor: "Race and aerospace applications, extreme-temp environments. Overkill for most truck builds.", ppUse: "Not used.", ppNote: "Industrial material requiring specialized equipment well beyond typical FDM printers.", stock: false, badge: null },
];

function Pips({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span className="inline-flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`inline-block h-2 w-2 rounded-full ${
            i < filled ? "bg-accent" : "bg-[#2a2a2a]"
          }`}
        />
      ))}
    </span>
  );
}

export default function FilamentGuideTable() {
  const highlighted = new Set(["ASA", "ASA-CF"]);

  return (
    <>
      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-[#2a2a2a]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a] bg-[#141414] text-left text-xs font-semibold uppercase tracking-wider text-[#737373]">
              <th className="px-4 py-3">Filament</th>
              <th className="px-4 py-3">Max Temp</th>
              <th className="px-4 py-3">Strength</th>
              <th className="px-4 py-3">UV</th>
              <th className="px-4 py-3">Best For</th>
              <th className="px-4 py-3">Proper Polymer Uses This For</th>
            </tr>
          </thead>
          <tbody>
            {filaments.map((f) => {
              const isHighlighted = highlighted.has(f.name);
              return (
                <tr
                  key={f.name}
                  className={`border-b border-[#2a2a2a] last:border-b-0 ${
                    isHighlighted ? "bg-[#f47f20]/[0.06]" : ""
                  }`}
                  style={{ borderLeft: `3px solid ${f.color}` }}
                >
                  <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: f.color }}
                      />
                      {f.name}
                      {f.stock && (
                        <span className="ml-1 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                          In Stock
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[#e5e5e5]">
                    {f.maxTemp}
                  </td>
                  <td className="px-4 py-3">
                    <Pips filled={f.strength} />
                  </td>
                  <td className="px-4 py-3">
                    <Pips filled={f.uv} />
                  </td>
                  <td className="px-4 py-3 text-[#a3a3a3] max-w-xs">
                    {f.bestFor}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        {f.badge && (
                          <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                            {f.badge}
                          </span>
                        )}
                        <span className="text-accent font-medium">
                          {f.ppUse}
                        </span>
                      </span>
                      <span className="text-[#737373] text-xs">
                        {f.ppNote}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filaments.map((f) => {
          const isHighlighted = highlighted.has(f.name);
          return (
            <div
              key={f.name}
              className={`rounded-lg border border-[#2a2a2a] p-4 ${
                isHighlighted ? "bg-[#f47f20]/[0.06]" : "bg-[#141414]"
              }`}
              style={{ borderLeft: `3px solid ${f.color}` }}
            >
              {/* Header */}
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: f.color }}
                />
                <span className="text-base font-semibold text-white">
                  {f.name}
                </span>
                {f.stock && (
                  <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    In Stock
                  </span>
                )}
              </div>

              {/* Stats row */}
              <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <div>
                  <span className="text-[#737373]">Max Temp: </span>
                  <span className="text-[#e5e5e5]">{f.maxTemp}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#737373]">Strength:</span>
                  <Pips filled={f.strength} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#737373]">UV:</span>
                  <Pips filled={f.uv} />
                </div>
              </div>

              {/* Best for */}
              <p className="mb-3 text-sm text-[#a3a3a3]">{f.bestFor}</p>

              {/* PP usage */}
              <div className="border-t border-[#2a2a2a] pt-3">
                <span className="flex items-center gap-2">
                  {f.badge && (
                    <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                      {f.badge}
                    </span>
                  )}
                  <span className="text-sm font-medium text-accent">
                    {f.ppUse}
                  </span>
                </span>
                <p className="mt-1 text-xs text-[#737373]">{f.ppNote}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

import { useMemo, useState } from "react";
import {
  Sparkles,
  Clock3,
  SlidersHorizontal,
} from "lucide-react";

import SearchBar from "../components/search/SearchBar";
import SearchResults from "../components/search/SearchResults";
import RelatedCases from "../components/search/RelatedCases";
import { searchResults } from "../data/search";

function SemanticSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(
    "organized theft network Chennai"
  );

  const [type, setType] = useState("All");

  const filteredResults = useMemo(() => {

    let results = searchResults;

    if (type !== "All") {
      results = results.filter(
        (result) => result.type === type
      );
    }

    if (!submittedQuery.trim()) {
      return results;
    }

    const terms = submittedQuery
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    return results
      .map((result) => {

        const searchableText = `
          ${result.title}
          ${result.summary}
          ${result.location}
          ${result.entities.join(" ")}
        `.toLowerCase();

        const matches = terms.filter((term) =>
          searchableText.includes(term)
        ).length;

        return {
          ...result,
          queryMatches: matches,
        };
      })
      .sort(
        (a, b) =>
          b.queryMatches - a.queryMatches ||
          b.score - a.score
      );

  }, [submittedQuery, type]);

  const handleSearch = () => {
    setSubmittedQuery(query);
  };

  const handleClear = () => {
    setQuery("");
    setSubmittedQuery("");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">

          <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />

          <p className="text-sm text-[var(--color-primary)]">
            AI Intelligence
          </p>

        </div>

        <h1 className="mt-1 text-2xl font-bold">
          Intelligence Search
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          Search across cases, entities and investigation
          documents using semantic similarity and connected
          intelligence.
        </p>
      </div>

      {/* Search box */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <SlidersHorizontal className="h-4 w-4" />
            Search scope
          </div>

          {[
            "All",
            "Case",
            "Document",
            "Person",
            "Organization",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setType(item)}
              className={`rounded-lg px-3 py-1.5 text-xs transition ${
                type === item
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Search status */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm text-[var(--color-text-secondary)]">

            {submittedQuery ? (
              <>
                Results for{" "}
                <span className="font-medium text-[var(--color-text)]">
                  "{submittedQuery}"
                </span>
              </>
            ) : (
              "Enter a search query"
            )}

          </p>

          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            {filteredResults.length} related results
          </p>

        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">

          <Clock3 className="h-3.5 w-3.5" />

          Search completed in 84ms

        </div>

      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">

        <div>

          <SearchResults
            results={filteredResults}
          />

        </div>

        <div className="space-y-6">

          <RelatedCases
            cases={searchResults.slice(0, 3)}
          />

          {/* Search explanation */}
          <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-5">

            <div className="flex items-center gap-2">

              <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />

              <h3 className="text-sm font-semibold">
                How this works
              </h3>

            </div>

            <p className="mt-3 text-xs leading-6 text-[var(--color-text-secondary)]">
              Search results can combine semantic similarity,
              entity relationships and investigation metadata
              to surface related records.
            </p>

            <div className="mt-4 space-y-2">

              {[
                "Document similarity",
                "Entity overlap",
                "Relationship similarity",
                "Location context",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SemanticSearch;

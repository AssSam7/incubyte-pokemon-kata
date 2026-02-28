import reducer, { setSearchText, setFilters, resetFilters } from "./uiSlice";

describe("pokemonUISlice", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });

    expect(state.searchText).toBe("");
    expect(state.filters.sortBy).toBe("");
    expect(state.filters.type).toBe("");
    expect(state.filters.ability).toBe("");
    expect(state.filters.height).toBe("");
  });

  it("should update search text", () => {
    const state = reducer(undefined, setSearchText("pikachu"));

    expect(state.searchText).toBe("pikachu");
  });

  it("should update specific filter", () => {
    const state = reducer(
      undefined,
      setFilters({ key: "type", value: "fire" })
    );

    expect(state.filters.type).toBe("fire");
  });

  it("should reset filters", () => {
    const populatedState = reducer(
      undefined,
      setFilters({ key: "type", value: "fire" })
    );

    const resetState = reducer(populatedState, resetFilters());

    expect(resetState.filters.type).toBe("");
  });
});

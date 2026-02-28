export type FilterKey = "sortBy" | "type" | "height";

export type Filters = {
  sortBy: string;
  type: string;
  height: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export const initialFilters: Filters = {
  sortBy: "",
  type: "",
  height: "",
};

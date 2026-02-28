import { render } from "@testing-library/react";
import Select from "./Select";
import userEvent from "@testing-library/user-event";

describe("Select Component - rendering", () => {
  it("renders the label", () => {
    render(
      <Select
        label="All Types"
        options={[]}
        selectedValue=""
        isOpen={false}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
      />
    );

    expect(screen.getByText("All Types")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();

    render(
      <Select
        label="All Types"
        options={[]}
        selectedValue=""
        isOpen={false}
        onToggle={onToggle}
        onSelectOption={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalled();
  });

  it("renders options when open", () => {
    render(
      <Select
        label="All Types"
        options={[
          { label: "Fire", value: "fire" },
          { label: "Water", value: "water" },
        ]}
        selectedValue=""
        isOpen={true}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
      />
    );

    expect(screen.getByText("Fire")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });

  it("calls onSelectOption when an option is clicked", async () => {
    const onSelectOption = vi.fn();

    render(
      <Select
        label="All Types"
        options={[{ label: "Fire", value: "fire" }]}
        selectedValue=""
        isOpen={true}
        onToggle={vi.fn()}
        onSelectOption={onSelectOption}
      />
    );

    await userEvent.click(screen.getByText("Fire"));

    expect(onSelectOption).toHaveBeenCalledWith("fire");
  });
});

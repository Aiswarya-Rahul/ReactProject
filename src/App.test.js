import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("App component", () => {
  test("Renders Cat names if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          name: "Bob",
          gender: "Male",
          age: 23,
          pets: [
            { name: "Garfield", type: "Cat" },
            { name: "Fido", type: "Dog" },
          ],
        },
      ],
    });
    render(<App />);
    const labelElement = screen.queryByLabelText("No Pets to display");
    expect(labelElement).not.toBeInTheDocument();
  }),
    test("Renders no names when no Cats in the list", async () => {
      window.fetch = jest.fn();
      window.fetch.mockResolvedValueOnce({
        json: async () => [
          {
            name: "Bob",
            gender: "Male",
            age: 23,
            pets: [],
          },
        ],
      });

      act(() => {
        render(<App />);
      });
      const nullpetList = screen.queryByRole("listitem");
      expect(nullpetList).not.toBeInTheDocument();
    });
  test("does not render Female/ Male text if no cats belong to them", () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          name: "Bob",
          gender: "Male",
          age: 23,
          pets: [
            { name: "Blimpi", type: "Fish" },
            { name: "Allu", type: "Dog" },
            { name: "Silly", type: "Cow" },
          ],
        },
        {
          name: "Aish",
          gender: "Female",
          age: 23,
          pets: [
            { name: "Bingo", type: "Fish" },
            { name: "Bazzinga", type: "Dog" },
          ],
        },
      ],
    });
    act(() => {
      render(<App />);
    });
    const femaleTxt = screen.queryByText("Female");
    const maleText = screen.queryByText("Male");
    expect(femaleTxt).not.toBeInTheDocument();
    expect(maleText).not.toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoriesSection from "./CategoriesSection";

jest.mock("framer-motion", () => {
  return {
    motion: {
      div: function MockMotionDiv({ children, ...props }) {
        delete props.initial;
        delete props.animate;
        delete props.transition;
        delete props.whileHover;
        return (
          <div data-testid="motion-div" {...props}>
            {children}
          </div>
        );
      },
    },
  };
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

global.fetch = jest.fn();

describe("CategoriesSection Component", () => {

  const mockCategories = {
    success: true,
    data: [
      { id: 1, name: "Food & Dining" },
      { id: 2, name: "Transportation" },
      { id: 3, name: "Shopping" },
    ],
  };

  const mockTransactionCounts = {
    success: true,
    data: {
      "Food & Dining": 5,
      Transportation: 3,
      Shopping: 2,
    },
  };

  beforeEach(() => {

    jest.clearAllMocks();

    global.fetch.mockReset();

    global.fetch.mockImplementation((url) => {
      if (url === "http://localhost:8000/api/categories") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        });
      }
      if (url === "http://localhost:8000/api/transaction-counts") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTransactionCounts),
        });
      }
      return Promise.reject(new Error(`Unhandled fetch URL: ${url}`));
    });
  });

  test("renders the section title correctly", async () => {
    render(<CategoriesSection />);

    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
  });

  test("fetches categories when component mounts", async () => {
    render(<CategoriesSection />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/categories"
      );
    });

    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
  });

  test("fetches transaction counts when logged in", async () => {

    localStorageMock.getItem.mockReturnValue("fake-token");

    render(<CategoriesSection />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/transaction-counts",
        {
          headers: {
            Authorization: "Bearer fake-token",
          },
        }
      );
    });

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/api/categories");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/transaction-counts",
      {
        headers: {
          Authorization: "Bearer fake-token",
        },
      }
    );
  });

  test("doesn't fetch transaction counts when not logged in", async () => {

    localStorageMock.getItem.mockReturnValue(null);

    render(<CategoriesSection />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/categories"
      );
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalledWith(
      "http://localhost:8000/api/transaction-counts",
      expect.anything()
    );
  });

  test("handles API error for categories", async () => {

    jest.spyOn(console, "error").mockImplementation(() => {});

    global.fetch.mockImplementation((url) => {
      if (url === "http://localhost:8000/api/categories") {
        return Promise.reject(new Error("Network error"));
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    render(<CategoriesSection />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
  });

  test("handles API error for transaction counts", async () => {

    localStorageMock.getItem.mockReturnValue("fake-token");

    jest.spyOn(console, "error").mockImplementation(() => {});

    global.fetch.mockImplementation((url) => {
      if (url === "http://localhost:8000/api/categories") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        });
      }
      if (url === "http://localhost:8000/api/transaction-counts") {
        return Promise.reject(new Error("Network error"));
      }
      return Promise.reject(new Error(`Unhandled fetch URL: ${url}`));
    });

    render(<CategoriesSection />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });

    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
  });
});

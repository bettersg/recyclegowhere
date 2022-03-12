import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
// import {describe, expect} from '@jest/globals';

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Pulau Semakau will be completely filled by 2035/i,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });
});

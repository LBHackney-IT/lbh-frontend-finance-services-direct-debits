import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import Root from "./root.component";

describe("Root component", () => {
  it("should be in the document", async () => {
    render(<Root />);

    expect(await screen.findByTestId("root")).toBeInTheDocument();
  });
});

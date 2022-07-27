import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { waitFor } from "@testing-library/react";

import App from "./app";

// test("App renders correctly", async () => {
//   render(<App />, { path: "/", url: "/" });
//   expect(await screen.findByRole("search")).toBeInTheDocument();
// });

test("App redirects to last search", async () => {
  sessionStorage.setItem("search:last", "persons?s=Jake");
  render(<App />, { path: "/", url: "/search" });
  await waitFor(() => {
    expect(window.location.pathname).toBe("/search");
    // expect(window.location.search).toBe("?s=Jake");
  });
});

test("App redirects to homepage if no last search", async () => {
  render(<App />, { path: "/", url: "/search" });
  await waitFor(() => {
    expect(window.location.pathname).toBe("/search");
  });
});

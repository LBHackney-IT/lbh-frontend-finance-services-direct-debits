import React from "react";

import { ConfirmationRouter } from "@mtfh/common/lib/components";

import App from "./app";

const Root = (): JSX.Element => (
  <div data-testid="root">
    <ConfirmationRouter>
      <App />
    </ConfirmationRouter>
  </div>
);

export default Root;

import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import axeCore from "axe-core";

import { LoginPage } from "./LoginPage";

test("LoginPage has no accessibility violations", async () => {
  const { container } = render(<LoginPage />);

  const results = await axeCore.run(container);

  expect(results.violations).toEqual([]);
});

import { server } from "@hackney/mtfh-test-utils";
import { rest } from "msw";

const session: Record<string, string> = {};

Object.defineProperty(window, "sessionStorage", {
  value: {
    setItem: jest.fn((key, value) => {
      session[key] = value;
    }),
    getItem: jest.fn((key) => session[key] || null),
  },
});

export const get = (
  path: string,
  data: Record<string, any>,
  code = 200
): void => {
  server.use(
    rest.get(path, (req, res, ctx) => {
      return res(ctx.status(code), ctx.json(data));
    })
  );
};

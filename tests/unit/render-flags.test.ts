/*
 * render-flags.test.ts
 *
 * Copyright (C) 2020-2022 Posit Software, PBC
 */

import { assertEquals, assertRejects } from "testing/asserts";

import {
  fixupPandocArgs,
  parseRenderFlags,
} from "../../src/command/render/flags.ts";
import { unitTest } from "../test.ts";

unitTest(
  "render --jobs flag is parsed",
  async () => {
    const flags = await parseRenderFlags(["--jobs", "4"]);
    assertEquals(flags.jobs, 4);
  },
);

unitTest(
  "render --jobs=VALUE flag is parsed",
  async () => {
    const flags = await parseRenderFlags(["--jobs=3"]);
    assertEquals(flags.jobs, 3);
  },
);

unitTest(
  "render --jobs rejects invalid values",
  async () => {
    await assertRejects(
      () => parseRenderFlags(["--jobs", "0"]),
      Error,
      "Invalid value for --jobs",
    );

    await assertRejects(
      () => parseRenderFlags(["--jobs", "abc"]),
      Error,
      "Invalid value for --jobs",
    );
  },
);

unitTest(
  "render --jobs is removed from pandoc args",
  async () => {
    const args = fixupPandocArgs(["--jobs", "4", "--standalone"], {});
    assertEquals(args, ["--standalone"]);
  },
);

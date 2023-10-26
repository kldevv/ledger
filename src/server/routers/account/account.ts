import { procedure } from "@/server/trpc";
import { z } from "zod";

const createCategory = procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    })
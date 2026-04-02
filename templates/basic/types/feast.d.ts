// types/feast.d.ts
import { z } from "zod";
import { AnswersSchema, ConfigSchema } from "../../../schema.ts";

export type Config = z.infer<typeof ConfigSchema>;
export type Answers = z.infer<typeof AnswersSchema>;

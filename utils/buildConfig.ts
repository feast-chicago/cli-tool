import { Answers, FeastConfig } from "../schema";

export function buildConfig(answers: Answers, id: string): string {
  const { name, description } = answers;
  const config: FeastConfig = { id, name, description };

  const result = `import { FeastConfig } from "./schema";
   
   const config: FeastConfig = ${JSON.stringify(config)};
   
   export default config;
   `;
  return result;
}

import "@dotenvx/dotenvx/config";
import fs from "fs-extra";
import ora from "ora";
import { join } from "path";
import { Answers } from "../schema";
import { buildUtils } from "../utils/buildUtils";

export async function updateRepo(answers: Answers) {
  const clientSitePath = join(process.cwd(), "../client-site");
  const feastWorksPath = join(process.cwd(), "../feast-works");

  // Copy the schema files to the client-site and feast-works directories
  const schemaSpinner = ora(
    "Updating the schema and types-related files...",
  ).start();
  await fs.copy(
    join(process.cwd(), "schema.ts"),
    join(clientSitePath, "schema.ts"), // Copy the schema file to the client site.
  );
  await fs.copy(
    join(process.cwd(), "schema.ts"),
    join(feastWorksPath, "schema.ts"), // Copy the schema file to the FEAST Works site.
  );
  await fs.copy(
    join(process.cwd(), "clerk.d.ts"),
    join(feastWorksPath, "clerk.d.ts"), // Copy the Clerk types file to the FEAST Works site.
  );
  schemaSpinner.succeed("✅ schema.ts successfully updated");

  // Overwrite the utils.ts file to include the most updated theme/CSS generation functions.
  const utilsSpinner = ora(
    `Updating the utils.ts file for ${answers.name}...`,
  ).start();
  const clientSiteUtilsContent = buildUtils(false);
  const feastWorksUtilsContent = buildUtils(true);
  await fs.writeFile(
    join(clientSitePath, "lib", "utils.ts"),
    clientSiteUtilsContent,
  );
  await fs.writeFile(
    join(feastWorksPath, "lib", "utils.ts"),
    feastWorksUtilsContent,
  );
  utilsSpinner.succeed("✅ utils.ts successfully updated");

  // Copy the Blocks file from to the feast-works repo to the client-site repo
  const blocksSpinner = ora('Updating "block" components...').start();
  await fs.copy(
    join(feastWorksPath, "app/admin/builder/_components", "Blocks.tsx"),
    join(clientSitePath, "components", "Blocks.tsx"),
  );
  blocksSpinner.succeed("✅ Blocks.tsx successfully updated");

  // Generate ComponentRenderer.tsx from BLOCK_MAP
  const rendererSpinner = ora("Updating ComponentRenderer.tsx...").start();
  try {
    // read the copied Blocks.tsx to extract exported block names
    const blocksContent = await fs.readFile(
      join(clientSitePath, "components", "Blocks.tsx"),
      "utf8",
    );

    // Extract BLOCK_MAP
    const blockMapMatch = blocksContent.match(
      /export const BLOCK_MAP[^{]*{([^}]*)}/s,
    );

    if (!blockMapMatch) throw new Error("BLOCK_MAP not found in Blocks.tsx");

    // Parse out "key: ComponentName" pairs
    const entries = [...blockMapMatch[1].matchAll(/(\w+):\s*(\w+)/g)];

    if (entries.length === 0) throw new Error("No entries found in BLOCK_MAP");

    const blockNames = entries.map(([, , name]) => name);
    const blockKeys = entries.map(([, key]) => key);

    const rendererContent = `import { Business, PageComponent } from "@/schema";
import { ${blockNames.join(", ")} } from "./Blocks";

const SECTION_MAP: Partial<
  Record<PageComponent["type"], React.ComponentType<any>>
> = {
  ${entries.map((entry) => `${entry[0]},`).join("\n  ")}
};

export function ComponentRenderer({
  business,
  layout,
}: {
  business: Business;
  layout: PageComponent[];
}) {
  return (
    <>
      {layout.map((component) => {
        const Section = SECTION_MAP[component.type];
        if (!Section) return null;
        return (
          <Section
            key={component.id}
            props={component.props}
            business={business}
            theme={business.theme}
          />
        );
      })}
    </>
  );
}
`;

    await fs.writeFile(
      join(clientSitePath, "components", "ComponentRenderer.tsx"),
      rendererContent,
      "utf8",
    );

    rendererSpinner.succeed(
      `✅ ComponentRenderer.tsx sucessfully updated with ${entries.length} block${entries.length !== 1 ? "s" : ""} — ${blockKeys.join(", ")}`,
    );
  } catch (err) {
    rendererSpinner.fail("❌ Failed to generate ComponentRenderer.tsx");
    throw err;
  }
}

export async function addDomain(slug: string) {
  const domain = `${slug}.${process.env.FEAST_DOMAIN!}`;
  const teamId = process.env.VERCEL_TEAM_ID!;
  const token = process.env.VERCEL_TOKEN!;
  const projectId = process.env.VERCEL_PROJECT_ID!;

  // Add subdomain to Vercel project
  const domainSpinner = ora(`Adding domain: ${domain}...`).start();
  const siteUrl = `https://${domain}`;
  try {
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/domains?teamId=${teamId}&slug=${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: domain }),
      },
    );

    if (!res.ok) {
      throw new Error(`❌ Error ${res.status}: Failed to add domain`);
    }

    domainSpinner.succeed(`✅ Domain successfully configured: ${siteUrl}`);
  } catch (err) {
    domainSpinner.fail("❌ Domain configuration failed");
    throw err;
  }
}

import { createClerkClient } from "@clerk/backend";
import generator from "generate-password";
import { createSlug } from "../../utils/slug";
import { Answers } from "../../schema";
import ora from "ora";

export async function provisionClient(answers: Answers) {
  const clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
  });
  const slug = createSlug(answers.name);
  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    uppercase: true,
    strict: true, // Guarantees at least one of each character type
  });

  const clerkSpinner = ora(
    `Provisioning Clerk with ${answers.name}'${answers.name[answers.name.length - 1] === "s" ? "" : "s"} information..`,
  ).start();

  try {
    // 1. Create the org first so we have its ID for user metadata
    const org = await clerk.organizations.createOrganization({
      name: answers.name,
      slug,
    });

    // 2. Create the user with org ID already baked into metadata
    // TODO: Prompt should ask if it's for an existing user (just ask email) or new user (ask name, email, password)
    const user = await clerk.users.createUser({
      emailAddress: [answers.admin.email],
      password,
      firstName: answers.admin.first_name,
      lastName: answers.admin.last_name,
      publicMetadata: {
        businesses: [
          {
            id: org.id,
            role: "owner",
            permissions: [],
          },
        ],
      },
      privateMetadata: {
        isOnboardingComplete: false,
        // stripeCustomerId: null,
      },
    });

    // 3. Add the user to the org as admin
    await clerk.organizations.createOrganizationMembership({
      organizationId: org.id,
      userId: user.id,
      role: "org:admin",
    });

    clerkSpinner.succeed(
      `✅ Clerk provisioning complete\n  ➡️ Business ID: ${org.id}\n  ➡️ User ID: ${user.id}`,
    );
    return {
      userEmail: user.emailAddresses[0].emailAddress,
      orgId: org.id,
      password,
      slug,
    };
  } catch (err) {
    clerkSpinner.fail("❌ Clerk provisioning failed");
    throw err;
  }
}

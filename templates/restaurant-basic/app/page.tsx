import config from "@/feast.config";
import { getBusiness } from "@/lib/getBusiness";

export default async function Home() {
  const business = await getBusiness();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1>{business.name}</h1>
        <p>{business.tagline}</p>
        {config.business.category.includes("restaurant") && (
          <p>We are a restaurant!!</p>
        )}
      </main>
    </div>
  );
}

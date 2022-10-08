import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";
import { ListItem } from "@/components/ListItem.tsx";
import { type Item } from "@/utils/types.ts";

const TITLE = "Fresh - Hacker News";
const DESCRIPTION = "Hacker News clone made with Fresh";

export const handler: Handlers<Item[]> = {
  async GET(_req, ctx) {
    const items = await fetch("/api/hn/items");
    return ctx.render(await items.json() as Item[]);
  },
};

export default function Home(props: PageProps<Item[]>) {
  const { data: items } = props;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        {/* TODO: <meta property="og:image" content={ogImageUrl} /> */}
      </Head>
      <div class="mx-auto md:p-2 md:w-[85%]">
        <Header />
        <div class="bg-white pt-1 px-3">
          <ul class="pb-3">
            {items.map((item) => <ListItem item={item} />)}
          </ul>
          <Footer />
        </div>
      </div>
    </>
  );
}

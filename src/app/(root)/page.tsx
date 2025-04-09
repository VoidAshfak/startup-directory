import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import {auth} from "../../../auth"


export default async function Home(
    { searchParams }: { searchParams: Promise<{ query?: string }> }
) {

    const { query } = await searchParams;
    const params = {
        search: query || null
    }

    const session = await auth();

    console.log(session);
    

    // const posts = await client.fetch(STARTUPS_QUERY);  
    const { data: posts } = await sanityFetch({query: STARTUPS_QUERY, params});

    return (
        <>
            <section className="pink_container pattern">
                <h1 className="heading">Pitch your Startup, <br /> Connect with Investors</h1>

                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Connect with Investors, and Grow Your Startup.
                </p>

                <SearchForm query={query} />
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Results for "${query}"` : "Trending Startups"}
                </p>
                <ul className="mt-7 card_grid">
                    {posts.map((post:any) => (
                        <StartupCard key={post?._id} post={post} />
                    ))}
                </ul>
            </section>
            <SanityLive />
        </>
    );
}

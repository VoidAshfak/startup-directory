import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { SINGLE_STARTUP_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard from '@/components/StartupCard';




const StartupDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;


    // const post = await client.fetch(SINGLE_STARTUP_BY_ID_QUERY, { id });
    // const { select: editorsPick } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-s-pick" });

    const [post, { select: editorsPick }] = await Promise.all([
        client.fetch(SINGLE_STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-s-pick" })
    ])


    // const md = markdownit()
    // const paarsedContent = md.render(post?.pitch || "")

    if (!post) return notFound();

    return (
        <>
            <section className='pink_container !min-h-[230px] pattern'>
                <p className='tag'> {formatDate(post?._createdAt)} </p>
                <h1 className='heading'> {post.title} </h1>
                <p className='sub-heading !max-w-5xl'> {post?.description} </p>
            </section>

            <section className='section_container'>
                <Image
                    src={post.image}
                    alt='Startup Image'
                    width={500}
                    height={500}
                    className='w-full h-auto rounded-xl'
                />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link
                            href={`/users/${post.author?._id}`}
                            className='flex gap-2 items-center mb-3'>
                            <Image
                                src={post.author.image}
                                alt="avatar"
                                width={64}
                                height={64}
                                className='rounded-full drop-shadow-lg'
                            />

                            <div>
                                <p className='taxt-20-medium'> {post.author.name} </p>
                                <p className='taxt-20-medium !text-black-300'> @{post.author.username} </p>
                            </div>
                        </Link>

                        <p className='category-tag'> {post.catagory} </p>
                    </div>
                    <h3 className='text-30-bold '>
                        Startup Details
                    </h3>
                    {/* {paarsedContent ? (
                        <article
                            className='pros'
                            dangerouslySetInnerHTML={{__html: paarsedContent}}
                        />
                    ): (
                        <p className='no-result'>
                            No details provided.
                        </p>
                    )} */}
                </div>
                <hr className='divider' />
                {editorsPick?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorsPick.map((post: any, i: number) => (
                                <StartupCard key={i} post={post} />
                            ))}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton className='view_skeleton' />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    )
}

export default StartupDetailsPage
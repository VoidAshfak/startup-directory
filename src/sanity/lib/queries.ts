import { defineQuery } from "next-sanity"

export const STARTUPS_QUERY = defineQuery(
    `*[_type == "startup" && defined(slug.current)] | order(_createdAt desc)
{
    _id, 
    _createdAt, 
    title, 
    slug, 
    catagory, 
    image,
    author -> {
        _id,
        name,
        image,
        bio
    },
    views,
    description,
}`
)
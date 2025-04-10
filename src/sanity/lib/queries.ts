import { defineQuery } from "next-sanity"

export const STARTUPS_QUERY = defineQuery(
    `*[_type == "startup" && defined(slug.current) && !defined($search) || catagory match $search || author match $search || title match $search] | order(_createdAt desc)
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

export const SINGLE_STARTUP_BY_ID_QUERY = defineQuery(
    `*[_type == "startup" && _id == $id][0]{
    _id, 
    _createdAt, 
    title, 
    slug, 
    catagory, 
    image,
    author -> {
        _id,
        name,
        username,
        image,
        bio
    },
    views,
    description,
    pitch
}`
)

export const STARTUP_VIEWS_QUERY = defineQuery(
    `*[_type == "startup" && _id == $id][0]{
        _id, views
    }`
)

export const AUTHOR_BY_GITHUB_QUERY = defineQuery(
    `*[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }`
)


export const AUTHOR_BY_ID_QUERY = defineQuery(
    `*[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }`
)


export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(
    `*[_type == "startup" && author._ref == $id] | order(_createdAt desc)
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
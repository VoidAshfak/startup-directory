import { BriefcaseBusiness } from "lucide-react";
import { defineField, defineType } from "sanity";

export const startup = defineType(
    {
        name: 'startup',
        title: 'Startup',
        type: 'document',
        icon: BriefcaseBusiness,
        fields: [
            defineField({
                name: 'slug',
                type: 'slug',
                options: {
                    source: 'title',
                }
            }),
            defineField({
                name: 'title',
                type: 'string',
            }),
            defineField({
                name: 'author',
                type: 'reference',
                to: { type: 'author' },
            }),
            defineField({
                name: 'views',
                type: 'number',
                initialValue: 0
            }),
            defineField({
                name: 'description',
                type: 'text',
            }),
            defineField({
                name: 'catagory',
                type: 'string',
                validation: (Rule) => Rule.required().min(1).max(20).error('Catagory is required'),
            }),
            defineField({
                name: 'image',
                type: 'url',
                validation: (Rule) => Rule.required().error('Image is required'),
            }),
            defineField({
                name: 'pitch',
                type: 'text',
            }),
        ],
    }
)
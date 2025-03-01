export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Current Company',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each entry will be displayed as a separate paragraph'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter/X URL',
      type: 'url',
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'experiences',
      title: 'Experiences',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'title', 
              title: 'Title', 
              type: 'string',
              validation: Rule => Rule.required()
            },
            { 
              name: 'company', 
              title: 'Company', 
              type: 'string',
              validation: Rule => Rule.required()
            },
            { 
              name: 'startDate', 
              title: 'Start Date', 
              type: 'date',
              options: {
                dateFormat: 'YYYY-MM'
              }
            },
            { 
              name: 'endDate', 
              title: 'End Date', 
              type: 'date',
              options: {
                dateFormat: 'YYYY-MM'
              },
              description: 'Leave empty if current position'
            },
            { 
              name: 'description', 
              title: 'Description', 
              type: 'array',
              of: [{ type: 'block' }]
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'company'
            }
          }
        },
      ],
    },
    {
      name: 'resumeUrl',
      title: 'Resume/CV URL',
      type: 'url',
      description: 'Link to downloadable resume or CV'
    },
  ],
} 
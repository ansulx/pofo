export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedIn',
      title: 'Published In',
      type: 'string',
      description: 'Journal/Conference name or venue',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publicationType',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Conference Paper', value: 'conference' },
          { title: 'Journal Article', value: 'journal' },
          { title: 'Book Chapter', value: 'bookChapter' },
          { title: 'Workshop Paper', value: 'workshop' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'Thesis', value: 'thesis' },
        ],
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'month',
      title: 'Month',
      type: 'number',
      description: 'Month of publication (1-12)',
      validation: (Rule: any) => Rule.min(1).max(12),
    },
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'url',
      title: 'Publication URL',
      type: 'url',
      description: 'Link to the publication page',
    },
    {
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      description: 'Direct link to PDF if available',
    },
    {
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier (e.g., 10.1145/3442188.3445922)',
    },
    {
      name: 'citations',
      title: 'Citations',
      type: 'number',
      description: 'Number of citations (optional)',
    }
  ],
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publicationDateDesc',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'month', direction: 'desc'}
      ]
    },
    {
      title: 'Publication Date, Old',
      name: 'publicationDateAsc',
      by: [
        {field: 'year', direction: 'asc'},
        {field: 'month', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      venue: 'publishedIn'
    },
    prepare(selection: any) {
      const {title, year, venue} = selection
      return {
        title: title,
        subtitle: `${venue} (${year})`
      }
    }
  }
} 
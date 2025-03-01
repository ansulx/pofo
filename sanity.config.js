import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: 'v4ipor4n',
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: [
      // About schema
      {
        name: 'about',
        title: 'About',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Full Name',
            type: 'string',
          },
          {
            name: 'title',
            title: 'Professional Title',
            type: 'string',
          },
          {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
              hotspot: true,
            },
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
                  { name: 'title', title: 'Title', type: 'string' },
                  { name: 'company', title: 'Company', type: 'string' },
                  { name: 'startDate', title: 'Start Date', type: 'string' },
                  { name: 'endDate', title: 'End Date', type: 'string' },
                  { name: 'description', title: 'Description', type: 'text' },
                ],
              },
            ],
          },
          {
            name: 'cv',
            title: 'Curriculum Vitae (CV/Resume)',
            type: 'file',
            description: 'Upload your CV or resume (PDF format recommended)',
            options: {
              accept: '.pdf'
            }
          },
          {
            name: 'cvTitle',
            title: 'CV Button Text',
            type: 'string',
            description: 'Text to show on the CV download button',
            initialValue: 'Download CV'
          }
        ],
      },
      
      // Blog post schema
      {
        name: 'post',
        title: 'Blog Posts',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
          },
          {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
          },
          {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
          },
          {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
              {
                type: 'block',
              },
              {
                type: 'image',
                options: { hotspot: true },
              },
              {
                type: 'code',
              }
            ],
          },
          {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: {type: 'category'}
              }
            ]
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            description: 'Set to true to display this post prominently',
            initialValue: false
          },
          {
            name: 'estimatedReadingTime',
            title: 'Estimated Reading Time (minutes)',
            type: 'number',
          },
        ],
      },
      
      // Project schema
      {
        name: 'project',
        title: 'Projects',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true }
          },
          { name: 'url', title: 'URL', type: 'url' }
        ]
      },
      
      // Publication schema
      {
        name: 'publication',
        title: 'Publications',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'authors', title: 'Authors', type: 'array', of: [{ type: 'string' }] },
          { name: 'publishedIn', title: 'Published In', type: 'string' },
          { name: 'year', title: 'Year', type: 'number' },
          { name: 'month', title: 'Month', type: 'number' },
          { name: 'abstract', title: 'Abstract', type: 'text' },
          { name: 'url', title: 'URL', type: 'url' },
        ]
      },
      
      // Add the category schema that was missing
      {
        name: 'category',
        title: 'Categories',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
          },
          {
            name: 'color',
            title: 'Color',
            type: 'string',
            description: 'HEX color code for the category (e.g. #ff0000)',
            validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).warning('Must be a valid HEX color code')
          }
        ],
      },
    ],
  },

  // Add this section for webhook configuration
  webhooks: [
    {
      url: process.env.SANITY_WEBHOOK_URL || 'https://yourdomain.com/api/sanity-webhook',
      filter: {
        types: ['post', 'project', 'publication', 'about'],
        trigger: ['create', 'update', 'delete']
      },
      projection: {
        _id: true,
        _type: true
      }
    }
  ],
  
  // CORS settings to allow client-side listening
  cors: {
    allowCredentials: true,
    allowOrigins: [
      'http://localhost:3000',
      'https://yourdomain.com'
    ]
  },
}) 
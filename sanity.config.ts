import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import post from './sanity/schemas/post'
import project from './sanity/schemas/project'
import publication from './sanity/schemas/publication'
import about from './sanity/schemas/about'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Content',
  projectId: 'v4ipor4n',
  dataset: 'production',
  apiVersion: '2024-03-17',
  basePath: '/studio',
  plugins: [deskTool(), visionTool(), codeInput()],
  schema: {
    types: [post, project, publication, about],
  },
}) 
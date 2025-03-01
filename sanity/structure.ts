import { StructureBuilder } from 'sanity/desk';
import { HiOutlineDocumentText, HiOutlineUser, HiOutlineCollection, HiOutlineNewspaper, HiOutlineAcademicCap } from 'react-icons/hi';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // About/Profile
      S.listItem()
        .title('Profile')
        .icon(HiOutlineUser)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      
      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(HiOutlineDocumentText)
        .child(
          S.documentTypeList('post')
            .title('All Blog Posts')
        ),
      
      // Categories
      S.listItem()
        .title('Categories')
        .icon(HiOutlineCollection)
        .child(
          S.documentTypeList('category')
            .title('Categories')
        ),
        
      // Projects
      S.listItem()
        .title('Projects')
        .icon(HiOutlineNewspaper)
        .child(
          S.documentTypeList('project')
            .title('Projects')
        ),
      
      // Publications
      S.listItem()
        .title('Publications')
        .icon(HiOutlineAcademicCap)
        .child(
          S.documentTypeList('publication')
            .title('Publications')
        ),
    ]);

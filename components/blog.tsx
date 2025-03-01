"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { urlFor } from "@/sanity/utils";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  const { ref } = useSectionInView("Blog");

  if (!posts || posts.length === 0) {
    return (
      <section id="blog" className="scroll-mt-28 mb-28">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-medium capitalize mb-8 text-center">
            Recent Blog Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="blog"
      className="scroll-mt-28 mb-28"
    >
      <SectionHeading>My Blog</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug.current}`}
            key={post._id}
            className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {post.mainImage && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(600).height(340).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex flex-col flex-grow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {post.publishedAt && format(parseISO(post.publishedAt), 'MMMM d, yyyy')}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
              )}
              <div className="mt-auto pt-4">
                <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline inline-flex items-center">
                  Read post
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 
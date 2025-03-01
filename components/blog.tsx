"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";
import { format } from "date-fns";
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

  return (
    <section
      ref={ref}
      id="blog"
      className="scroll-mt-28 mb-28"
    >
      <SectionHeading>My Blog</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.article
            key={post._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-white/10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug.current}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
} 
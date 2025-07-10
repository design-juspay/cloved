import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import React from "react";
import { PageMetadata } from "../utils/getFileContent";
import TableOfContents from "@/app/components/TableOfContents";
import { extractHeadings } from "../utils/toc";

const page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const basePath = path.join(process.cwd(), "app", "docs", "content");

  let filePath =
    path.join(
      basePath,
      Array.isArray(slugArray) ? slugArray.join("/") : slugArray
    ) + ".mdx";

  if (!fs.existsSync(filePath)) {
    filePath = path.join(basePath, ...slugArray, "page.mdx");
    if (!fs.existsSync(filePath)) {
      // notFound();
      return <div>not found</div>;
    }
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
    components: useMDXComponents(),
  });

   const headings = extractHeadings(fileContent);

   const metadata: PageMetadata = {
     title: (frontmatter as PageMetadata)?.title || "Untitled",
     description: (frontmatter as PageMetadata)?.description || "",
     category: (frontmatter as PageMetadata)?.category || "",
     tags: (frontmatter as PageMetadata)?.tags || [],
     ...(frontmatter as PageMetadata), 
   };
  return (
    <div className="w-full flex-1 flex m-0.5">
      <div className="m-1 flex-1 gap-2 px-4">
        <article className="prose py-10 max-w-[80ch] mx-auto overflow-x-hidden">
          <PageHeader metadata={metadata} />
          {content}
        </article>
      </div>
      <div className="doc-toc-ctr max-w-[240px] w-full ">
        <div className="sticky top-4">
          <TableOfContents items={headings} />
        </div>
      </div>
    </div>
  );
};

const PageHeader = ({ metadata }: { metadata: PageMetadata }) => {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-[var(--primary)]">
        {metadata.title}
      </h1>
      <p className="mt-2 text-[var(--muted-foreground)]">{metadata.description}</p>
    </>
  );
};

export default page;

import withMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig = {
  /* config options here */
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
})(nextConfig);

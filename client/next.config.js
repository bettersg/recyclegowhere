// module.exports = {
//   reactStrictMode: true,
// }

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  })


module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})
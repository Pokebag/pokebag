// Module imports
import { serialize } from 'next-mdx-remote/serialize'
import frontmatter from 'gray-matter'
import fs from 'fs/promises'
import path from 'path'
import remarkBehead from 'remark-behead'
import remarkCapitalize from 'remark-capitalize'
import remarkFootnotes from 'remark-numbered-footnote-labels'
import remarkSlug from 'remark-slug'
import slugger from 'github-slugger'





function cleanupHeadingNode(node) {
	delete node.depth

	if (node.children.length) {
		node.children.forEach(cleanupHeadingNode)
	}
}

function reduceTableOfContents(accumulator, line, index, array) {
	const trimmedLine = line.trim()

	if (trimmedLine.startsWith('#')) {
		const depth = /^#+/.exec(trimmedLine)[0].length
		let currentItem = accumulator
		let parent = currentItem

		while (depth > currentItem.depth) {
			const nextItem = currentItem?.children[currentItem.children.length - 1]
			parent = currentItem

			if (nextItem) {
				currentItem = nextItem
			} else {
				break
			}
		}

		const label = trimmedLine.replace(/^#+/, '').trim()

		parent.children.push({
			children: [],
			depth,
			label,
			slug: slugger.slug(label),
		})
	}

	if (index === (array.length - 1)) {
		cleanupHeadingNode(accumulator)
	}

	return accumulator
}

export async function getArticleProps(context) {
	const { slug } = context.params

	const blogDirectoryPath = path.resolve('src', 'articles')

	let articleFile = null

	try {
		articleFile = await fs.readFile(path.resolve(blogDirectoryPath, `${slug}.mdx`), 'utf8')
	} catch (error) {
		return { notFound: true }
	}

	const {
		content,
		data,
	} = frontmatter(articleFile)

	const tableOfContents = content.split('\n').reduce(reduceTableOfContents, {
		children: [],
		depth: 0,
		root: true,
	})

	const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
				remarkCapitalize,
				remarkFootnotes,
				[remarkBehead, { depth: 2 }],
				remarkSlug,
			],
      rehypePlugins: [],
    },
    scope: JSON.parse(JSON.stringify(data)),
  })

	return {
		props: {
			slug,
			source,
			tableOfContents,
		},
	}
}

// Module imports
import visit from 'unist-util-visit'





export function remarkGalleryDirective() {
	return (tree, file) => {
		function visitor(node) {
			console.log(node)
		}

		// console.log(tree)

		visit(tree, 'paragraph', visitor)
	}
}

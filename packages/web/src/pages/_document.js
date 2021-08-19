import NextDocument, {
	Html as NextHTML,
	Head as NextHead,
	Main as NextMain,
	NextScript,
} from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(context) {
    const initialProps = await NextDocument.getInitialProps(context)
    return { ...initialProps }
  }

  render() {
    return (
      <NextHTML>
        <NextHead>
					<link
						href="https://use.typekit.net/zja2ghf.css"
						rel="stylesheet" />
				</NextHead>

        <body>
          <NextMain />
          <NextScript />
        </body>
      </NextHTML>
    )
  }
}

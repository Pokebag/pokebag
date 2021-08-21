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
					<link
						href="/apple-touch-icon.png"
						rel="apple-touch-icon"
						sizes="180x180" />
					<link
						href="/favicon-32x32.png"
						rel="icon"
						sizes="32x32"
						type="image/png" />
					<link
						href="/favicon-16x16.png"
						rel="icon"
						sizes="16x16"
						type="image/png" />
					<link
						href="/site.webmanifest"
						rel="manifest" />
				</NextHead>

        <body>
          <NextMain />
          <NextScript />
        </body>
      </NextHTML>
    )
  }
}

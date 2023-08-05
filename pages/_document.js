import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </Head>
      <body className=' bg-main'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

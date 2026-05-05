import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical images */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preload" href="/SFH-Favicon-.png" as="image" type="image/png" />
        <link rel="preload" href="/promo-1.webp" as="image" type="image/webp" />
        <link rel="preload" href="/promo-2.webp" as="image" type="image/webp" />
        <link rel="preload" href="/promo-3.webp" as="image" type="image/webp" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//searchingforhealth.com" />
        <link rel="dns-prefetch" href="//amzn.to" />
        <link rel="dns-prefetch" href="//www.barnesandnoble.com" />

        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://searchingforhealth.com" />
        <link rel="preconnect" href="https://amzn.to" />
        <link rel="preconnect" href="https://www.barnesandnoble.com" />

        {/* Cache control headers */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
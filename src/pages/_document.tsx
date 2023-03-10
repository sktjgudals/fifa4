import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  redirectIEToEdge = () => {
    const recommendEdgeUrl =
      "https://support.microsoft.com/office/160fa918-d581-4932-9e4e-1075c4713595";
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
          window.location = 'microsoft-edge:' + window.location;
          setTimeout(function() {
            window.location = '${recommendEdgeUrl}';
          }, 1);
        }`,
        }}
      ></script>
    );
  };
  render() {
    const { redirectIEToEdge } = this;
    return (
      <Html lang="ko">
        <Head>
          {/*<!-- Global site tag (gtag.js) - Google Analytics -->*/}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}',{page_path: window.location.pathname,});`,
            }}
          />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="theme-color" content="#ffffff" />
          {redirectIEToEdge()}
          <meta property="og:type" content="website" />
          {/* <meta property="og:url" content="https://staku.net/" /> */}
          {/* <meta property="og:site_name" content="Staku" /> */}
          <meta property="og:locale" content="ko-KR" />
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          {/* <meta name="twitter:site" content="@staku" /> */}
          {/* <meta name="twitter:site:id" content="@staku" /> */}
          {/* <meta name="twitter:creator" content="@staku" /> */}
          {/* <meta name="twitter:creator:id" content="@staku" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

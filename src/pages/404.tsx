import Error from "@/components/Error";
import Script from "next/script";
const NotFound = () => {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4780451799247980"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4780451799247980"
        data-ad-slot="3837492401"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="indexpagead">
        (adsbygoogle = window.adsbygoogle || []).push({});
      </Script>
      <Error message="Page not found!" />
    </>
  );
};

export default NotFound;

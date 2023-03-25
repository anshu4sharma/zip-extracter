import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Script from "next/script";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400 flex flex-col min-h-screen">
        <div className="grow">
          <Navbar />
          <div>
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
            {children}
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

"use client";

import Script from "next/script";
import { OPENAI_PIXEL_DEBUG, OPENAI_PIXEL_ID } from "@/lib/openaiPixel";

/** Loads the OpenAI (ChatGPT ads) pixel on every page. The snippet is OpenAI's, unchanged. */
export default function OpenAIPixel() {
  if (!OPENAI_PIXEL_ID) return null;

  return (
    <Script id="openai-pixel" strategy="afterInteractive">
      {`!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}",debug:${OPENAI_PIXEL_DEBUG}});`}
    </Script>
  );
}

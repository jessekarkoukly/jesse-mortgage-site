import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

// IndexNow tells Bing (and other IndexNow engines) which pages changed.
// The key file lives at /public/4696866b78ccafaeb8e9ec410c507a84.txt so the engines can verify ownership.
// This route sits under /admin, so the admin login protects it.
const KEY = "4696866b78ccafaeb8e9ec410c507a84";
const HOST = "jessekarkoukly.com";

export async function POST() {
  const urlList = (await sitemap()).map((e) => e.url);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  if (!res.ok && res.status !== 202) {
    return NextResponse.json({ error: `IndexNow returned ${res.status}` }, { status: 502 });
  }
  return NextResponse.json({ count: urlList.length });
}

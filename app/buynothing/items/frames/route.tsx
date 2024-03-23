/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { redirect } from "frames.js/core";

import { getAllItem } from "../../../../utils/supabase";

const frames = createFrames({
  basePath: "/buynothing/items/frames",
});

const handleRequest = frames(async (ctx) => {
  const items = await getAllItem();

  const pageIndex = Number(ctx.searchParams.pageIndex || 0);

  const totalPages = items?.length || 0;

  if (ctx.pressedButton?.action === "post_redirect") {
    return redirect(process.env.NEXT_PUBLIC_WEBURL || "");
  }
    
  return {
    image: (
      <div tw="flex flex-col">
        <p>{items && items[pageIndex].title}</p>
        <img width={300} height={200} src={items && items[pageIndex].image_url} alt="Image" />
        <p>{items && items[pageIndex].detail}</p>
        <p>{items && items[pageIndex].location}</p>
        <div tw="flex">
          View {pageIndex + 1} / {totalPages}
        </div>
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={{
          query: { pageIndex: pageIndex === 0 ? totalPages - 1 : pageIndex - 1 },
        }}
      >
        ←
      </Button>,
      <Button action="post_redirect">Home</Button>,
      <Button
        action="post"
        target={{
          query: { pageIndex: (pageIndex + 1) % totalPages },
        }}
      >
        →
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

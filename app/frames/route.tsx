/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/",
});

const handleRequest = frames(async (ctx) => {
    
  return {
    image: (
      <div tw="w-full h-full bg-green-600 text-white justify-center items-center flex flex-col">
        <h1>Welocome to</h1>
        <p>Buy Nothing Frame</p>
      </div>
    ),
    buttons: [
      <Button action="post" target={`${process.env.NEXT_PUBLIC_WEBURL}/buynothing/items/frames`}>
        View Items
      </Button>,
      <Button action="link" target={process.env.NEXT_PUBLIC_WEBURL + "/buynothing/create"}>
        Post Item
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

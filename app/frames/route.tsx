/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/",
});

const handleRequest = frames(async (ctx) => {
    
  return {
    image: (
      <div tw="flex flex-col">
        <h1>Welocome to</h1>
        <p>Buy Nothing Frame</p>
      </div>
    ),
    buttons: [
      
      <Button action="post" target="/buynothing/items/frames">
        View Items
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

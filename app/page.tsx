import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "./debug";
import { currentURL } from "./utils";

type State = {
  active: string;
  total_button_presses: number;
};

const initialState = { active: "1", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : "1",
  };
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/");
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  console.log("info: state is:", state);

  // then, when done, return next frame
  return (
    <div className="p-4">
      {/* frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>{" "}
      or see{" "}
      <Link href="/examples" className="underline">
        other examples
      </Link> */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">Buy Nothing Frame</h1>
          <p>
            A platform designed to facilitate community connections through gifting and sharing on Warpcast
          </p>
          <div className="flex space-x-4 mt-4">
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              href="/buynothing/items"
            >
              View Items
            </Link>
            <Link
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              href="/buynothing/create"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>

      <FrameContainer
        postUrl="/buynothing/items"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {/* <FrameImage src="https://framesjs.org/og.png" /> */}
        <FrameImage aspectRatio="1.91:1">
          <div tw="w-full h-full bg-green-600 text-white justify-center items-center flex flex-col">
            <h1 tw="text-5xl">
              Welcome to 
            </h1>
            <h1 tw="text-7xl">
              Buy Nothing Frame
            </h1>
          </div>
        </FrameImage>
        <FrameButton>
          View Items
        </FrameButton>
        <FrameButton action="link" target={process.env.NEXT_PUBLIC_WEBURL + "/buynothing/create"}>
          Post Item
        </FrameButton>
      </FrameContainer>
    </div>
  );
}

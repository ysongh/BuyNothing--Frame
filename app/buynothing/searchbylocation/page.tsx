import {
  FrameButton,
  FrameInput,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { currentURL } from "../../utils";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "../../debug"
import { getItemsByLocation } from "../../../utils/supabase";

type State = {
  
};

const initialState: State = {  };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  // @ts-ignore
  const url = currentURL("/buynothing/item/" + params.id);
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

  const items = await getItemsByLocation(frameMessage?.inputText || "");

  // then, when done, return next frame
  return (
    <div>
      Search by location <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname="/buynothing/searchbylocation"
        postUrl="/buynothing/searchbylocation/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>Search by location</p>
              {frameMessage?.inputText ? frameMessage.inputText : ""}
              <p>{items && items[0]?.title}</p> 
              <p>{items && items[0]?.detail}</p>
              <p>{items && items[0]?.location}</p>
            </div>
          </div>
        </FrameImage>
        <FrameInput text="Enter location" />
        <FrameButton action="post">
          Find
        </FrameButton>
      </FrameContainer>
    </div>
  );
}

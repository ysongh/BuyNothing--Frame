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
import { currentURL } from "../../../utils";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "../../../debug";
import { getItemByID } from "../../../../utils/supabase";

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

  // @ts-ignore
  const item = await getItemByID(params.id);

  // then, when done, return next frame
  return (
    <div>
      Item: {item && item[0]?.title} <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname="/buynothing/item/[id]"
        postUrl="/buynothing/item/[id]/frames"
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
            <img
              src={item && item[0]?.image_url}
              alt="Item"
              style={{
                width: "300px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>{item && item[0]?.title}</p> 
              <p>{item && item[0]?.detail}</p>
              <p>{item && item[0]?.location}</p>
            </div>
          </div>
        </FrameImage>
        <FrameButton action="link" target={`https://www.google.com/maps/search/?api=1&query=${item && item[0]?.location}`}>
          See location on Google Map
        </FrameButton>
        <FrameButton action="post" target={`${process.env.NEXT_PUBLIC_WEBURL}/buynothing/item/${item && item[0]?.id}/delete`}>
          Delete
        </FrameButton>
      </FrameContainer>
    </div>
  );
}

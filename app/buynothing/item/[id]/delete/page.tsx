import {
  FrameButton,
  FrameContainer,
  FrameInput,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { currentURL } from "../../../../utils";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "../../../../debug";
import { getItemByID, deleteItemByID } from "../../../../../utils/supabase";

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
  const url = currentURL("/buynothing/item/[id]/delete");
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
  
  if (frameMessage?.inputText === "yes") {
    // @ts-ignore
    await deleteItemByID(params.id);
  }

  // then, when done, return next frame
  return (
    <div>
      This item is deleted <Link href={createDebugUrl(url)}>Debug</Link>
      <FrameContainer
        pathname="/buynothing/item/[id]/delete"
        postUrl="/buynothing/item/[id]/delete/frames"
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
            <p>This item#{params?.id} is deleted</p>
          </div>
        </FrameImage>
        <FrameButton action="post" target={`${process.env.NEXT_PUBLIC_WEBURL}/frames`}>
          Home
        </FrameButton>
      </FrameContainer>
    </div>
  );
}

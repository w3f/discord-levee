/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Verify from "../islands/Verify.tsx";

export default function Home() {
  const serverName = Deno.env.get("SERVER_NAME") ?? "NOT SET";
  const serverDesc = Deno.env.get("SERVER_DESC") ?? "NOT SET";
  const siteKey = Deno.env.get("SITE_KEY") ?? "NOT SET";
  const backgroundImage = Deno.env.get("BACKGROUND_IMG") ?? "";
  let bgPosition = "";

  if (backgroundImage == "dot-background.jpeg") {
    bgPosition = "flex flex-col justify-start items-start h-screen w-screen bg-[#000000] #000000  bg-cover";
  }
  else {
    bgPosition = "flex flex-col justify-start items-start h-screen w-screen bg-[#000000] #000000";
  }

  return (
    <div
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundColor: "#000000",
      }}
      className={tw`${bgPosition}`}
    >
      <div
        className={tw`flex flex-row justify-center items-center w-full h-screen z-10`}
      >
        <div
          class={`h-captcha ${tw`hidden`}`}
          id="captcha"
          data-sitekey={siteKey}
        ></div>
        <Verify title={serverName} description={serverDesc} />
      </div>
    </div>
  );
}

/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Verify from "../islands/Verify.tsx";

export default function Home() {
  const serverName = Deno.env.get("SERVER_NAME") ?? "NOT SET";
  const serverDesc = Deno.env.get("SERVER_DESC") ?? "NOT SET";
  const backgroundImage = Deno.env.get("BACKGROUND_IMG") ?? "";

  return (
    <div
      className={tw`flex flex-col justify-start items-start h-screen w-screen bg-[#202225] #2f3136`}
    >
      <div
        style={{
          clipPath: "ellipse(50% 99% at 33% 48%)",
          backgroundImage: `url('${backgroundImage}')`,
          backgroundColor: "#5765f2",
        }}
        className={tw`absolute flex flex-col justify-center items-end w-full h-screen max-w-screen-md drop-shadow-md`}
      ></div>
      <div
        className={tw`flex flex-row justify-end items-center w-full h-screen max-w-screen-md z-10`}
      >
        <Verify title={serverName} description={serverDesc} />
      </div>
    </div>
  );
}

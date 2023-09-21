import { HandlerContext } from "$fresh/server.ts";

const VERIFY_URL = "https://hcaptcha.com/siteverify";

const createInviteUrl = async (): Promise<string> => {
  const channelId = Deno.env.get("CHANNEL_ID");
  const discordSecret = Deno.env.get("DISCORD_SECRET");

  const channelOptions = {
    max_age: 60,
    max_uses: 1,
    temporary: false,
    unique: true,
  };

  const res = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/invites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${discordSecret}`,
      },
      body: JSON.stringify(channelOptions),
    }
  );

  if (res.ok) {
    const { code } = await res.json();
    return `https://discord.com/invite/${code}`;
  } else {
    console.error(res.status, res.statusText);
  }

  throw new Error("Unable to create invite");
};

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (req.method !== "POST") return new Response("Not Found", { status: 404 });

  const { response, key } = await req.json();

  if (response && key) {
    const params = new URLSearchParams();
    params.append("response", response);
    params.append("secret", Deno.env.get("H_SECRET") ?? "");

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const resBody = await res.json();

    if (res.ok && resBody.success) {
      try {
        const inviteLink = await createInviteUrl();
        console.log(inviteLink);
        return new Response(
          JSON.stringify({
            success: true,
            inviteLink,
          }),
          { status: 200 }
        );
      } catch {
        return new Response(JSON.stringify({ success: false }), {
          status: 500,
        });
      }
    } else {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
  }

  return new Response("Bad Request", { status: 400 });
};

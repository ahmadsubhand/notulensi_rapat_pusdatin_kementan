import type { Config, Context } from "@netlify/functions";
import type { Handler } from "@netlify/functions";
import ImageKit from "@imagekit/nodejs";

export const handler: Handler = async (event, context) => {
  try {
    const client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    })
    const authenticationParameters = client.helper.getAuthenticationParameters();

    return {
      body: JSON.stringify(authenticationParameters),
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    }
  } catch(error) {
    return {
      body: JSON.stringify(error),
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
    }
  }
}
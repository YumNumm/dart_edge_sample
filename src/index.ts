import { instantiate, invoke } from "./__dart/main.mjs";
import mod from "./__dart/main.wasm";
import { ExecutionContext } from "@cloudflare/workers-types";

export default {
  async fetch(
    request: Request,
    env: {},
    ctx: ExecutionContext
  ): Promise<Response> {
    let responseMessage: string;
    (globalThis as any).responseMessage = (message: string) => {
      responseMessage = message;
    };

    invoke(await instantiate(mod, async () => ({})));

    return new Response(responseMessage!);
  },
};

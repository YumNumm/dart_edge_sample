import { instantiate, invoke } from "./__dart/main.mjs";
import mod from "./__dart/main.wasm";
import { ExecutionContext } from "@cloudflare/workers-types";

export default {
  async fetch(
    request: Request,
    env: {},
    ctx: ExecutionContext,
  ): Promise<Response> {
    let responseMessage: string;
    const instance = await instantiate(mod, Promise.resolve({}));

    return new Promise((resolve) => {
      // Dart側で発生したPromiseをinvokeで受け持つことが現状できないので，このような作りにしています．
      invoke(instance);
      (globalThis as any).__js = {
        result(response: Response) {
          resolve(response);
        },
      };
    });
  },
};

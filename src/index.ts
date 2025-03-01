import type { ExecutionContext } from "@cloudflare/workers-types";
import { instantiate, invoke } from "./__dart/main.mjs";
import mod from "./__dart/main.wasm";

export default {
	async fetch(
		request: Request,
		env: never,
		ctx: ExecutionContext,
	): Promise<Response> {
		const dartInstance = await instantiate(mod);

		return new Promise((resolve) => {
			globalThis.__dart_cf_workers = {
				request: () => request,
				response: (res) => resolve(res),
				http: async (
					url: string,
					method: string,
					headers?: object,
					body?: string,
				) => {
					try {
						console.log("----- HTTP REQUEST (handled by JS Worker) -----");
						console.log({
							message: "Sending request",
							url,
							method,
							headers,
							body,
						});
						const res = await fetch(url, {
							method,
							body,
						});
						console.log({
							message: "Response received",
							status: res.status,
							headers: res.headers,
						});
						return res;
					} catch (e) {
						console.error(e);
						return {
							status: 500,
							body: e.message,
						};
					}
				},
			};
			dartInstance();
		});
	},
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// http://localhost:5173/

import { json } from "@remix-run/cloudflare";
import type {
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [
    { title: "Remix Drizzle Cloudflare D1 Vite" },
    {
      name: "description",
      content: "Welcome to Remix! Using Drizzle, Vite and Cloudflare D1!",
    },
  ];
};


export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Form method="POST">
        <div>
          <label>
            email: <input type="text" name="email" required />
          </label>
        </div>
        <div>
          <label>
            password: <input type="text" name="password" required />
          </label>
        </div>
        <button type="submit" name="_action" value={"add"}>
          Add Resource
        </button>
      </Form>

      <Form method="POST">
        <div>
          <label>
            id: <input type="text" name="id" />
          </label>
        </div>
        <button type="submit" name="_action" value={"delete"}>
          Delete Resource
        </button>
      </Form>
    </div>
  );
}

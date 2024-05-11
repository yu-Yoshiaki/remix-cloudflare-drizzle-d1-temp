/* eslint-disable @typescript-eslint/no-explicit-any */
// http://localhost:5173/

import { json } from "@remix-run/cloudflare";
import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { users } from "~/drizzle/schema.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Drizzle Cloudflare D1 Vite" },
    {
      name: "description",
      content: "Welcome to Remix! Using Drizzle, Vite and Cloudflare D1!",
    },
  ];
};

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  const cloudflare = context.cloudflare as any;

  if (action === "delete") {
    const id = Number(formData.get("id")); // Convert id to number
    const db = drizzle(cloudflare.env.DB);
    await db.delete(users).where(eq(users.id, id)).execute();
    return json({ message: "Resource deleted" }, { status: 200 });
  } else if (action === "add") {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const db = drizzle(cloudflare.env.DB);
    const exist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    if (exist.length > 0) {
      return json({ message: "Resource already exists" }, { status: 400 });
    }

    await db.insert(users).values({ email, password }).execute();

    return json({ message: "Resource added" }, { status: 201 });
  }
}
export async function loader({ context }: LoaderFunctionArgs) {
  const cloudflare = context.cloudflare as any;
  const db = drizzle(cloudflare.env.DB);

  const resourceList = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
    })
    .from(users)
    .orderBy(users.id);

  return json({
    resourceList,
  });
}

export default function Index() {
  const { resourceList } = useLoaderData<typeof loader>();
  const d = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {d?.message && <div>{d?.message}</div>}

      <div>
        <h2>Resources</h2>
        <ul>
          {resourceList.map((resource) => (
            <li key={resource.id}>
              {resource.id}: {resource.email} - {resource.password}
            </li>
          ))}
        </ul>
      </div>

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

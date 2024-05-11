import { Link } from "@remix-run/react";

const list = [
  { to: "/", label: "TOP" },
  { to: "/books/", label: "BOOKS" },
];

export const SideMenu = () => {
  return (
    <ul>
      {list.map((d) => {
        return (
          <li key={d.label}>
            <Link to={d.to}>{d.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

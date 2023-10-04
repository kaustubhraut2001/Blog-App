import React from "react";
import { useSelector } from "react-redux";
import {  Logo, LogoutButton } from "../index";
import {useNavigate , Link} from "react-router-dom";

const Header = () => {
  const authstatus = useSelector((state) => state.auth.authstatus);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      exact: true,
      active: authstatus,
    },
    {
      name: "Login",
      slug: "/login",
      exact: true,
      active: !authstatus,
    },
    {
      name: "Logout",
      slug: "/logout",
      exact: true,
      active: !authstatus,
    },
    {
      name: "ALL posts",
      slug: "/allposts",
      exact: true,
      active: authstatus,
    },
    {
      name: "Add Post",
      slug: "/addpost",
      exact: true,
      active: authstatus,
    },
  ];

  return (
    <header className="header">
      <container>
        <nav className="nav">
          <Link to="/">
            <Logo />
          </Link>
        </nav>

        <div>
          <ul>
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    onClick={() => {
                      navigate(items.slug);
                    }}
                  >
                    {items.name}
                  </button>
                </li>
              ) : null
            )}

            {authstatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>
      </container>
    </header>
  );
};

export default Header;

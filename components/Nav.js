"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
  const isUserLogin = true;

  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const [providers, setProviders] = useState(null);
  // const [session, setSession] = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <div className="flex-between w-full display mt-4 mb-16">
      <Link href={"/"} className="flex gap-2  flex-center">
        <Image
          className="object-contain rounded-full bg-black"
          alt="Prompt Logo"
          src="assets/images/logo.svg"
          width={35}
          height={35}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* DESKTOP */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex-row gap-2 flex">
            <Link href={"/create-prompt"}>
              <button className="black_btn ">Create Prompt</button>
            </Link>
            <button onClick={signOut} className="outline_btn ">
              Sign Out
            </button>

            <Link href={"/profile"} className="flex ml-3">
              <Image
                className="object-contain rounded-full bg-black"
                alt="Prompt Logo"
                src={session.user.image}
                width={35}
                height={35}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  signIn
                </button>;
              })}
          </>
        )}
      </div>

      {/* {alert(session?.user)} */}
      {/* Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;

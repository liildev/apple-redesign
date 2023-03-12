import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../store/features/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import {
  HiOutlineUser,
  HiOutlineMenuAlt4,
  HiOutlineShoppingBag,
} from "react-icons/hi";

export default function Header() {
  const items = useSelector(selectBasketItems);
  const { data: session } = useSession();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <button onClick={handleShow} className="block md:hidden">
        {show ? (
          <IoCloseSharp className="headerIcon" />
        ) : (
          <HiOutlineMenuAlt4 className="headerIcon" />
        )}
      </button>

      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-8 w-8 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image src="/logo.png" className="customImage" fill alt="Logo" />
          </div>
        </Link>
      </div>
      <ul className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
        {session ? (
          <a className="headerLink" onClick={() => signOut()}>
            Sign Out
          </a>
        ) : (
          <a className="headerLink" onClick={() => signIn()}>
            Sign In
          </a>
        )}
      </ul>

      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <IoSearchOutline className="headerIcon hidden md:block" />

        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}
            <HiOutlineShoppingBag className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <img
            src={session.user?.image || "/avatar.png"}
            alt="User"
            className="hidden h-[34px] w-[34px]  cursor-pointer rounded-full md:block"
          />
        ) : (
          <HiOutlineUser className="headerIcon hidden md:block" />
        )}
      </div>

      <div
        className={`menu ${show ? "left-0" : "-left-full"}`}
        onClick={() => setShow(false)}
      >
        <div className="mt-2 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search..."
            className="mr-3 w-full rounded-md bg-gray-300 p-1.5"
          />
          {session ? (
            <Image
              src={session.user?.image || "/avatar.png"}
              alt="Avatar"
              className="cursor-pointer rounded-full"
              width={40}
              height={40}
            />
          ) : (
            <HiOutlineUser className="headerIcon" />
          )}
        </div>

        <ul
          className="flex cursor-pointer flex-col
    items-start divide-y border-gray-300"
        >
          <a className="menuLink">Product</a>
          <a className="menuLink">Explore</a>
          <a className="menuLink">Support</a>
          <a className="menuLink">Business</a>
          {session ? (
            <a className="menuLink" onClick={() => signOut()}>
              Sign Out
            </a>
          ) : (
            <a className="menuLink" onClick={() => signIn()}>
              Sign In
            </a>
          )}
        </ul>
      </div>
    </header>
  );
}

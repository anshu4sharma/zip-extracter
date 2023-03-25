import { Disclosure } from "@headlessui/react";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const leftmenu = [
    {
      label: "Home",
      href: "/",
    },
  ];

  const rightmenu = [
    {
      label: "Tic Tac Toe",
      href: "/tictac",
    },
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {leftmenu.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="https://anshusharma.me/" target="_blank" className="w-full dark:hidden">
                    <Image
                      width={150}
                      height={100}
                      alt="logo"
                      src={"/images/logo.png"}
                    />
                  </Link>
                  <Link href="https://anshusharma.me/" target="_blank" className="hidden dark:block">
                    <Image
                      width={150}
                      height={100}
                      className="invert"
                      alt="logo"
                      src={"/images/logo.png"}
                    />
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 "
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                  {rightmenu.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    >
                      <span> {item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}
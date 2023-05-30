/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useActualModal, useModal } from "~/utils/modalCtx";
import SupportModal from "./SupportModal";


const NavBar: React.FC = () => {
  const session = useSession();
  const [displayUserActions, setDisplayUserActions] = useState(false);
  const [displayAdminActions, setDisplayAdminActions] = useState(false);
  const [signInOut, setSignInOut] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const router = useRouter();
  const setEmailModal = useModal();
  const setActualDisplay = useActualModal();

  useEffect(() => {
    const closeModals = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.className.includes("drop-d")
      )
        return;
      setDisplayAdminActions(false);
      setDisplayUserActions(false);
    };
    document.addEventListener("click", closeModals);
    return () => {
      document.removeEventListener("click", closeModals);
    };
  }, []);

  return (
    <nav className="shadowStuff fixed z-[9998] flex h-[100px] w-full items-center justify-between bg-[#2B2939] p-3 px-12">
      <button
        className="transition-transform hover:scale-[1.01]"
        onClick={() => {
          if (router.pathname === "/") {
            router.reload();
          } else {
            router.replace("/");
          }
        }}
      >
        <div className="flex items-center align-middle">
          <img
            src="/geenie.png"
            alt="logo"
            className="mt-[-15px] mr-[10px] h-[50px] w-min "
          />
          <h1 className="text-3xl font-semibold text-white">Reviews</h1>
        </div>
      </button>
      <div className="mx-3 flex items-center gap-4">
        {supportModal ? (
          <SupportModal setSupportModal={setSupportModal} />
        ) : null}
        {session.status === "loading" || signInOut ? (
          <>
            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
          </>
        ) : session.status === "authenticated" ? (
          <>
            {session.data?.user.role === "ADMIN" ? (
              <span className="relative">
                <button
                  onClick={() => {
                    let newValue = !displayAdminActions;
                    setDisplayAdminActions((prev) => {
                      newValue = !prev;
                      return !prev;
                    });
                    if (newValue) {
                      setDisplayUserActions(false);
                    }
                  }}
                  className="drop-d text-sm font-bold text-white sm:text-lg"
                >
                  Admin
                </button>
                {displayAdminActions ? (
                  <div className="absolute top-10 right-3 flex flex-col items-center gap-1 rounded-md bg-white p-3 shadow-md">
                    <Link href="/us/question">Modify</Link>
                    <span className="h-px w-full bg-[#2B2939]" />
                    <Link href="/us/users">Users</Link>
                  </div>
                ) : null}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12L0 1L5.5 6L9 0L12.5 6L18 1L16 12H2ZM16 15C16 15.6 15.6 16 15 16H3C2.4 16 2 15.6 2 15V14H16V15Z"
                  fill="#FFAF12"
                />
              </svg>
              <Link
                href="/subscriptions"
                className="text-sm font-bold text-white sm:text-lg"
              >
                Upgrade
              </Link>
            </div>
            <button
              onClick={() => setSupportModal(true)}
              className="text-sm font-bold text-white sm:text-lg"
            >
              Support
            </button>
            <Link
              href="/reports"
              className="text-sm font-bold text-white sm:text-lg"
            >
              Reports History
            </Link>

            {session?.data?.user?.image ? (
              <img
                src={session.data.user.image}
                alt="user"
                className="h-12 w-12 rounded-full"
              />
            ) : null}
            <p className="text-sm font-bold text-white sm:text-lg">
              {session?.data?.user?.name}
            </p>
            <button
              onClick={() => {
                let newValue = !displayUserActions;
                setDisplayUserActions((prev) => {
                  newValue = !prev;
                  return !prev;
                });
                if (newValue) {
                  setDisplayAdminActions(false);
                }
              }}
              className="drop-d -ml-2 w-[1rem] text-2xl font-bold text-white"
            >
              {displayUserActions ? "-" : "+"}
            </button>
            {displayUserActions ? (
              <div className="absolute top-20 right-12 rounded-md bg-white shadow-md">
                <button
                  className="p-2"
                  onClick={() => {
                    setSignInOut(true);
                    void signOut().catch(() => setSignInOut(false));
                  }}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <button
            onClick={() => {
              setActualDisplay(true);
              setEmailModal("simple");
            }}
            className="text-sm font-bold text-white sm:text-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
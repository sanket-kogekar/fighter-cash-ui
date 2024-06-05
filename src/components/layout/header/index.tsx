// import { useState, useEffect } from "react";
import { Wrapper } from "./index.styled";
import Link from "next/link";
import HeaderBtn from "@/components/ui/headerBtn";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppContext } from "@/context/AppContext";
import ToggleNav from "@/components/ui/toggleNav";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const { isToggled, setToggled } = useAppContext();
  // const [hasConnected, setHasConnected] = useState(false);

  // useEffect(() => {
  //   if (hasConnected) {
  //     window.location.reload();
  //   }
  // }, [hasConnected]);

  return (
    <>
      <Wrapper>
        <Link href="https://docs.google.com/document/d/17DAZQjoCPPnzbFb-TR_-xw4LARPxZGLzBSibnY4UMq4/edit?usp=sharing">
          Rules & Guidelines
        </Link>
        <Link href="https://docs.google.com/document/d/1nkn5Z1-bu9iTbwDDt8DxwckedKGid52YbqdOeBL_9pM/edit?usp=sharing">
          Terms & Conditions
        </Link>
        <div className="connect-btn">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              // useEffect(() => {
              //   if (connected) {
              //     setHasConnected(true);
              //   }
              // }, [connected]);

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <HeaderBtn
                          title="Connect Wallet"
                          onClick={openConnectModal}
                        />
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <HeaderBtn
                          title="Wrong network"
                          onClick={openChainModal}
                        />
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <HeaderBtn
                          avatar={
                            chain.iconUrl && (
                              <Image
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                width={24}
                                height={24}
                              />
                            )
                          }
                          title={chain.name}
                          onClick={openChainModal}
                        />
                        <HeaderBtn
                          title={`${account.displayName}${
                            account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ""
                          }`}
                          onClick={openAccountModal}
                        />
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
        <div className="hamburger" onClick={() => setToggled(!isToggled)}>
          <HiOutlineMenu size={36} />
        </div>
      </Wrapper>
      {isToggled && <ToggleNav />}
    </>
  );
};

export default Navbar;

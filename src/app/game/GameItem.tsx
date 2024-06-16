import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useContractContext } from "@/context/ContracProvider";
import CompeteItem from "@/components/ui/compete";
import { useAccount } from "wagmi";
import { Zoom, toast } from "react-toastify";
import Link from "next/link";

const competesList: CompeteList[] = [
  [
    {
      name: "Conor McGregor",
      src: "https://lezetomedia.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/05/09191713/Conor-McGregor-Net-Worth-scaled.jpg",
      num: 1,
    },
    {
      name: "Michael Chandler",
      src: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2022/05/michael-chandler-ufc-274-ceremonial-weigh-ins.jpg",
      num: 2,
    },
  ],
  [
    {
      name: "Jake Paul",
      // src: "https://cdn.cnn.com/cnnnext/dam/assets/200131120529-jake-paul-logan-paul-super-tease.jpg",
      // src: "https://www.sportsunfold.com/wp-content/uploads/2022/07/pasted-image-0-2022-07-02T134401.378.png",
      src: "https://mmainsight.com/wp-content/uploads/2021/07/jake-paul-boxing-696x464.jpg",
      num: 1,
    },
    {
      name: "Mike Tyson",
      src: "https://www.cheatsheet.com/wp-content/uploads/2021/04/mike-tyson-9.jpg",
      num: 2,
    },
  ],
  // [
  //   {
  //     name: "Khamzat Chimaev",
  //     src: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2019/09/chimaev-khamzat-1.jpeg?resize=640",
  //     num: 1,
  //   },
  //   {
  //     name: "Robert Whittaker",
  //     src: "https://images.tapology.com/letterbox_images/17398/default/robert-whittaker-rising-to-the-top-interview-melbourne-112416_613229_OpenGraphImage.jpg",
  //     num: 2,
  //   },
  // ],
];

const GameItem: React.FC = () => {
  // const twitterUrl = ;
  const [chainBalance, setBalance] = useState<number>(0);

  const { isConnected, address, chainId, chain } = useAccount();

  const { usdcContract, gameContract, gameContract2, gameContract3 } =
    useAppContext();
  const { setConnect } = useContractContext();

  useEffect(() => {
    if (isConnected) {
      getBalance();
    } else {
      setBalance(0);
    }
    setConnect(isConnected);
  }, [isConnected, address!, chainId, usdcContract]);

  /**
   * @function getBalance
   * @param adress: user
   * @returns none
   */
  const getBalance = async () => {
    if (!usdcContract)
      return toast("🔊 Again connect wallet!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });

    const chainResult = await usdcContract.balanceOf(address!);
    setBalance(chainResult.toNumber() / 10 ** 6);
  };

  return (
    <div className="main">
      <div className="account-part">
        <div className="state">
          <p>
            Account status: <span className="led"></span>
            <span className="state-bold">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </p>
          <div className="chain-part">
            <p>
              Chain:
              <span className="state-bold">{`${
                chain == undefined ? "" : chain.name
              } (${chainId})`}</span>
            </p>
            <br />
            <b>
              <p
                // className="balance"
                style={{ color: "red", fontSize: "22px" }}
              >{`[ Connect To Base / Polygon Chain if you haven't ]`}</p>
            </b>
            <br />
          </div>
          <p className="balance">
            Your USDC Balance:{" "}
            <span className="state-bold">{chainBalance}</span>
          </p>
        </div>
      </div>
      <br />
      <p style={{ fontSize: "32px" }}>
        <b>Active Bets [ Minimum: 1 USDC ]</b>
      </p>
      <p style={{ fontSize: "22px" }}>
        {" "}
        In case amounts look incorrect after changing network, just refresh!{" "}
      </p>
      <div className="compete-part">
        {/* {competesList.map((item: Compete[], index: number) => (
          // @ts-ignore
          <CompeteItem
            data={item}
            key={index}
            chainBalance={chainBalance}
            getBalance={getBalance}
            gameContract={
              index == 0
                ? gameContract
                : index == 1
                ? gameContract2
                : gameContract3
            }
          />
        ))} */}
        {competesList[0] && (
          <CompeteItem
            data={competesList[0]}
            key={1}
            chainBalance={chainBalance}
            getBalance={getBalance}
            gameContract={gameContract}
          />
        )}
        {competesList[1] && (
          <CompeteItem
            data={competesList[1]}
            key={2}
            chainBalance={chainBalance}
            getBalance={getBalance}
            gameContract={gameContract2}
          />
        )}
        {/*{competesList[2] && (
          <CompeteItem
            data={competesList[2]}
            key={3}
            chainBalance={chainBalance}
            getBalance={getBalance}
            gameContract={gameContract}
          />
        )} */}
      </div>
      {/* <Link href=`${https://twitter.com/intent/tweet?text=${encodeURIComponent("Love watching boxing or MMA fights? You can earn by predicting who will win. Visit Fighter.Cash and bet with USDC.")}`>
        Share the site with fight enthusiasts to increase the pot
      </Link> */}
      <Link
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          "Love watching boxing or MMA fights? You can earn by predicting who wins. Visit Fighter.Cash and bet with USDC."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Share the site with fight enthusiasts to increase the pot
      </Link>
    </div>
  );
};

export default GameItem;

//
//
//

// import React, { useState, useEffect } from "react";
// import { useAppContext } from "@/context/AppContext";
// import { useContractContext } from "@/context/ContracProvider";
// import CompeteItem from "@/components/ui/compete";
// import { useAccount } from "wagmi";
// import { Zoom, toast } from "react-toastify";

// const competesList: CompeteList[] = [
//   [
//     {
//       name: "Jack Paul",
//       src: "https://lezetomedia.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/05/09191713/Conor-McGregor-Net-Worth-scaled.jpg",
//       num: 1,
//     },
//     {
//       name: "Mike Tyson",
//       src: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2022/05/michael-chandler-ufc-274-ceremonial-weigh-ins.jpg",
//       num: 2,
//     },
//   ],
//   // Other competitors...
// ];

// const GameItem: React.FC = () => {
//   const [chainBalance, setBalance] = useState<number>(0);

//   const { isConnected, address, chainId, chain } = useAccount();
//   const { usdcContract } = useAppContext();
//   const { setConnect } = useContractContext();

//   useEffect(() => {
//     if (isConnected) {
//       getBalance();
//     } else {
//       setBalance(0);
//     }
//     setConnect(isConnected);
//   }, [isConnected, address, chainId, usdcContract]);

//   /**
//    * @function getBalance
//    * @returns none
//    */
//   const getBalance = async () => {
//     if (!usdcContract) {
//       return toast("🔊 Again connect wallet!", {
//         position: "top-left",
//         autoClose: 5000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Zoom,
//       });
//     }

//     const chainResult = await usdcContract.balanceOf(address!);
//     setBalance(chainResult.toNumber() / 10 ** 6);
//   };

//   const switchToPolygon = async () => {
//     try {
//       await window.ethereum.request({
//         method: "wallet_addEthereumChain",
//         params: [
//           {
//             chainId: "0x89", // Hexadecimal for 137 (Polygon)
//             chainName: "Polygon Mainnet",
//             nativeCurrency: {
//               name: "MATIC",
//               symbol: "MATIC",
//               decimals: 18,
//             },
//             rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
//             blockExplorerUrls: ["https://polygonscan.com/"],
//           },
//         ],
//       });
//     } catch (switchError) {
//       if (switchError.code === 4902) {
//         toast.error(
//           "Polygon network is not available in your MetaMask. Please add it manually."
//         );
//       } else {
//         console.error(switchError);
//       }
//     }
//   };

//   return (
//     <div className="main">
//       <div className="account-part">
//         <div className="state">
//           <p>
//             Account status: <span className="led"></span>
//             <span className="state-bold">
//               {isConnected ? "Connected" : "Disconnected"}
//             </span>
//           </p>
//           <div className="chain-part">
//             <p>
//               Chain:
//               <span className="state-bold">{`${
//                 chain == undefined ? "" : chain.name
//               } (${chainId})`}</span>
//             </p>
//             <p className="balance">
//               [ Switch To Polygon Network if you haven't ]
//             </p>
//             <button onClick={switchToPolygon}>Switch to Polygon</button>
//           </div>
//           <p className="balance">
//             Your USDC Balance:{" "}
//             <span className="state-bold">{chainBalance}</span>
//           </p>
//         </div>
//       </div>
//       <div className="compete-part">
//         {competesList.map((item: Compete[], index: number) => (
//           <CompeteItem
//             data={item}
//             key={index}
//             chainBalance={chainBalance}
//             getBalance={getBalance}
//           />
//         ))}
//       </div>
//       <p className="share-text">
//         Share the site with fight enthusiasts to increase the pot
//       </p>
//     </div>
//   );
// };

// export default GameItem;

//
//
//
//

// import React, { useState, useEffect } from "react";
// import { useAppContext } from "@/context/AppContext";
// import { useContractContext } from "@/context/ContracProvider";
// import CompeteItem from "@/components/ui/compete";
// import { useAccount, useNetwork, useSwitchNetwork, } from "wagmi";
// import { Zoom, toast } from "react-toastify";

// const competesList: CompeteList[] = [
//   [
//     {
//       name: "Jack Paul",
//       src: "https://lezetomedia.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/05/09191713/Conor-McGregor-Net-Worth-scaled.jpg",
//       num: 1,
//     },
//     {
//       name: "Mike Tyson",
//       src: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2022/05/michael-chandler-ufc-274-ceremonial-weigh-ins.jpg",
//       num: 2,
//     },
//   ],
//   // Other competitors...
// ];

// const GameItem: React.FC = () => {
//   const [chainBalance, setBalance] = useState<number>(0);

//   const { isConnected, address } = useAccount();
//   const { chain } = useNetwork();
//   const { switchNetwork } = useSwitchNetwork();

//   const { usdcContract } = useAppContext();
//   const { setConnect } = useContractContext();

//   useEffect(() => {
//     if (isConnected) {
//       getBalance();
//     } else {
//       setBalance(0);
//     }
//     setConnect(isConnected);
//   }, [isConnected, address, usdcContract]);

//   /**
//    * @function getBalance
//    * @returns none
//    */
//   const getBalance = async () => {
//     if (!usdcContract) {
//       return toast("🔊 Again connect wallet!", {
//         position: "top-left",
//         autoClose: 5000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Zoom,
//       });
//     }

//     const chainResult = await usdcContract.balanceOf(address!);
//     setBalance(chainResult.toNumber() / 10 ** 6);
//   };

//   const switchToPolygon = async () => {
//     try {
//       switchNetwork?.(137); // Polygon Mainnet chain ID
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to switch network. Please try again.");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="account-part">
//         <div className="state">
//           <p>
//             Account status: <span className="led"></span>
//             <span className="state-bold">
//               {isConnected ? "Connected" : "Disconnected"}
//             </span>
//           </p>
//           <div className="chain-part">
//             <p>
//               Chain:
//               <span className="state-bold">{`${chain?.name || ""} (${
//                 chain?.id || ""
//               })`}</span>
//             </p>
//             <p className="balance">
//               [ Switch To Polygon Network if you haven't ]
//             </p>
//             <button onClick={switchToPolygon}>Switch to Polygon</button>
//           </div>
//           <p className="balance">
//             Your USDC Balance:{" "}
//             <span className="state-bold">{chainBalance}</span>
//           </p>
//         </div>
//       </div>
//       <div className="compete-part">
//         {competesList.map((item: Compete[], index: number) => (
//           <CompeteItem
//             data={item}
//             key={index}
//             chainBalance={chainBalance}
//             getBalance={getBalance}
//           />
//         ))}
//       </div>
//       <p className="share-text">
//         Share the site with fight enthusiasts to increase the pot
//       </p>
//     </div>
//   );
// };

// export default GameItem;

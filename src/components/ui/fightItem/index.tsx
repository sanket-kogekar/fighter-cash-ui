import React, { useState } from "react";
import { Wrapper } from "./index.styled";
import Image from "next/image";
import InputBox from "../inputBox";
import MainBtn from "../mainBtn";
import { useAppContext } from "@/context/AppContext";
import { Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";

const FightItem = ({
  src,
  gain,
  num,
  name,
  totalBetAmount,
  chainBalance,
  getInitialData,
  getTotalBetData,
  getGain,
  getBalance,
  gameContract,
}: FightItemType) => {
  const [amount, setAmount] = useState<number>(0);
  const [isApprove, setApprove] = useState<boolean>(true);

  const { address } = useAccount();

  const {
    usdcContract,
    // gameContract
  } = useAppContext();

  /**
   * @function handleApprove
   * @param name
   * @returns none
   */
  const handleApprove = async () => {
    if (!usdcContract && !gameContract)
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

    try {
      const approveResult: any = await usdcContract.approve(
        gameContract.address,
        amount * 10 ** 6
      );
      const receipt: boolean = await approveResult.wait();
      if (receipt) {
        setApprove(!isApprove);
        getInitialData();
        getTotalBetData();
        getGain();
      } else {
        toast("🔊 This transaction is failed!", {
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
      }
    } catch (error: any) {
      if (error) {
        toast("🔊 Let's try again transaction!", {
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
      }
    }
  };

  /**
   * @function handlebet
   * @param name
   * @returns none
   */
  const handleBet = async () => {
    console.log("gameContractgameContract:", gameContract);
    if (!gameContract)
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
    console.log(
      "gameContractgameContract:",
      amount * 10 ** 6,
      amount!,
      gameContract
    );

    try {
      const betResult = await gameContract.placeBet(
        num,
        amount * 10 ** 6
        // amount!
      );
      // const betResult: any = await gameContract.placeBet(num, amount);
      const receipt: boolean = await betResult.wait();

      if (receipt) {
        setApprove(!isApprove);
        getInitialData();
        getBalance();
        getTotalBetData();
        getGain();
        setAmount(0);
      } else {
        toast("🔊 This transaction is failed!", {
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
      }
    } catch (error: any) {
      if (error) {
        toast("🔊 Let's try again transaction!", {
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
      }
    }
  };

  /**
   * @name handleWithdraw
   * @param name
   * @returns none
   */
  const handleWithdraw = async () => {
    console.log("Click the With Draw!");
    if (!gameContract)
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

    try {
      const betResult = await gameContract.withdrawReward();
      const receipt: boolean = await betResult.wait();

      if (receipt) {
        setApprove(!isApprove);
        getInitialData();
        getBalance();
        getTotalBetData();
        getGain();
      } else {
        toast("🔊 This transaction is failed!", {
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
      }
    } catch (error: any) {
      if (error) {
        toast("🔊 Let's try again transaction!", {
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
      }
    }
  };

  return (
    <Wrapper>
      <div className="game-control">
        <div className="fighter-info">
          <p className="fighter-name" style={{ fontSize: "25px" }}>
            <b>{name}</b>
          </p>
          <Image
            src={src}
            alt="Fighter Image (temporary removed)"
            width={340}
            height={260}
            style={{ borderRadius: "20px" }}
          />
        </div>
        <div className="setting">
          <InputBox
            amount={amount}
            setAmount={setAmount}
            chainBalance={chainBalance}
          />
          {isApprove ? (
            <MainBtn
              title="Approve USDC to place bet"
              $width="270px"
              onClick={handleApprove}
            />
          ) : (
            <MainBtn
              title={`Place Bet on ${name}`}
              $width="270px"
              onClick={handleBet}
            />
          )}
          <span style={{ fontSize: "18px" }}>
            [ Minimum Bet Allowed: <b>10 USDC</b> ]
          </span>
          <p style={{ fontSize: "20px" }}>
            Your total bet amount:{" "}
            <span>
              <b>{`$${totalBetAmount}`}</b>
            </span>
          </p>
          {/* <MainBtn
            title={`Withdraw Rewards`}
            $width="270px"
            onClick={() => handleWithdraw}
          /> */}
        </div>
      </div>
      {/* <div className="bonus"> */}
      {/* <p style={{ fontSize: "18px" }}>
          Your total bet amount: <span>{`$${totalBetAmount}`}</span>
        </p> */}
      {/* <p style={{ fontSize: "18px" }}>
          Potential gains if you win:{" "}
          <span>{`$${gain > 1 ? gain / 10 ** 6 : gain}`}</span>
        </p>
        <span
          style={{ color: "green", fontSize: "20px" }}
        >{` [ check back later ]`}</span> */}
      {/* </div> */}
    </Wrapper>
  );
};

export default FightItem;

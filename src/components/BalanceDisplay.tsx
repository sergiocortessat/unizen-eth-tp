import React from "react";
import Loader from "../app/loading";
import Link from "next/link";
import { getCurrentDateFormatted } from "../utils";
import TransitionFrame from "./TransitionFrame";

type BalanceDisplayProps = {
  stakingBalance: number;
  nativeBalance: number;
  tokenBalance: {
    balance: number;
    symbol: string;
  };
  loading: boolean;
  validAddress: { verifiedAddress: string; urlAddress: string };
};

const BalanceDisplay = ({
  stakingBalance,
  nativeBalance,
  tokenBalance,
  loading,
  validAddress,
}: BalanceDisplayProps) => {
  const { balance, symbol } = tokenBalance;
  const { verifiedAddress, urlAddress } = validAddress;

  if (loading) {
    return <Loader />;
  }

  if (!verifiedAddress) {
    return (
      <TransitionFrame className="md:mt-24 mt-10">
        <h2 className="text-4xl font-bold text-center text-blackTitle">
          <p className="mb-2">To start checking your balances,</p>
          <p>please enter your wallet address!</p>
        </h2>
      </TransitionFrame>
    );
  }
  return (
    <TransitionFrame className={"md:mt-20 mt-10"}>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="stats shadow flex flex-col md:flex-row lg:flex-row xl:flex-row">
          {[
            {
              label: "Staking Balance",
              value: stakingBalance,
            },
            {
              label: "Native Balance",
              value: `${nativeBalance} ETH`,
            },
            {
              label: "Rocket Pool Token Balance",
              value: `${balance} ${symbol}`,
            },
          ].map((item, index) => (
            <div
              className="stat place-items-center"
              key={`${item.label}-${index}`}
            >
              <div className="stat-title">{item.label}</div>
              <div className="stat-value"><p className="text-2xl md:text-2xl">{item.value}</p></div>
            </div>
          ))}
        </div>
        <div className="stats shadow max-w-2 flex flex-col md:flex-row lg:flex-row xl:flex-row">
          <div className="stat">
            <div className="stat-title">Checked at</div>
            <div className="stat-desc">{getCurrentDateFormatted()}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Wallet Address:</div>
            <Link
              href={urlAddress}
              className="underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit text-xs sm:text-sm md: text-md lg:text-lg xl:text-lg"
              target="_blank"
            >
              {verifiedAddress}
            </Link>
          </div>
        </div>
      </div>
    </TransitionFrame>
  );
};

export default BalanceDisplay;

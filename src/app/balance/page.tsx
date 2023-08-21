"use client";

import React from "react";
import BalanceDisplay from "../components/BalanceDisplay";
import InputForm from "../components/UI/InputForm";
import GetBalanceHook from "../Hooks/GetBalanceHooks";

const BalancePage = () => {
  const {
    address,
    stakingBalance,
    nativeBalance,
    tokenBalance,
    loading,
    handleSubmit,
    handleInputChange,
    validAddress,
    error,
  } = GetBalanceHook();

  return (
    <div className="container">
      <h1 className="text-3xl font-semibold mb-10">
        Rocket Pool Balance Checker
      </h1>
      <InputForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        address={address}
        error={error}
      />
      <BalanceDisplay
        stakingBalance={stakingBalance}
        nativeBalance={nativeBalance}
        tokenBalance={tokenBalance}
        loading={loading}
        validAddress={validAddress}
      />
    </div>
  );
};

export default BalancePage;

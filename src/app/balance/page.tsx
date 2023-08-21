"use client";

import React from "react";
import BalanceDisplay from "../../components/BalanceDisplay";
import InputForm from "../../components/InputForm";
import {useGetBalance} from '../../hooks/useGetBalance'

const BalancePage = () => {
  const {
    balance,
    loading,
    fetchBalances,
    validAddress,
    error,
  } = useGetBalance();

  return (
    <div className="container">
      <h1 className="text-3xl font-semibold mb-10">
        Rocket Pool Balance Checker
      </h1>
      <InputForm
        handleSubmit={fetchBalances}
        error={error}
      />
      <BalanceDisplay
        stakingBalance={balance.stakingBalance}
        nativeBalance={balance.nativeBalance}
        tokenBalance={balance.tokenBalance}
        loading={loading}
        validAddress={validAddress}
      />
    </div>
  );
};

export default BalancePage;

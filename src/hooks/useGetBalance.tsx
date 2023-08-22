import { useState } from "react";
import {
  fetchStakingBalance,
  fetchNativeBalance,
  fetchTokenBalance,
  validatedAddress,
} from "../ether";
import { validateAddress } from "../utils";

export const useGetBalance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validAddress, setValidAddress] = useState({
    verifiedAddress: "",
    urlAddress: "",
  });
  const [error, setError] = useState<string>("");
  const [balance, setBalance] = useState({
    stakingBalance: 0,
    nativeBalance: 0,
    tokenBalance: { balance: 0, symbol: "" },
  });

  const setErrorWithTimeout = (errorMsg: string, timeout: number = 2000) => {
    setError(errorMsg);
    setTimeout(() => {
      setError("");
    }, timeout);
  };

  const fetchBalances = async (address: string) => {
    setLoading(true);

    try {
      if (!address) {
        throw new Error("Address not provided");
      }

      validateAddress(address);

      const [stakingBal, nativeBal, tokenBal] = await Promise.all([
        fetchStakingBalance(address),
        fetchNativeBalance(address),
        fetchTokenBalance(address),
      ]);

      setBalance({
        stakingBalance: stakingBal,
        nativeBalance: nativeBal,
        tokenBalance: tokenBal,
      });
      setValidAddress(validatedAddress(address));
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === "Address not provided" ||
          error.message === `Invalid 'address' parameter '${address}'.`
        ) {
          setErrorWithTimeout(error.message);
        } else {
          console.error("Error fetching balances:", error);
          setError("Error fetching balances");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { balance, loading, fetchBalances, validAddress, error };
};

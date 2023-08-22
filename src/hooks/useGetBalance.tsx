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

  // move or chewck the set error
  //   const fetchBalances = async (address: string) => {
  //     if (!address) {
  //       setError("Address not provided");
  //       const temp = setTimeout(() => {
  //         setError("");
  //       }, 2000);
  //       temp && clearTimeout;
  //       return;
  //     }

  //     try {
  //       validateAddress(address);
  //     } catch (e) {
  //       setError("Invalid address");
  //       const temp = setTimeout(() => {
  //         setError("");
  //       }, 2000);
  //       temp && clearTimeout;
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       setError("");

  //       const [stakingBal, nativeBal, tokenBal] = await Promise.all([
  //         fetchNativeBalance(address),
  //         fetchStakingBalance(address),
  //         fetchTokenBalance(address),
  //       ]);
  //       const validAddress = validatedAddress(address);

  //       setBalance({
  //         stakingBalance: stakingBal,
  //         nativeBalance: nativeBal,
  //         tokenBalance: tokenBal,
  //       });
  //       setValidAddress(validAddress);
  //     } catch (error) {
  //       console.error("Error fetching balances:", error);
  //       setError("Error fetching balances");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

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
        fetchNativeBalance(address),
        fetchStakingBalance(address),
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

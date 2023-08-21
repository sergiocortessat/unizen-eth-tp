import { Suspense, useState } from "react";
import { fetchStakingBalance, fetchNativeBalance, fetchTokenBalance, validatedAddress } from '../../utils/etherUtils';
import {isAddress} from "../../utils/utilsTools";
import Loader from "../loading";

export const useFetchBalances = (address: string) => {
    const [stakingBalance, setStakingBalance] = useState<number>(0);
    const [nativeBalance, setNativeBalance] = useState<number>(0);
    const [tokenBalance, setTokenBalance] = useState({balance: 0, symbol: ""});
    const [loading, setLoading] = useState<boolean>(false);
    const [validAddress, setValidAddress] = useState({verifiedAddress: "", urlAddress: ""});
    const [error, setError] = useState<string>(""); // <-- Added error state


    const fetchBalances = async () => {
        if (!address) {
            setError("Address not provided");
            return;
        }

        if (!isAddress(address)) {
            setError("Invalid address");
            return; //
        }
        setLoading(true);
        try {
            setError(""); 
            const stakingBal = await fetchStakingBalance(address);
            const nativeBal = await fetchNativeBalance(address);
            const tokenBal = await fetchTokenBalance(address);
            const validAddress = validatedAddress(address)
            
            setStakingBalance(stakingBal);
            setNativeBalance(nativeBal);
            setTokenBalance(tokenBal);
            setValidAddress(validAddress)
        } catch (error) {
            console.error("Error fetching balances:", error);
            setError("Error fetching balances");
        } finally {
            setError("");
            setLoading(false);
        }
    }

    return { stakingBalance, nativeBalance, tokenBalance, loading, fetchBalances, validAddress, error, setError };
}

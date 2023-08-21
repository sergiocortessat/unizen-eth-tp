import React, { useState } from "react";
import { useFetchBalances } from './UseFetchBalances';

const GetBalanceHook = () => {
    const [address, setAddress] = useState<string>("");
    const {
        stakingBalance,
        nativeBalance,
        tokenBalance,
        loading,
        fetchBalances,
        validAddress,
        error,
        setError,
    } = useFetchBalances(address);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetchBalances();
        setAddress("")
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setError("")
        setAddress(value);
    };

    return {
        address,
        stakingBalance,
        nativeBalance,
        tokenBalance,
        loading,
        handleSubmit,
        handleInputChange,
        validAddress,
        error,
    };
};

export default GetBalanceHook;

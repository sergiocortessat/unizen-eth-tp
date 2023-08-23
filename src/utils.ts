import { ethers, BigNumber, Contract, ContractInterface } from "ethers";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { JsonRpcProvider } from "@ethersproject/providers";
import { format } from "date-fns";

// Utility functions

export function formatToDecimals(value: BigNumber | number): any {
  const decimals: number = 4;
  const valueNum: number = parseFloat(ethers.utils.formatEther(value));
  if (valueNum === 0) return 0;
  if (valueNum < 0.0001 || valueNum >= 100000000)
    return parseFloat(valueNum.toExponential(2)).toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  return parseFloat(valueNum.toFixed(decimals)).toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

export function validateAddress(address: string): boolean {
  try {
    const walletAddress = getAddress(address);
    if (walletAddress === AddressZero) {
      throw new Error();
    }
    return true;
  } catch {
    throw new Error(`Invalid 'address' parameter '${address}'.`);
  }
}

function getSigner(provider: JsonRpcProvider, account: string) {
  return provider.getSigner(account).connectUnchecked();
}

function getProviderOrSigner(provider: JsonRpcProvider, account?: string) {
  return account ? getSigner(provider, account) : provider;
}

export function getContract(
  address: string,
  ABI: ContractInterface,
  provider: JsonRpcProvider,
  account?: string
) {
  validateAddress(address);
  return new Contract(address, ABI, getProviderOrSigner(provider, account));
}

export function getCurrentDateFormatted(): string {
  const date = new Date();
  return format(date, "MMMM/d/yyyy 'at' HH:mm");
}

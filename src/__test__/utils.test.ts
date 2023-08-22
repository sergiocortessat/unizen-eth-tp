import {
  formatToDecimals,
  validateAddress,
  getContract,
  getCurrentDateFormatted,
} from "../utils";
import { ethers } from "ethers";
import { AddressZero } from "@ethersproject/constants";
import { JsonRpcProvider } from "@ethersproject/providers";
import "@testing-library/jest-dom";
import { Contract, ContractInterface } from "ethers";

import { customABI } from "../ABI";

describe("Utility functions", () => {
  it("formatToDecimals formats correctly", () => {
    const bigNumberValue = ethers.utils.parseEther("1.23456789");
    expect(formatToDecimals(0)).toBe(0);
    expect(formatToDecimals(bigNumberValue)).toBeCloseTo(1.2345499999999998);
  });

  it("validateAddress validates correctly", () => {
    expect(() => validateAddress("invalidAddress")).toThrowError(
      "Invalid 'address' parameter 'invalidAddress'."
    );
    expect(() => validateAddress(AddressZero)).toThrowError();
    expect(
      validateAddress("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
    ).toBeTruthy();
  });

  it("getContract gets a contract", () => {
    const mockProvider: any = new JsonRpcProvider(); // this is a mock instance
    const ABI: ContractInterface = customABI;
    const address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const contract = getContract(address, ABI, mockProvider);
    expect(contract).toBeInstanceOf(Contract);
  });

  it("getCurrentDateFormatted returns formatted date", () => {
    const dateRegex = new RegExp(
      "^[A-Za-z]+/\\d{1,2}/\\d{4} at \\d{1,2}:\\d{2}$"
    );
    expect(getCurrentDateFormatted()).toMatch(dateRegex);
  });
});

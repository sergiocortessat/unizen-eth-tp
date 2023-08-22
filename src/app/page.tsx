import Link from "next/link";
import TransitionFrame from "../components/TransitionFrame";
import Typewriter from "../components/TypeWritter";
import { phrases } from '../phrases';
import arrow from '../../public/arrow.svg'
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-start flex-col gap-20">
      <div>
        <h1 className="text-4xl font-bold text-center text-blackTitle tracking-wider">
          <p className="mb-2">Your window into the</p>
          <p>blockchain universe</p>
        </h1>
      </div>
      <div className="gap-5">
        <p className="mb-5 text-customGrey">Forget everything you know about</p>
        <Typewriter
          phrases={phrases}
        />
      </div>
      <TransitionFrame>
        <Link
          href="/balance"
          className="transition-all ease-in-out duration-200 relative py-4 px-10 bg-emerald text-white rounded-md items-center text-base cursor-pointer text-blackButton hover:bg-darkEmerald active:bg-darkEmerald hover:shadow-white w-[calc(70vw)] max-w-[400px] xl:w-[250px] flex justify-center"
        >
          <div className="flex flex-row items-center space-x-3 text-base font-medium">
            <span>Open Web3 OS</span>
            <Image src={arrow} alt="Arrow" width="7" height="11"/>
          </div>
        </Link>
      </TransitionFrame>
    </div>
  );
}

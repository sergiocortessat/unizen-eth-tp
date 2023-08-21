import Link from "next/link";
import TransitionFrame from "../components/TransitionFrame";

export default function Home() {
    return (
      <div className='flex items-center justify-start flex-col gap-20'>
        <div>
          <h1 className="text-4xl font-bold text-center text-blackTitle tracking-wider">
            <p className="mb-2">Your window into the</p>
            <p>blockchain universe</p>
          </h1>
        </div>
      <TransitionFrame>
        <Link href="/balance" className="transition-all ease-in-out duration-200 relative py-4 px-10 bg-emerald text-white cursor-pointer rounded-md items-center text-base cursor-pointer text-blackButton hover:bg-darkEmerald active:bg-darkEmerald hover:shadow-emerald/50 w-[calc(70vw)] max-w-[400px] xl:w-[250px] flex justify-center">
          <div className="flex flex-row items-center space-x-3 text-base font-medium">
            <span>Open Web3 OS</span>
            <svg
              width="7"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 10 4.5-4.5L1 1"
                stroke="currentColor"
                strokeWidth="1.3"
              ></path>
            </svg>
          </div>
        </Link>
        </TransitionFrame>
      </div>
    );
}

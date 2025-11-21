import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-row font-serif h-full items-center justify-center">
      <div className="flex flex-row items-center justify-center p-3">
        <div className="flex flex-row items-start">
          <div className="relative shrink-0">
            <Image
              src="/flower.svg"
              alt="flower"
              className="flower relative z-10"
              width={298}
              height={426}
              priority
            />
            <svg className="absolute inset-0 -z-10 w-full h-full" width="100%" height="100%">
              <circle cx="130" cy="220" r="110" fill="rgb(var(--background-rgb))" stroke="rgb(var(--background-rgb))" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex flex-col h-[330px] -ml-14">
            <div className="pt-[120px] -ml-1">
              <p className="font-blackletter text-7xl">Rai</p>
            </div>

            <div className="pt-[50px] z-20">
              <p>
                <Link href="/about">About</Link>
              </p>
              {/* <br />
            <p>
              <Link href="/content">content</Link>
            </p> */}
              {/* <p>
                <Link target="_blank" href="https://flowerpetals.substack.com">newsletter</Link>
              </p> */}
            <p>
                <Link href="/bet">Bet</Link>
              </p>
              <p>
                <Link href="/contact">Contact</Link>
            </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

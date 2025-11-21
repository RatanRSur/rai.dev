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
            <svg className="absolute inset-0 -z-10 w-screen h-screen" width="100vw" height="100vh">
              <circle cx="130" cy="220" r="120" fill="black" stroke="black" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex flex-col h-[330px] z-20 -ml-14">
            <div className="pt-[130px]">
              <p className="font-blackletter text-6xl">Rai</p>
            </div>

            <div className="pt-[60px]">
              <p>
                <Link href="/about">about</Link>
              </p>
              <br />
              {/* <br />
            <p>
              <Link href="/content">content</Link>
            </p> */}
              <p>
                <Link target="_blank" href="https://flowerpetals.substack.com">newsletter</Link>
            </p>
            <br />
            <p>
              <Link href="/bet">bet</Link>
            </p>
            <br />
              <p>
              <u>
                <Link href="/contact">contact</Link>
              </u>
            </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

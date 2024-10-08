import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row font-mono h-full items-center justify-center">
      <div className="flex flex-row items-center justify-center p-3">
        <div className="relative">
          <img src="/flower.svg" className="flower relative z-10" />
          <svg className="absolute inset-0 -z-10" width="330" height="330">
            <circle cx="130" cy="220" r="100" fill="black" stroke="black" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <>
          <div>
            <p>rai</p>
            <br />
            <br />
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
        </>
      </div>
      </div>
    </main>
  );
}

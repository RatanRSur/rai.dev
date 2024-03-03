import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <main className="flex flex-row font-mono h-full justify-center">
      <div className="flex items-center h-full">
        <>
          <img src="/flower.svg" className="flower" />
          <div>
            <p>rai</p>
            <br />
            <br />
            <p>
              <Link href="/about">about</Link>
            </p>
            <br />
            <p>
              <Link href="/content">content</Link>
            </p>
            <br />
            <p>
              <Link href="/bet">bet</Link>
            </p>
            <br />
            <p>
              <Link href="/newsletter">newsletter</Link>
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
    </main>
  );
}

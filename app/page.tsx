"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="centered-window">
        <img src="/flower.svg" className="flower" />
        <div className="navigation">
          <p>rai</p>
          <br></br>
          <p>
            <Link href="/about">about</Link>
          </p>
          <p>
            <Link href="/writing">writing</Link>
          </p>
          <p>
            <Link href="/services">services</Link>
          </p>
          <p>
            <u>
              <Link href="/contact">contact</Link>
            </u>
          </p>
        </div>
      </div>
    </main>
  );
}

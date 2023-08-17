"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="centered-window">
        <img src="/flower.svg" className="flower" />
        <div className="navigation">
          <p>rai</p>
          <p>
            <Link href="/about">
              <u>about</u>
            </Link>
          </p>
          <p>
            <Link href="/services">
              <u>services</u>
            </Link>
          </p>
          <p>
            <Link href="/testimonials">
              <u>testimonials</u>
            </Link>
          </p>
          <p>
            <u>contact</u>
          </p>
        </div>
      </div>
    </main>
  );
}

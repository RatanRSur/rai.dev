import Link from "next/link";
import Script from "next/script";

function CenteredContentBox(props: { children: JSX.Element }) {
  return <div className="centered-window">{props.children}</div>;
}

export default function Home() {
  return (
    <main className="">
      <CenteredContentBox>
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
      </CenteredContentBox>
    </main>
  );
}

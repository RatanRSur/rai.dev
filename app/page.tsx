function CenteredContentBox({ children }: { children: JSX.Element[] }) {
  return <div className="centered-window">{...children}</div>;
}

export default function Home() {
  return (
    <main className="">
      <CenteredContentBox
        children={[
          <img src="/flower.svg" className="flower" />,
          <div>
            <p>rai</p>
            <br />
            <br />
            <p>
              <a href="/about">about</a>
            </p>
            <br />
            <p>
              <a href="/writing">writing</a>
            </p>
            <br />
            <p>
              <a href="/bet">bet</a>
            </p>
            <br />
            <p>
              <a href="/services">services</a>
            </p>
            <br />
            <p>
              <u>
                <a href="/contact">contact</a>
              </u>
            </p>
          </div>,
        ]}
      ></CenteredContentBox>
    </main>
  );
}

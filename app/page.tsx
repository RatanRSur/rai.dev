export default function Home() {
  return (
    <main className="">
      <div className="centered-window">
        <img src="/flower.svg" className="flower" />
        <div className="navigation">
          <p>rai</p>
          <br></br>
          <p>
            <a href="/about">about</a>
          </p>
          <p>
            <a href="/writing">writing</a>
          </p>
          <p>
            <a href="/services">services</a>
          </p>
          <p>
            <u>
              <a href="/contact">contact</a>
            </u>
          </p>
        </div>
      </div>
    </main>
  );
}

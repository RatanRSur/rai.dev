import Link from "next/link";

export default function Contact() {
  return (
    <div className="centered-window">
      <div className="normal-text">
        <p>
          <Link target="_blank" href="https://twitter.com/0xRaino">
            twitter
          </Link>
        </p>
        <p>
          <Link target="_blank" href="mailto:rai@rai.dev">
            email
          </Link>
        </p>
        <br></br>
        <p>
          <a href="..">«</a>
        </p>
      </div>
    </div>
  );
}

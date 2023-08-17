import Link from "next/link";

export default function Services() {
  return (
    <div className="centered-window">
      <div className="normal-text">
        <p>
          my strength is thinking comprehensively enough about software systems
          and mental models that i notice the gaps others don't.
        </p>
        <br></br>
        <p>
          <u>web3 protocol design and red-teaming</u>
        </p>
        <p>
          end-to-end specification or review of the on/offchain, financial,
          game-theoretic, and MEV aspects of web3 protocols – tell me what you
          want at the highest level and i'll specify or break your system.
        </p>
        <br></br>
        <p>
          <u>architecture, engineering, and testing</u>
        </p>
        <p>
          offchain services and tooling{" "}
          <em>[rust, typescript, python, scala, kotlin, java]</em>
        </p>
        <p>
          smart contracts <em>[solidity, foundry]</em>
        </p>
        <br></br>
        <p>
          <u>business uncertainty reduction</u>
        </p>
        <p>
          taking high-stakes decisions – ones that seem totally unmeasurable –
          and estimating their risks, finding shaky assumptions you weren't
          aware you were resting on, and designing cheap experiments that
          drastically reduce uncertainty.
        </p>
        <br></br>
        <p>
          <Link href="../contact">contact</Link>
        </p>
        <br></br>
        <p>
          <Link href="..">«</Link>
        </p>
      </div>
    </div>
  );
}

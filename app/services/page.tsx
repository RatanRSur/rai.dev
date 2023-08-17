import Link from "next/link";

export default function Services() {
  return (
    <div className="centered-window">
      <div className="normal-text">
        <p>
          my experience is thinking comprehensively and adversarially enough
          about a codebase, protocol, or mental model that i notice the gaps in
          the armor. i then fill in those gaps with automation, testing, new
          mechanisms, or even redesigns if necessary. i also just like writing
          code in general :)
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
          <em>[rust, typescript, scala/java, python]</em>
        </p>
        <p>
          smart contracts <em>[solidity, foundry]</em>
        </p>
        <br></br>
        <p>
          <u>business uncertainty reduction</u>
        </p>
        <p>
          estimating/modeling the risks of high-stakes decisions (even seemingly
          non-quantifiable ones), finding shaky assumptions hidden in plain
          sight, and designing cheap experiments that drastically reduce
          uncertainty.
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

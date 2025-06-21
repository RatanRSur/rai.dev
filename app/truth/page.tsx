import React from "react";
import Back from "../components/Back";

export default function Truth() {
  return (
    <div className="h-full flex flex-row justify-center items-center">
      <div className="full normal-text p-3">
        <p>
          <strong><em>Zone of Truth</em></strong>
        </p>
        <br />
        <br />
        <p>
          By entering this area, you agree to take full ownership of your feelings and be as honest as you can with others. You're not trying to be nice, (or mean for that matter), you're trying to be real.
        </p>
        <br />
        <br />
        <p>
          This is your chance to ask people questions that you've been too afraid to ask, to find out how others experience you, and to feel the sense of relief from knowing that people are being honest with you.
        </p>
        <br />
        <br />
        <p>
          <em>
            What is true is already so.
            <br />
            Owning up to it doesn't make it worse.
            <br />
            Not being open about it doesn't make it go away.
            <br />
            People can stand what is true,
            <br />
            for they are already enduring it.
          </em>
        </p>
        <br />
        <br />
        <Back></Back>
      </div>
    </div>
  );
} 
import React from "react";

function Footer() {
  return (
    <>
      <p class="footer-heart">
        Made with{" "}
        <g-emoji
          class="g-emoji"
          alias="heart"
          fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
        >
          <img
            class="emoji"
            alt="heart"
            height="20"
            width="20"
            src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
          />
        </g-emoji>{" "}
        by <a href="https://github.com/yashshah1910">Yash Shah</a>
      </p>
    </>
  );
}

export default Footer;

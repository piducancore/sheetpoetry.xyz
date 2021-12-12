/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import Typist from "react-typist";

import "react-typist/dist/Typist.css";

export default function AnimatedText({ words }) {
  return (
    <Typist sx={{ mb: 4 }} key={words}>
      <Themed.h2 sx={{ whiteSpace: "pre-wrap", display: "inline" }}>{words}</Themed.h2>
    </Typist>
  );
}

"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NextProgressBar() {
  return (
    <ProgressBar
      height="2px"
      color="#254336"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}

import { ReactNode } from "react";
import { useAppSelector } from "../app/store";

interface Props {
  children: ReactNode;
}

function TheApp({ children }: Props) {
  const isDarkMode = useAppSelector((content) => {
    return (
      content.preferences.colourMode === "dark" ||
      (content.preferences.colourMode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  return <div className={`App ${isDarkMode ? "dark" : ""}`}>{children}</div>;
}

export default TheApp;

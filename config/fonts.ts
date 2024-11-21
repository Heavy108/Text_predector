import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Source_Serif_4 as FontSerif,
} from "next/font/google";

// Load the fonts
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

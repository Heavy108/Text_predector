import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Source_Serif_4 as FontSerif,
  Mina as Mina,
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

export const minaAssameseSerif = Mina({
  subsets: ["bengali"],
  variable: "--font-mina",
  display: "swap",
  weight: "700",
});


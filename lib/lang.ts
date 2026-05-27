import { text as textEn } from "./text";
import { textNp } from "./text-np";

export type Lang = "en" | "np";
export type TextDict = typeof textEn;

export function getText(val: string | null | undefined): TextDict {
  return val === "np" ? textNp : textEn;
}

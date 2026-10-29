/** One product photo, copied unchanged from ./perfumes. */
export type SourceImage = {
  src: string;
  /** Original file name in ./perfumes. */
  source: string;
  width: number;
  height: number;
  /** Mean colour of the photo's outer edge; fills the frame around the photo. */
  frame: string;
  /** 0–255 luminance of `frame`, used to pick a legible caption tone. */
  luminance: number;
  blurDataURL: string;
};

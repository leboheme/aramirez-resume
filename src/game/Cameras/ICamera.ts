export interface ICamera {
  clear(): void;

  update(delta: number): void;

  draw(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    flip: boolean
  ): void;
}
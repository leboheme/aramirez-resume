import { ICamera } from "../Cameras";
import { Point2 } from "../Math";

export interface ITexture {
  update(delta: number): void;

  draw(camera: ICamera, position: Point2, flip: boolean): void;
}

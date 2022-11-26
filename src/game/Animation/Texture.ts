import {ICamera} from "../Cameras";
import {Dimension2, Point2} from "../Math";
import {ITexture} from "./ITexture";
import {ImageService} from "./index";

export class AnimatedTexture implements ITexture {
  private loopNormal: boolean;
  private loopInverse: boolean;
  private frames: number;
  private actualFrame: number;
  private offset: number;
  private secondsPerFrameCounter: number;
  private secondsPerFrame: number;
  private atlas: CanvasImageSource;
  private imageSize: Dimension2;
  private key: number;

  constructor(
    name: string,
    key: number,
    frames: number,
    loopInverse: boolean = false,
    loopNormal: boolean = false,
    imageSize: Dimension2,
    secondsPerFrame: number
  ) {
    this.loopNormal = loopNormal;
    this.loopInverse = loopInverse;
    this.frames = frames;
    this.actualFrame = 0;
    this.offset = 1;
    this.secondsPerFrameCounter = 0;
    this.secondsPerFrame = secondsPerFrame;
    this.atlas = ImageService.getImage(name);
    this.imageSize = imageSize;
    this.key = key;
  }

  public update(delta: number): void {
    if (!this.frames) return;
    this.secondsPerFrameCounter += delta;
    if (this.secondsPerFrameCounter < this.secondsPerFrame) return;

    this.secondsPerFrameCounter = 0;
    this.actualFrame += this.offset;

    if (this.actualFrame >= this.frames || this.actualFrame < 0) {
      if (this.loopNormal) this.actualFrame = 0;
      else if (this.loopInverse) {
        this.offset = this.offset - this.offset * 2;
        this.actualFrame += this.offset;
      } else this.actualFrame = this.frames - 1;
    }
  }

  public draw(camera: ICamera, position: Point2, flip: boolean): void {
    camera.draw(
      this.atlas,
      this.imageSize.width * this.actualFrame,
      this.imageSize.height * this.key,
      this.imageSize.width,
      this.imageSize.height,
      position.x,
      position.y,
      this.imageSize.width,
      this.imageSize.height,
      flip
    );
  }
}

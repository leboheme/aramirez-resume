import Scene from "../Core/Scene";
import {ICamera} from "./ICamera";
import {Dimension2, Point2} from "../Math";
import {ControllerInput, ControllerService} from "../Controllers";

class SideOnCamera implements ICamera {
  // @ts-ignore
  private context: CanvasRenderingContext2D;
  private position: Point2;
  private size: Dimension2;
  // @ts-ignore
  private scene: Scene;
  public focus: Point2;
  private boundaries: Dimension2;

  constructor() {
    this.position = new Point2(0, 0);
    this.focus = new Point2(0, 0);
    this.size = new Dimension2(0, 0);
    this.boundaries = new Dimension2(0, 0);
  }

  public init(canvasElementId: string, scene: Scene) {
    const canvas = window.document.getElementById(
      canvasElementId
    ) as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("context null");

    const resize = () => {
      canvas.width = this.size.width = window.innerWidth < 400 ? context.canvas.getBoundingClientRect().width * 0.95 : window.innerWidth * 0.95;
      canvas.height = this.size.height = window.innerWidth < 400 ? window.innerHeight / 2 : 400;
    }
    resize();
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resize);

    this.context = context;
    this.position.x = 0;
    this.position.y = 0;
    this.boundaries.width = scene.size.width;
    this.boundaries.height = scene.size.height;

    const camera = this
    const checkTouch = function (event: TouchEvent) {
      if (event.target != canvas) return;

      if (event.touches[0].clientY - canvas.getBoundingClientRect().top < camera.size.height / 2) {
        ControllerService.press(ControllerInput[ControllerInput.ArrowUp])
      }
      if (event.touches[0].clientX < window.innerWidth / 2) {
        ControllerService.press(ControllerInput[ControllerInput.ArrowLeft])
      } else {
        ControllerService.press(ControllerInput[ControllerInput.ArrowRight])
      }
    };
    window.addEventListener("touchstart", checkTouch);
    window.addEventListener("touchmove", checkTouch);
    window.addEventListener("touchmove", function (event: TouchEvent) {
      if (event.target == canvas) {
        event.preventDefault();
      }
    }, { passive: false });
    window.addEventListener("touchend", function (event: TouchEvent) {
      ControllerService.clear();
    })
    window.addEventListener("contextmenu", function (event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
    })
    canvas.onwheel = function (event) {
      event.preventDefault();
    };
  }

  public update(delta: number) {
    if (this.focus.x < this.size.width / 4) {
      this.position.x = 0;
    } else if (this.focus.x > this.boundaries.width - this.size.width / 4) {
      this.position.x = this.boundaries.width - this.size.width / 2;
    } else {
      this.position.x = this.focus.x - this.size.width / 4;
    }

    if (this.focus.y < this.size.height / 2) {
      this.position.y = 0;
    } else if (this.focus.y > this.boundaries.height - (this.size.height / 2)) {
      this.position.y = this.boundaries.height - this.size.height;
    } else {
      this.position.y = this.focus.y - this.size.height / 2;
    }
  }

  public clear() {
    this.context.clearRect(0, 0, this.size.width, this.size.height);
  }

  public draw(
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
  ): void {
    if (flip) {
      this.context.translate(dx + sw - this.position.x, 0);
      this.context.scale(-1, 1);
    }

    this.context.drawImage(
      image,
      sx,
      sy,
      sw,
      sh,
      flip ? 0 : dx - this.position.x,
      this.context.canvas.height - dy - dh + this.position.y,
      dw,
      dh
    );

    if (flip) this.context.resetTransform();
  }
}

export const SideOnCameraInstance = new SideOnCamera();

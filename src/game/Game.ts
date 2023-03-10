import Scene from "./Core/Scene";
import { ICamera, SideOnCamera } from "./Cameras";
import { ControllerService } from "./Controllers";

export default class Game {
  private secondsPassed: number = 0;
  private oldTimeStamp: DOMHighResTimeStamp = performance.now();
  private camera: ICamera;
  private currentScene: Scene;

  constructor(canvasElementId: string, scene: Scene) {
    SideOnCamera.init(canvasElementId, scene);
    this.camera = SideOnCamera;
    this.currentScene = scene;

    ControllerService.clear();
  }

  public start(): void {
    window.requestAnimationFrame(timestamp => this.gameLoop(this, timestamp));
  }

  gameLoop(game: Game, timeStamp: number): void {
    // Calculate delta
    game.secondsPassed = (timeStamp - game.oldTimeStamp) / 1000;
    game.oldTimeStamp = timeStamp;

    // Set a max secondsPassed to avoid lags/miscalculations
    game.update(Math.min(game.secondsPassed, 0.017));
  }

  public update(delta: number): void {
    this.camera.update(delta);
    this.currentScene.update(delta);

    this.camera.clear();
    this.currentScene.draw(this.camera);

    window.requestAnimationFrame(timestamp => this.gameLoop(this, timestamp));
  }
}

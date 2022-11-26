import Scene from "./Core/Scene";
import {ICamera, SideOnCamera} from "./Cameras";
import {ControllerService} from "./Controllers";

export default class Game {
  private camera: ICamera;
  private currentScene: Scene;

  constructor(canvasElementId: string, scene: Scene) {
    SideOnCamera.init(canvasElementId, scene);
    this.camera = SideOnCamera;
    this.currentScene = scene;

    ControllerService.clear();
  }

  public update(delta: number): void {
    this.camera.update(delta);
    this.currentScene.update(delta);

    this.camera.clear();
    this.currentScene.draw(this.camera);
  }
}

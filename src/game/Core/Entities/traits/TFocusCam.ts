import Scene from "../../Scene";
import {SideOnCamera} from "../../../Cameras";
import {ITrait} from "./ITrait";
import {Entity} from "../Entity";

export class TFocusCam implements ITrait {
  private entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
    SideOnCamera.focus = this.entity.position;
  }

  public update(delta: number, scene: Scene): void {
  }
}

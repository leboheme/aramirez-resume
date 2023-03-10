import Scene from "../../Scene";
import { ControllerInputs, ControllerService } from "../../../Controllers";
import { ITrait } from "./ITrait";
import { Entity } from "../Entity";

export class TController implements ITrait {
  private entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  update(delta: number, scene: Scene): void {
    if (ControllerService.isPressed(ControllerInputs.ArrowLeft)) {
      this.entity.velocity.x = -6;
      this.entity.faceLeft = true;
    }
    if (ControllerService.isPressed(ControllerInputs.ArrowRight)) {
      this.entity.velocity.x = 6;
      this.entity.faceLeft = false;
    }
    if (ControllerService.isPressed(ControllerInputs.ArrowUp)) {
      if (this.entity.grounded) {
        this.entity.grounded = false;
        this.entity.acceleration.y = 0.06;
        this.entity.velocity.y = 10;
      }
    }
  }
}

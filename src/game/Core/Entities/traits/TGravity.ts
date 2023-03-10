import Scene from "../../Scene";
import { State, States } from "../EntityState";
import { ITrait } from "./ITrait";
import { Entity } from "../Entity";

const GRAVITY = -0.06;
const DAMP_FACTOR = 0.8;

export class TGravity implements ITrait {
  private entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  update(delta: number, scene: Scene): void {
    this.entity.acceleration.y += GRAVITY;
    this.entity.velocity.y += this.entity.acceleration.y;

    scene.checkCollisions(this.entity);

    this.entity.velocity.x *= DAMP_FACTOR;
    if (Math.abs(this.entity.velocity.x) < 0.6) this.entity.velocity.x = 0;

    this.entity.position.x += this.entity.velocity.x;
    this.entity.position.y += this.entity.velocity.y;

    if (this.entity.velocity.y < 0 && !this.entity.grounded)
      this.entity.state.set(States.Fall);
    else if (this.entity.velocity.y > 0 && !this.entity.grounded)
      this.entity.state.set(States.Jump);
    else {
      if (this.entity.velocity.x != 0) this.entity.state.set(States.Walk);
      else this.entity.state.set(States.Idle);
    }
  }
}

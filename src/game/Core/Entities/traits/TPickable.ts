import Scene from "../../Scene";
import { States } from "../EntityState";
import { AudioServiceInstance } from "../../../Audio/AudioService";
import { AudioService, Sounds } from "../../../Audio";
import { EventsService, GameEventTypes } from "../../../Events";
import { ITrait } from "./ITrait";
import { Entity } from "../Entity";

interface TPickableOpts {
  event: string;
}

export class TPickable implements ITrait {
  private entity: Entity;
  private enabled: boolean;
  private disabledTimer: number;
  private opts: TPickableOpts;
  private readonly DISABLED_TIME = 5;

  constructor(entity: Entity, opts: TPickableOpts) {
    this.entity = entity;
    this.disabledTimer = 0;
    this.enabled = true;
    this.opts = opts;
    // AudioService.loadSound(Sounds.Pickable);
  }

  public update(delta: number, scene: Scene): void {
    if (!this.enabled) {
      this.disabledTimer += delta;
      if (this.disabledTimer > this.DISABLED_TIME) {
        this.disabledTimer = 0;
        this.entity.state.set(States.Idle);
        this.enabled = true;
      }
      return;
    }

    scene.entities.forEach(entity => {
      // basic box collision
      if (this.enabled && this.entityCollision(this.entity, entity)) {
        this.enabled = false;
        this.entity.state.set(States.Wait);
        EventsService.notify({
          type: GameEventTypes.Pick,
          value: this.opts.event,
          source: this.entity.name
        });
        // AudioServiceInstance.playSound(Sounds.Pickable);
      }
    });
  }

  private entityCollision(entityA: Entity, entityB: Entity): boolean {
    return (
      entityA.name != entityB.name &&
      entityA.position.x < entityB.position.x + entityB.size.width &&
      entityA.position.x + entityA.size.width > entityB.position.x &&
      entityA.position.y < entityB.position.y + entityB.size.height &&
      entityA.position.y + entityA.size.height > entityB.position.y
    );
  }
}

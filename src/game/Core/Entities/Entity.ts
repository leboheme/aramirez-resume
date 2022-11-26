import Scene from "../Scene";
import {ICamera} from "../../Cameras";
import {Dimension2, Point2, Vector2} from "../../Math";
import {EntityState} from "./EntityState";
import {ITrait} from "./traits";

export class Entity {
  public name: string;
  public position: Point2;
  public velocity: Vector2;
  public acceleration: Vector2;
  public grounded: boolean;
  public size: Dimension2;
  public state: EntityState;
  private traits: Array<ITrait>;
  public faceLeft: boolean;

  constructor(
    name: string,
    position: Point2,
    size: Dimension2,
    state: EntityState
  ) {
    this.name = name;
    this.position = position;
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.grounded = false;
    this.faceLeft = false;
    this.size = size;
    this.state = state;
    this.traits = new Array<ITrait>();
  }

  public update(delta: number, scene: Scene): void {
    this.traits.forEach(trait => trait.update(delta, scene));
    this.state.update(delta);
  }

  public draw(camera: ICamera): void {
    this.state.draw(camera, this.position, this.faceLeft);
  }

  public addTrait(trait: ITrait): void {
    this.traits.push(trait);
  }
}

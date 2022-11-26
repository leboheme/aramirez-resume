import { ICamera } from "../../Cameras";
import { Point2 } from "../../Math";
import { ITexture } from "../../Animation";

export const States = {
  Idle: "Idle",
  Walk: "Walk",
  Fall: "Fall",
  Jump: "Jump",
  Wait: "Wait"
} as const;

export type State = typeof States[keyof typeof States];

export class EntityState {
  private states: Map<State, ITexture>;
  private currentState: State;
  private currentTexture: ITexture;

  constructor(states: Map<State, ITexture>) {
    this.states = states;
    this.set(States.Idle);
    this.currentState = States.Idle;
    // @ts-ignore
    this.currentTexture = this.states.get(States.Idle);
  }

  update(delta: number): void {
    this.currentTexture.update(delta);
  }

  set(state: State) {
    this.currentState = state;
    // @ts-ignore
    this.currentTexture = this.states.get(state);
  }

  draw(camera: ICamera, position: Point2, flip: boolean): void {
    this.currentTexture.draw(camera, position, flip);
  }
}

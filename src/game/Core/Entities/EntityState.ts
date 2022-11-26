import {ICamera} from "../../Cameras";
import {Point2} from "../../Math";
import {ITexture} from "../../Animation";

export enum State {
  Idle = "Idle",
  Walk = "Walk",
  Fall = "Fall",
  Jump = "Jump",
  Wait = "Wait",
}

export class EntityState {
  private states: Map<State, ITexture>;
  private currentState: State;
  private currentTexture: ITexture;

  constructor(states: Map<State, ITexture>) {
    this.states = states;
    this.set(State.Idle);
    this.currentState = State.Idle;
    // @ts-ignore
    this.currentTexture = this.states.get(State.Idle);
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

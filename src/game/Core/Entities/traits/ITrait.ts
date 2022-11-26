import Scene from "../../Scene";
import {TGravity} from "./TGravity";
import {TController} from "./TController";
import {TPickable} from "./TPickable";
import {TFocusCam} from "./TFocusCam";
import {Entity} from "../Entity";

export interface ITrait {
  update(delta: number, scene: Scene): void;
}

export const SupportedTraits: any = {
  TGravity,
  TController,
  TPickable,
  TFocusCam,
};

export class DynamicTrait {
  constructor(className: string, entity: Entity, opts: any) {
    if (
      SupportedTraits[className] === undefined ||
      SupportedTraits[className] === null
    ) {
      throw new Error(
        `Class type of \'${className}\' is not a supported trait`
      );
    }
    return new SupportedTraits[className](entity, opts);
  }
}

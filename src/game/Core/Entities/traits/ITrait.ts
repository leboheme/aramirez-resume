import Scene from "../../Scene";
import { TGravity } from "./TGravity";
import { TController } from "./TController";
import { TPickable } from "./TPickable";
import { TFocusCam } from "./TFocusCam";
import { Entity } from "../Entity";

export interface ITrait {
  update(delta: number, scene: Scene): void;
}

export const Traits = {
  Gravity: TGravity,
  Controller: TController,
  Pickable: TPickable,
  FocusCam: TFocusCam
} as const;

export type Trait = typeof Traits[keyof typeof Traits];

export class DynamicTrait {
  constructor(className: Trait, entity: Entity, opts: any) {
    const newClass: any = new className(entity, opts);
    return newClass;
  }
}

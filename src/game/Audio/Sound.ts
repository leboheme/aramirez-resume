export const Sounds = {
  Pickable: "sounds/pickable.ogg"
} as const;

export type Sound = typeof Sounds[keyof typeof Sounds];

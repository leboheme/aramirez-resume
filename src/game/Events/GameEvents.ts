export enum GameEventType {
  Pick
}

export interface GameEvent {
  type: GameEventType;
  value: string;
  source: string;
}

class GameEvents {
  private subscribers: Map<GameEventType, Array<(event: GameEvent) => void>>;

  constructor() {
    this.subscribers = new Map<GameEventType, Array<(event: GameEvent) => void>>()
  }

  public notify(event: GameEvent) {
    if (this.subscribers.has(event.type)) {
      this.subscribers.get(event.type)!.forEach((func) => {
        func(event);
      });
    }
  }

  public subscribe(type: GameEventType, func: (event: GameEvent) => void): void {
    if (!this.subscribers.has(type)) this.subscribers.set(type, new Array<() => void>());
    const funcs = this.subscribers.get(type);
    funcs!.push(func);
  }
}

export const EventsService = new GameEvents();

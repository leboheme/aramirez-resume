export const ControllerInputs = {
  ArrowLeft: 1 << 0,
  ArrowUp: 1 << 1,
  ArrowRight: 1 << 2,
  ArrowDown: 1 << 3
} as const;

type ControllerInput = typeof ControllerInputs[keyof typeof ControllerInputs];

class Controller {
  private pressedKeys: number;

  constructor() {
    this.pressedKeys = 0b00000000;

    window.addEventListener("keydown", function(e) {
      ControllerService.press(e.code);
    });
    window.addEventListener("keyup", function(e) {
      ControllerService.release(e.code);
    });
  }

  public clear(): void {
    this.pressedKeys = 0b00000000;
  }

  public press(code: string): void {
    let input = ControllerInputs[code as keyof typeof ControllerInputs];
    if (input === undefined) return;
    this.pressedKeys |= input;
  }

  public release(code: string): void {
    let input = ControllerInputs[code as keyof typeof ControllerInputs];
    if (input === undefined) return;
    this.pressedKeys &= ~input;
  }

  isPressed(input: ControllerInput): boolean {
    return (this.pressedKeys & input) != 0;
  }
}

export const ControllerService = new Controller();

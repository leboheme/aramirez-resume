import {Sound} from "./Sound";

class AudioService {
  private sounds: Map<string, HTMLAudioElement>;

  constructor() {
    this.sounds = new Map<string, HTMLAudioElement>();
  }

  public loadSound(sound: Sound): void {
    if (this.sounds.has(sound)) return;

    var audio = new Audio(sound);
    audio.volume = .08;
    audio.load();
    this.sounds.set(sound, audio);
  }

  public playSound(sound: Sound): void {
    var audio = this.sounds.get(sound);
    if (!audio) return;
    if (!(audio.currentTime == 0) && audio.ended) {
      audio.currentTime = 0;
    }
    audio.play();
  }
}

export const AudioServiceInstance = new AudioService();
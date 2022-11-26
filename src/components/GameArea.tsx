import * as React from "react";
import {useEffect} from "react";
import GameConfiguration from "../game/GameBuilder";
import GameBuilder from "../game/GameBuilder";
import {Trait, Traits} from "../game";

export default function GameArea() {
  useEffect(() => {
    const gameBuilder = new GameBuilder('game');
    const game = gameBuilder.build({
      sceneConfiguration: {
        size: {
          width: 2048,
          height: 512
        },
        tileMapConfiguration: {
          atlasSource: "img/tiles.png",
          tileSize: 64,
          tiles: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 26, 27, 28, 10, 0, 0, 0, 0, 33, 0, 8, 9, 24, 25, 9, 10],
            [0, 36, 37, 38, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41],
            [0, 44, 45, 46, 0, 0, 0, 0, 0, 0, 34, 35, 0, 0, 0, 0, 0, 0, 34, 35, 8, 10],
            [0, 52, 53, 54, 0, 0, 0, 0, 4, 0, 42, 43, 0, 0, 4, 40, 0, 0, 42, 43, 0, 0, 0, 0, 0, 0, 32, 40],
            [8, 9, 9, 18, 19, 20, 9, 9, 6, 9, 29, 30, 31, 9, 6, 9, 21, 22, 23, 9, 9, 9, 16, 17, 9, 9, 9, 9, 9, 9, 9, 10],
          ],
          atlasTilesPerRow: 8,
          collisionNumber: 32,
        },
        entitiesConfiguration: [
          {
            name: 'Tails', position: {x: 1632, y: 320}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 12, frames: 8, loopNormal: true, secondsPerFrame: 0.2},
              {type: 'Wait', name: "img/atlas.png", key: 9, frames: 8, loopNormal: true, secondsPerFrame: 0.13},
            ],
            traits: [{name: Traits.Pickable, opts: {event: 'facts'}}]
          },
          {
            name: 'Monkey', position: {x: 896, y: 320}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 12, frames: 8, loopNormal: true, secondsPerFrame: 0.2},
              {type: 'Wait', name: "img/atlas.png", key: 10, frames: 7, loopNormal: true, secondsPerFrame: 0.15},
            ],
            traits: [{name: Traits.Pickable, opts: {event: 'experience'}}]
          },
          {
            name: 'Star', position: {x: 1440, y: 64}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 12, frames: 8, loopNormal: true, secondsPerFrame: 0.2},
              {type: 'Wait', name: "img/atlas.png", key: 13, frames: 4, loopNormal: true, secondsPerFrame: 0.15},
            ],
            traits: [{name: Traits.Pickable, opts: {event: 'skills'}}]
          },
          {
            name: 'Chicken', position: {x: 1088, y: 64}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 12, frames: 8, loopNormal: true, secondsPerFrame: 0.09},
              {type: 'Wait', name: "img/atlas.png", key: 14, frames: 1, loopNormal: true, secondsPerFrame: 0.15},
            ],
            traits: [{name: Traits.Pickable, opts: {event: 'education'}}]
          },
          {
            name: 'Chocobo', position: {x: 704, y: 64}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 12, frames: 8, loopNormal: true, secondsPerFrame: 0.09},
              {type: 'Wait', name: "img/atlas.png", key: 15, frames: 6, loopNormal: true, secondsPerFrame: 0.15},
            ],
            traits: [{name: Traits.Pickable, opts: {event: 'projects'}}]
          },
          {
            name: 'Kirby', position: {x: 256, y: 64}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 12, frames: 8, loopNormal: true, secondsPerFrame: 0.09},
              {type: 'Wait', name: "img/atlas.png", key: 11, frames: 10, loopNormal: true, secondsPerFrame: 0.1},
            ],
            traits: [{name: Traits.Pickable, opts: {event: 'welcome'}}]
          },
          {
            name: 'Gluty', position: {x: 128, y: 250}, size: {width: 64, height: 64},
            state: [
              {type: 'Idle', name: "img/atlas.png", key: 0, frames: 10, loopNormal: true, secondsPerFrame: 0.09},
              {type: 'Walk', name: "img/atlas.png", key: 2, frames: 8, loopNormal: true, secondsPerFrame: 0.09},
              {type: 'Fall', name: "img/atlas.png", key: 4, frames: 3, loopNormal: true, secondsPerFrame: 0.09},
              {type: 'Jump', name: "img/atlas.png", key: 6, frames: 3, loopNormal: true, secondsPerFrame: 0.09},
            ],
            traits: [{name: Traits.FocusCam}, {name: Traits.Gravity}, {name: Traits.Controller}],
          },
        ],
      },
    } as GameConfiguration);

    game.start();
  }, []);

  return (
    <canvas id="game"/>
  );
}
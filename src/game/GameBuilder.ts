import Game from "./Game";
import Scene from "./Core/Scene";
import TileMap from "./Core/TileMap";
import {DynamicTrait, ITrait, SupportedTraits} from "./Core/Entities/traits/ITrait";
import {Dimension2, Point2} from "./Math";
import {AnimatedTexture, ImageService} from "./Animation";
import {Entity, EntityState, State} from "./Core/Entities";

export default interface GameConfiguration {
  sceneConfiguration: SceneConfiguration;
}

interface SceneConfiguration {
  size: Dimension2;
  tileMapConfiguration: TileMapConfiguration;
  entitiesConfiguration: Array<EntityConfiguration>;
}

interface TileMapConfiguration {
  atlasSource: string;
  tileSize: number;
  tiles: Array<Array<number>>;
  atlasTilesPerRow: number;
  collisionNumber: number;
}

export interface EntityConfiguration {
  name: string;
  position: Point2;
  size: Dimension2;
  state: Array<EntityStateConfiguration>;
  traits: Array<TraitConfiguration>;
}

export interface TraitConfiguration {
  name: typeof SupportedTraits;
  opts?: Map<string, any>;
}

export interface EntityStateConfiguration {
  type: State;
  name: string;
  size?: Dimension2;
  key: number;
  frames: number;
  loopNormal?: boolean;
  loopInverse?: boolean;
  secondsPerFrame: number;
}

export default class GameBuilder {
  private canvasElementId: string;

  constructor(canvasElementId: string) {
    this.canvasElementId = canvasElementId;
  }

  public build(gameConfiguration: GameConfiguration): Game {
    return new Game(
      this.canvasElementId,
      this.buildScene(gameConfiguration.sceneConfiguration)
    );
  }

  private buildScene(sceneConfiguration: SceneConfiguration): Scene {
    const tileMapConfiguration = sceneConfiguration.tileMapConfiguration;
    const tileMap = new TileMap(
      ImageService.getImage(tileMapConfiguration.atlasSource),
      tileMapConfiguration.tileSize,
      tileMapConfiguration.tiles,
      tileMapConfiguration.atlasTilesPerRow,
      tileMapConfiguration.collisionNumber
    );

    return new Scene(
      sceneConfiguration.size,
      tileMap,
      this.buildEntities(sceneConfiguration.entitiesConfiguration)
    );
  }

  private buildEntities(entities: Array<EntityConfiguration>): Array<Entity> {
    return entities.map(conf => {
      var entity = new Entity(
        conf.name,
        conf.position,
        conf.size,
        new EntityState(
          conf.state.reduce(function (map, state): Map<State, AnimatedTexture> {
            map.set(state.type, new AnimatedTexture(
              state.name,
              state.key,
              state.frames,
              state.loopInverse,
              state.loopNormal,
              state.size ?? conf.size,
              state.secondsPerFrame
            ));
            return map;
          }, new Map<State, AnimatedTexture>)
        )
      );
      conf.traits.forEach((trait) =>
        entity.addTrait(new DynamicTrait(trait.name, entity, trait.opts) as ITrait)
      )

      return entity;
    });
  }
}

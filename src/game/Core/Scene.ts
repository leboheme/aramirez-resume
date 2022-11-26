import TileMap from "./TileMap";
import {ICamera} from "../Cameras";
import {Dimension2} from "../Math";
import {Entity} from "./Entities";

export default class Scene {
  public size: Dimension2;
  public tileMap: TileMap;
  public entities: Array<Entity>;

  constructor(size: Dimension2, tileMap: TileMap, entities: Array<Entity>) {
    this.size = size;
    this.tileMap = tileMap;
    this.entities = entities;
  }

  public update(delta: number): void {
    this.tileMap.update(delta);
    this.entities.forEach(entity => entity.update(delta, this));
  }

  public draw(camera: ICamera): void {
    this.tileMap.draw(camera);
    this.entities.forEach(entity => entity.draw(camera));
  }

  public checkCollisions(entity: Entity): void {
    this.checkCollisionX(entity);
    this.checkCollisionY(entity);
    this.checkLimits(entity);
  }

  private checkCollisionX(entity: Entity): void {
    for (var row = 0; row < this.tileMap.tiles.length; row++) {
      for (var col = 0; col < this.tileMap.tiles[row].length; col++) {
        if (this.canCollide(this.tileMap.tiles[row][col])) {
          var posX =
            entity.velocity.x >= 0
              ? entity.position.x + entity.size.width
              : entity.position.x;
          var posY = entity.position.y + entity.size.height / 2;
          if (
            this.intersectP2R(
              posX,
              posY,
              col * this.tileMap.tileSize,
              col * this.tileMap.tileSize + this.tileMap.tileSize,
              (this.tileMap.tiles.length - row - 1) * this.tileMap.tileSize,
              (this.tileMap.tiles.length - row - 1) * this.tileMap.tileSize + this.tileMap.tileSize
            )
          ) {
            entity.position.x =
              entity.velocity.x >= 0
                ? col * this.tileMap.tileSize - entity.size.width
                : col * this.tileMap.tileSize + this.tileMap.tileSize;
            entity.velocity.x = 0;
          }
        }
      }
    }
  }

  private checkCollisionY(entity: Entity) {
    for (var row = 0; row < this.tileMap.tiles.length; row++) {
      for (var col = 0; col < this.tileMap.tiles[row].length; col++) {
        if (this.canCollide(this.tileMap.tiles[row][col])) {
          var posX =
            entity.position.x + entity.velocity.x + entity.size.width / 2;
          var posY =
            entity.velocity.y > 0
              ? entity.position.y + entity.size.height + entity.velocity.y
              : entity.position.y + entity.velocity.y;
          if (
            this.intersectP2R(
              posX,
              posY,
              col * this.tileMap.tileSize,
              col * this.tileMap.tileSize + this.tileMap.tileSize,
              (this.tileMap.tiles.length - row - 1) * this.tileMap.tileSize,
              (this.tileMap.tiles.length - row - 1) * this.tileMap.tileSize + this.tileMap.tileSize
            )
          ) {
            entity.position.y =
              entity.velocity.y > 0
                ? (this.tileMap.tiles.length - row - 1) * this.tileMap.tileSize -
                entity.size.height
                : (this.tileMap.tiles.length - row - 1) * this.tileMap.tileSize + this.tileMap.tileSize;
            entity.grounded = entity.velocity.y < 0;
            entity.velocity.y = 0;
            entity.acceleration.y = 0;
          }
        }
      }
    }
    if (entity.velocity.y < 0) entity.grounded = false;
  }

  private checkLimits(entity: Entity) {
    var posX = entity.position.x + entity.velocity.x;
    if (posX <= 0 && entity.velocity.x < 0) {
      entity.velocity.x = 0;
    } else if (
      posX + entity.size.width >= this.size.width &&
      entity.velocity.x > 0
    ) {
      entity.position.x = this.size.width - entity.size.width;
      entity.velocity.x = 0;
      // I put the next two cases if the character is gone for anything unusual XD
    } else if (posX < 0) {
      entity.position.x = 0;
    } else if (posX + entity.size.width > this.size.width) {
      entity.position.x = this.size.width - entity.size.width;
    }
    var posY = entity.position.y + entity.velocity.y;
    if (posY <= 0) {
      entity.position.y = 0;
      entity.velocity.y = 0;
      entity.acceleration.y = 0;
      entity.grounded = true;
    }
  }

  private intersectP2R(
    x: number,
    y: number,
    sl: number,
    sr: number,
    sb: number,
    st: number
  ) {
    return x >= sl && x <= sr && y >= sb && y <= st;
  }

  private canCollide(type: number): boolean {
    return type > 0 && type < this.tileMap.collisionNumber;
  }
}

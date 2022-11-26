import {ICamera} from "../Cameras";

export default class TileMap {
  private atlas: CanvasImageSource;
  public tileSize: number;
  public tiles: Array<Array<number>>;
  private atlasTilesPerRow: number;
  public collisionNumber: number;

  constructor(
    atlas: CanvasImageSource,
    tileSize: number,
    tiles: Array<Array<number>>,
    atlasTilesPerRow: number,
    collisionNumber: number
  ) {
    this.atlas = atlas;
    this.tileSize = tileSize;
    this.tiles = tiles;
    this.atlasTilesPerRow = atlasTilesPerRow;
    this.collisionNumber = collisionNumber;
  }

  public update(delta: number) {
    // does it change? not now
  }

  public draw(camera: ICamera) {
    this.tiles.forEach((row, rowIndex) => {
      row.forEach((tileId, colIndex) => {
        if (tileId > 0) {
          camera.draw(
            this.atlas,
            (tileId % this.atlasTilesPerRow) * this.tileSize,
            Math.floor(tileId / this.atlasTilesPerRow) * this.tileSize,
            this.tileSize,
            this.tileSize,
            colIndex * this.tileSize,
            (this.tiles.length - rowIndex - 1) * this.tileSize,
            this.tileSize,
            this.tileSize,
            false
          );
        }
      });
    });
  }
}

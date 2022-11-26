class ImageService {
  private images: Map<string, CanvasImageSource>;

  constructor() {
    this.images = new Map<string, CanvasImageSource>();
  }

  public getImage(key: string): CanvasImageSource {
    let image = this.images.get(key);
    if (image) return image;

    image = new Image();
    image.src = key;
    this.images.set(key, image);

    return image;
  }
}

export const ImageServiceInstance = new ImageService();

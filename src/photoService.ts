import {random} from './helper/random';
import randomImage from './helper/randomImage';

class PhotoService {
  private id = 0;
  private readonly words = 'lorem ipsum dolor sit amet'.match(/\p{L}+/gu);

  async get(): Promise<Photo> {
    return {
      id: ++this.id,
      title: random(3, 10, this.words).join(' '),
      imageUrl: await randomImage(),
    };
  }

  async list(): Promise<Photo[]> {
    return Promise.all(
      random(7, 15, this.get, this),
    );
  }
}

const photoService = new PhotoService();

export default photoService;

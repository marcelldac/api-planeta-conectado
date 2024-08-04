import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const image = this.imagesRepository.create(createImageDto);

    await this.imagesRepository.save(image);

    return image;
  }

  async findAll() {
    return await this.imagesRepository.find();
  }

  async findOne(id: number) {
    return await this.imagesRepository.findOneBy({ image_id: id });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id);
    if (!image) {
      throw new NotFoundException('Image was not found', {
        description: `User with id ${id} was not found`,
      });
    }

    //Same sintax as Object.assign(user, updateUserDto as User) but using generics.
    Object.assign(image, <Image>updateImageDto);

    await this.imagesRepository.save(image);
  }

  async remove(id: number) {
    await this.imagesRepository.delete({ image_id: id });
  }
}

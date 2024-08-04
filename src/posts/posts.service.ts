import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);

    await this.postsRepository.save(post);

    return post;
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: string) {
    return await this.postsRepository.findOneBy({ post_id: id });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('Post was not found', {
        description: `Post with id ${id} was not found`,
      });
    }

    //Same sintax as Object.assign(post, updatePostDto as Post) but using generics.
    Object.assign(post, <Post>updatePostDto);

    await this.postsRepository.save(post);
  }

  async remove(id: string) {
    await this.postsRepository.delete({ post_id: id });
  }
}

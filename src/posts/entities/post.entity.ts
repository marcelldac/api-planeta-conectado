import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column('varchar', { length: 30 })
  title: string;

  @Column('varchar', { length: 100 })
  description: string;

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @Column('int', { default: 0 })
  likes: number;

  @Column('text')
  user_id: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

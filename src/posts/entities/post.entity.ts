import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ulid } from 'ulid';

@Entity({ name: 'posts' })
export class Post {
  @Column({ primary: true })
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

  @BeforeInsert()
  generateId() {
    this.post_id = ulid();
  }
}

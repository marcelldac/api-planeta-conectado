import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column('text', { primary: true })
  user_id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 80, unique: true })
  email: string;

  @Column('varchar', { length: 80 })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

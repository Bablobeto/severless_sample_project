import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo extends BaseEntity{

  // Initialize class
  constructor(init?: Partial<Todo>) {
    super();
    Object.assign(this, init);
  }

  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ default: false })
  completed?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

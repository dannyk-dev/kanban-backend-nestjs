import { randomUUID, UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TodoGroup } from './TodoGroup.entity';

@Entity('todos')
export class Todo {
  @PrimaryColumn({ type: 'uuid', default: randomUUID() })
  id: UUID;

  @Column({ default: false })
  completed: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: false })
  todo: string;

  @Column({ nullable: true })
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;

  @ManyToOne(() => TodoGroup, (group) => group.todos, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  group: TodoGroup;
}

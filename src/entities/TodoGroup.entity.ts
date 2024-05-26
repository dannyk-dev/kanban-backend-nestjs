import { randomUUID, UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Todo } from './Todo.entity';

@Entity('todo_group')
export class TodoGroup {
  @PrimaryColumn({ type: 'uuid', default: randomUUID() })
  id: UUID;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Todo, (todo) => todo.group)
  todos: Todo[];
}

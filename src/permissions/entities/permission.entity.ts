import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Role } from 'src/auth/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  action: string; // Ej: 'read:users', 'create:post'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  @InjectRepository(Role)
  private readonly role: Repository<Role>;

  async findAll() {
    return await this.role.find();
  }

  async findById(id: string) {
    return await this.role.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async create(dto: CreateRoleDto) {
    const role = this.role.create(dto);
    return await this.role.save(role);
  }

  async update(id: string, dto: UpdateRoleDto) {
    await this.role.update(id, dto);
    return await this.findById(id);
  }

  async remove(id: string) {
    const role = await this.findById(id);
    if (!role) throw new NotFoundException();

    await this.role.delete(id);
    return role;
  }

  async addPermission(id: string, permissionId: string) {
    return this.role
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(id)
      .add(permissionId);
  }

  async removePermission(id: string, permissionId: string) {
    return this.role
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(id)
      .remove(permissionId);
  }
}

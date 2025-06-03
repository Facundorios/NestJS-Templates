import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  @InjectRepository(Permission)
  private readonly permission: Repository<Permission>;

  async findAll() {
    return await this.permission.find({
      order: {
        action: 'ASC',
      },
    });
  }
}

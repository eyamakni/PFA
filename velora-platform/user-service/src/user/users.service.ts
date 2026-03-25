import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async onModuleInit() {
    const admin = await this.repo.findOne({
      where: { email: 'admin@velora.com' },
    });

    if (!admin) {
      const hashed = await bcrypt.hash('admin123', 10);

      const newAdmin = this.repo.create({
        email: 'admin@velora.com',
        password: hashed,
        role: Role.ADMIN,
        isVerified: true,
      });

      await this.repo.save(newAdmin);
      console.log('Admin created');
    }
  }
async create(
  email: string,
  password: string,
  role: Role = Role.USER,
  isVerified = false,
) {
  const user = this.repo.create({
    email,
    password,
    role,
    isVerified,
  });

  return this.repo.save(user);
}

async findByEmail(email: string) {
  return this.repo.findOne({ where: { email } });
}

async update(id: number, data: any) {
  await this.repo.update(id, data);
  return { message: 'User updated' };
}
}
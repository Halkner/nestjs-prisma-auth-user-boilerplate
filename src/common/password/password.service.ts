import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 12;
  private readonly pepper: string;

  constructor(private readonly configService: ConfigService) {
    this.pepper = this.configService.get<string>('PEPPER');
  }

  async hashPassword(password: string): Promise<string> {
    const saltedPassword = password + this.pepper;
    return bcrypt.hash(saltedPassword, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const saltedPassword = password + this.pepper;
    return bcrypt.compare(saltedPassword, hash);
  }
}

import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync, createHash } from 'crypto';

@Injectable()
export class AuthService {
  hashPassword(password: string, passwordSalt?: string): string {
    const salt = passwordSalt ?? randomBytes(32).toString('hex');
    const pepper = createHash('sha256').update(password).digest('hex');
    const saltedPepper = `${salt}#${pepper}`;

    const hash = scryptSync(password, saltedPepper, 40).toString('hex');
    return `${salt}.${hash}`;
  }

  verifyHash(password: string, hashedPass: string): boolean {
    const [salt, hash] = hashedPass.split('.');
    const [oldSalt, oldHash] = this.hashPassword(password, salt).split('.');
    return salt === oldSalt && hash === oldHash;
  }
}

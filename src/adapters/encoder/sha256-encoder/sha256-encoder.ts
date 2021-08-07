import { PasswordEncoder } from "../../../domain/entities/user/ports/PasswordEncoder";
import hash from 'hash.js';

export class Sha256Encoder implements PasswordEncoder {

    encode(password: string): string {
        return hash.sha256().update(password).digest('hex');
    }
}
import { IdGenerator } from "../../../domain/entities/user/ports/IdGenerator";
import getUuid from 'uuid-by-string';

export class UuidGenerator implements IdGenerator {

    generate(id: string): string {
        return getUuid(id);
    }
}
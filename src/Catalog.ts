import { Entry } from "./Entry";

export class Catalog {

    private entries: Entry[] = [];

    add(entry: Entry): void {
        if (this.entries.find(e => e.entryKey === entry.entryKey)) {
            throw new Error('Illegal Argument Exception');
        }
        this.entries.push(entry);
    }

    contains(entry: Entry): boolean {
        return this.entries.includes(entry);
    }

    entryFor(entryKey: string): Entry | null {
        return this.entries.find(e => e.entryKey === entryKey) || null;
    }

}
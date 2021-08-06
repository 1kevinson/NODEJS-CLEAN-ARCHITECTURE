export class Entry {

    constructor(private _entryKey: string, private _entryValue: string) { }

    public get entryKey(): string {
        return this._entryKey;
    }

    public get entryValue(): string {
        return this._entryValue;
    }

}
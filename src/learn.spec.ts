import { Catalog } from "./Catalog";
import { Entry } from "./Entry";

const catalog: Catalog = new Catalog();
const entry: Entry = new Entry('fish', 'chips');

beforeAll(() => {
    catalog.add(entry);
});

describe('Catalog test', () => {
    test('contains an added entry', () => {
        expect(catalog.contains(entry)).toBeTruthy();
    });

    test('indexes entries by name', () => {
        expect(entry).toBe(catalog.entryFor('fish'));
        expect(catalog.entryFor('missing name')).toBeNull();
    });

    test('cannot add to entries with the same name', () => {
        function add2Entries() {
            catalog.add(new Entry('fish', 'peas'));
        }
        expect(add2Entries).toThrow(new Error('Illegal Argument Exception'));
    });
});
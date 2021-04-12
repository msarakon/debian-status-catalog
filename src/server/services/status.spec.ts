import { parsePackages } from './status';

describe('Status file parsing', () => {
    it('should parse an example package list string', () => {
        const text =
            'Package: foobar\r\n' +
            'Depends: fizzbuzz-test (>= 1.0), mozzarella | pikachu (>= 1:2.3.4)\r\n' +
            'Description: Lorem ipsum dolor sit amet\r\n' +
            ' consectetur adipiscing elit\r\n' +
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\r\n' +
            '\r\n' +
            'Package: fizzbuzz-test\r\n' +
            'Depends: something (>= 6.6.6)\r\n' +
            'Description: Single-line description\r\n';

        const packages = parsePackages(text);

        expect(packages.length).toBe(2);
        expect(packages[0].name).toBe('foobar');
        expect(packages[0].description.split('\n')).toEqual([
            'Lorem ipsum dolor sit amet',
            ' consectetur adipiscing elit',
            ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ]);
        expect(packages[0].dependencies).toEqual([
            'fizzbuzz-test',
            'mozzarella',
            'pikachu',
        ]);
        expect(packages[0].dependants.length).toBe(0);
        expect(packages[1].name).toBe('fizzbuzz-test');
        expect(packages[1].description).toBe('Single-line description');
        expect(packages[1].dependencies).toEqual(['something']);
        expect(packages[1].dependants).toEqual(['foobar']);
    });
});

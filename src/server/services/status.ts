import fs from 'fs';
import { Response } from 'express';
import { Package } from '../../types/package';

const FILE_PATH = './src/server/data/status';

const parseProperty = (text: string, label: string) => {
    const matches = text.match(new RegExp(label + ': (.*(\r\n .*)*)'));
    return matches ? matches[1] : '';
};

const parseDependencies = (text: string) => {
    const dependsString = parseProperty(text, 'Depends');
    if (dependsString) {
        const dependencies = dependsString
            .split(/ ?[,|\|] /)
            .map(dependency => dependency.replace(/ \(.*\)/, ''));
        return [...new Set(dependencies)]; // remove possible duplicates
    }
    return [];
};

const parsePackage = (text: string) => {
    const name = parseProperty(text, 'Package');
    const description = parseProperty(text, 'Description');
    const dependencies = parseDependencies(text);
    const dependants = [];
    return {
        name,
        description,
        dependencies,
        dependants,
    };
};

const setDependants = (packages: Package[]) => {
    packages.forEach(
        (pcgk: Package) =>
            (pcgk.dependants = packages
                .filter(p => p.dependencies.includes(pcgk.name))
                .map(p => p.name))
    );
};

const readStatus = (res: Response) => {
    fs.readFile(FILE_PATH, (error: Error, data: Object) => {
        if (error) throw error;
        const packageStrings = data.toString().split('\r\n\r\n');
        const packages = packageStrings.map(string => parsePackage(string));
        setDependants(packages);
        res.status(200)
            .type('application/json')
            .send(JSON.stringify(packages));
    });
};

export { readStatus };

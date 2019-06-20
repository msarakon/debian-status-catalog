const fs = require('fs');
const FILE_PATH = './src/server/data/status';

const parseProperty = (text, label) => {
    const matches = text.match(new RegExp(label + ': (.*(\r\n .*)*)'));
    return matches ? matches[1] : '';
}

const parseDependencies = (text) => {
    const dependsString = parseProperty(text, 'Depends');
    if (dependsString) {
        const dependencies = dependsString.split(', ')
            .map(dependency => dependency.replace(/ \(.*\)/, ''));
        return [ ...new Set(dependencies) ]; // remove possible duplicates
    }
    return [];
}

const parsePackage = (text) => {
    const name = parseProperty(text, 'Package');
    const description = parseProperty(text, 'Description');
    const dependencies = parseDependencies(text);
    const dependants = [];
    return {
        name,
        description,
        dependencies,
        dependants
    };
}

const setDependants = (packages) => {
    packages.forEach(package =>
        package.dependants = packages.filter(
            p => p.dependencies.includes(package.name)).map(p => p.name)
    );
};

exports.readStatus = (res) => {
    fs.readFile(FILE_PATH, (error, data) => {
        if (error) throw error;
        const packageStrings = data.toString().split('\r\n\r\n');
        const packages = packageStrings.map(string => parsePackage(string));
        setDependants(packages);
        res.status(200).type('application/json').send(JSON.stringify(packages));
    });
};

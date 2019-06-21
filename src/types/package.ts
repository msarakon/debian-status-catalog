export interface Package {
    name: string,
    description: string,
    dependencies: string[],
    dependants: string[]
}
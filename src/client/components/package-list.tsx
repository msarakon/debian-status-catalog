import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = (props: PackageListProps) => (
    <div>
        {props.packages.sort().map((name: string) => (
            <div key={name}>
                {props.findByName(name) ? (
                    <Link to={'/' + name}>{name}</Link>
                ) : (
                    <span>{name}</span>
                )}
            </div>
        ))}
    </div>
);

interface PackageListProps {
    packages: string[];
    findByName: Function;
}

export default PackageList;

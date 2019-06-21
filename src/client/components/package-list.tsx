import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = (props: PackageListProps) =>
    (
        <div>
            {
                props.packages.sort().map((name: string) =>
                    <div><Link to={'/' + name}>{name}</Link></div>
                )
            }
        </div>
    );

interface PackageListProps {
    packages: string[]
}

export default PackageList;
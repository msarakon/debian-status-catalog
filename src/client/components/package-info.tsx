import React from 'react';
import PackageList from './package-list';
import { Package } from '../../types/package';

const PackageInfo = (props: PackageInfoProps) =>
    (
        <div>
            <h2>{props.package.name}</h2>
            <div>{props.package.description}</div>
            <h3>Dependencies</h3>
            <PackageList packages={props.package.dependencies} />
            <h3>Dependants</h3>
            <PackageList packages={props.package.dependants} />
        </div>
    );

interface PackageInfoProps {
    package: Package
}

export default PackageInfo;
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import statusService from '../services/status';
import PackageList from './package-list';
import PackageInfo from './package-info';
import { Package } from '../../types/package';

const App = () => {
    const [ packages, setPackages ] = useState([]);

    useEffect(() => {
        statusService.getAll().then(packages => setPackages(packages));
    }, []);

    const packageByName = (name: string) => packages.find((p: Package) => p.name === name);

    return (
        <div>
            <h1>Debian Status Catalog</h1>
            <BrowserRouter>
                <Route exact path='/' render={() =>
                    <PackageList packages={packages.map(p => p.name)} findByName={packageByName} />
                } />
                <Route exact path='/:package' render={({ match }) =>
                    <PackageInfo package={packageByName(match.params.package)} findByName={packageByName} />
                } />
            </BrowserRouter>
        </div>
    );
};

export default App;
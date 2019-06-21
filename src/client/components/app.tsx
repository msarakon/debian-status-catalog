import React, { useState, useEffect } from 'react';
import statusService from '../services/status';

const App = () => {
    const [ packages, setPackages ] = useState([]);

    useEffect(() => {
        statusService.getAll().then(packages => setPackages(packages));
    }, []);

    const alphabeticalOrder = (p1, p2) =>
        p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0;
   
    return (
        <div>
            {
                packages.sort(alphabeticalOrder).map(p =>
                    <div>{ p.name }</div>)
            }
        </div>
    );
};

export default App;
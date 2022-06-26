import React, { useState, useEffect } from "react";

const foodList: string[] = ['Hamburger', 'Pizza', 'Tacos'];

const AsyncList = (): JSX.Element => {
    const [foodData, setFoodData] = useState<string[]>([]);

    const fakeApiCall = () => new Promise<string[]>((resolve) => 
        setTimeout(() => {
                    const foodnames: string[] = foodList;
                    resolve(foodnames)
                }, 2000));

    useEffect(() => {
        fakeApiCall()
            .then(data => setFoodData(data));
    }, []);

    return (
        <React.Fragment>
            {
                foodData.map(name => <p key={name}>{name}</p>)
            }
        </React.Fragment>
    );
}

export default AsyncList;
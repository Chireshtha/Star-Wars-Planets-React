import React, { useState, useEffect } from 'react';
import './PlanetCard.css';
import axios from 'axios';


const PlanetCard = ({ planets }) => {
    const [residentsInfo, setResidentsInfo] = useState([]);

    useEffect(() => {
        const fetchResidentsInfo = async () => {
            const residentsPromises = planets.flatMap((planet) =>
                planet.residents.map((residentUrl) => axios.get(residentUrl))
            );

            try {
                const residentsData = await Promise.all(residentsPromises);
                setResidentsInfo(residentsData.map((res) => res.data));
            } catch (error) {
                console.error('Error fetching residents information', error);
            }
        };

        fetchResidentsInfo();
    }, [planets]);

    return (
        <div>
            <div className='container'>
                {planets ? (
                    planets.map((planet, planetIndex) => {
                        return (
                            <div key={planet.name} className='card-container'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h1 className='card-name'>{planet.name} </h1>
                                        <p className='card-climate'><strong>Climate:&nbsp;</strong>{planet.climate}</p>
                                        <p className='card-population'><strong>Population:&nbsp;</strong>{planet.population}</p>
                                        <p className='card-terrain'><strong>Terrain:&nbsp;</strong>{planet.terrain}</p>
                                        <span className='text-decoration-none ative'>
                                            <p>
                                                <strong>Residents List:</strong>
                                            </p>
                                        </span>
                                        {planet.residents.map((residentIndex, index) => {
                                            const residentInfo = residentsInfo.find(
                                                (info) => info.url === planet.residents[index]
                                            );

                                            return (
                                                <div key={index} className='residents'>
                                                    <p><strong>Name:</strong> {residentInfo ? residentInfo.name : 'N/A'}<br /></p>
                                                    <p><strong>Height:</strong> {residentInfo ? residentInfo.height : 'N/A'} <br /></p>
                                                    <p><strong>Mass:</strong> {residentInfo ? residentInfo.mass : 'N/A'} <br /></p>
                                                    <p><strong>Gender:</strong> {residentInfo ? residentInfo.gender : 'N/A'} <br /></p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default PlanetCard;


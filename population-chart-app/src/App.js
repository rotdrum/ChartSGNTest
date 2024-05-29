import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const filterCountries = [
        "China", "India", "United States", "Russia", "Japan",
        "Indonesia", "Germany", "Brazil", "United Kingdom",
        "Italy", "France", "Bangladesh"
    ];

    // Map data to the desired format and filter by country
    const mapData = data
        .filter(item => filterCountries.includes(item["Country name"]))
        .map(item => ({
            country: item["Country name"],
            year: parseInt(item["Year"]),
            population: parseInt(item["Population"])
        }));

    const uniqueYears = [...new Set(mapData.map(entry => entry.year))];
    const charts = uniqueYears.map(year => (
        <div key={year} style={{ marginBottom: '20px' }}>
            <h2>Population Growth per Country in {year}</h2>
            <ChartComponent data={mapData.filter(entry => entry.year === year)} />
        </div>
    ));

    return (
        <div className="App">
            <h1>Population Growth per Country, 1950 to 2021</h1>
            {charts}
        </div>
    );
}

export default App;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Typography, Box } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

const countryCodes = {
    China: 'CN',
    India: 'IN',
    'United States': 'US',
    Russia: 'RU',
    Japan: 'JP',
    Indonesia: 'ID',
    Germany: 'DE',
    Brazil: 'BR',
    'United Kingdom': 'GB',
    Italy: 'IT',
    France: 'FR',
    Bangladesh: 'BD'
};

const generateColor = (index) => {
    const colors = [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57',
        '#a4de6c', '#8dd1e1', '#ffbb28', '#d0ed57', '#8884d8'
    ];
    return colors[index % colors.length];
};

const CustomYAxisTick = ({ x, y, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject x={-50} y={-10} width={80} height={20}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ReactCountryFlag 
                        countryCode={countryCodes[payload.value]} 
                        svg 
                        style={{
                            width: '20px',
                            height: '15px',
                            marginRight: '5px',
                        }} 
                    />
                    <Typography variant="body2">{payload.value}</Typography>
                </div>
            </foreignObject>
        </g>
    );
};

const CustomLegend = ({ data }) => {
    return (
        <Box display="flex" justifyContent="center" flexWrap="wrap">
            {data.map((entry, index) => (
                <Box key={index} display="flex" alignItems="center" m={1}>
                    <Box
                        width={10}
                        height={10}
                        bgcolor={generateColor(index)}
                        mr={1}
                    />
                    <Typography variant="body2">{entry.country}</Typography>
                </Box>
            ))}
        </Box>
    );
};

const ChartComponent = ({ data }) => {
    // Sort data by population in descending order
    const sortedData = [...data].sort((a, b) => b.population - a.population);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart layout="vertical" data={sortedData}>
                            <XAxis type="number" />
                            <YAxis 
                                type="category" 
                                dataKey="country"
                                tick={CustomYAxisTick}
                            />
                            <Tooltip />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="population">
                                {sortedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={generateColor(index)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <CustomLegend data={sortedData} />
        </div>
    );
};

export default ChartComponent;

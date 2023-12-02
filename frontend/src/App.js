import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import './app.css'
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import { CircularProgress, Typography, MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import styled from 'styled-components';

import axios from 'axios'
import Card from './components/card/Card'
const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const k = {
    "restrounts": [
        {
            "address": "Gandipet Road On the Way to CBIT, Brindavan Colony, Hyderabad 500030 India",
            "cluster": 0,
            "distance": 0.15771173852410378,
            "latitude": 17.37656,
            "longitude": 78.38591,
            "name": "Cafe Sandwicho",
            "rating": 0.8,
            "weighted_score": 0.4146270431144623
        },
        {
            "address": "Gulshan Colony Beside MWS&SB , Behind Seven Tombs,, Tolichowki, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.9697261554187687,
            "latitude": 17.40209,
            "longitude": 78.3917,
            "name": "Hyderabad House Restaurant",
            "rating": 0.8,
            "weighted_score": 0.9018356932512612
        },
        {
            "address": "Salar Jung Colony, Beside RTA Office, Tolichowki, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.808856089923672,
            "latitude": 17.39682,
            "longitude": 78.39399,
            "name": "Bowl O' China",
            "rating": 0.8,
            "weighted_score": 0.8053136539542032
        },
        {
            "address": "Langar House Road, Opposite Vasavi College Of Engineering, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.7793921807212653,
            "latitude": 17.3641,
            "longitude": 78.3949,
            "name": "Taramati Baradari",
            "rating": 0.7000000000000001,
            "weighted_score": 0.7476353084327592
        },
        {
            "address": null,
            "cluster": 1,
            "distance": 0,
            "latitude": 0,
            "longitude": 0,
            "name": null,
            "rating": 0,
            "weighted_score": 0
        },
        {
            "address": "Narshingi, Gandipet Road, Gandipet Near Tara Bana, Hyderabad India",
            "cluster": 0,
            "distance": 0.15771173852410378,
            "latitude": 17.37656,
            "longitude": 78.38591,
            "name": "Down Town Junction",
            "rating": 0.9,
            "weighted_score": 0.45462704311446234
        },
        {
            "address": "Yousuf Tekri Colony Opposite R.T.A Office, Tolichowki, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.808856089923672,
            "latitude": 17.39682,
            "longitude": 78.39399,
            "name": "Mak's Kitchen",
            "rating": 1,
            "weighted_score": 0.8853136539542033
        },
        {
            "address": "21 Manikonda Village Infosys Campus, Seri Lingampally, Rajender Nagar, R.R. Dist, Hyderabad 500032 India",
            "cluster": 2,
            "distance": 0.7383965238034277,
            "latitude": 17.3956,
            "longitude": 78.3748,
            "name": "Domino's Pizza",
            "rating": 0.8,
            "weighted_score": 0.7630379142820567
        },
        {
            "address": "Dilip Supermarket, Puppalaguda, Manikonda, Hyderabad India",
            "cluster": 2,
            "distance": 0.8800972787106426,
            "latitude": 17.40074,
            "longitude": 78.38822,
            "name": "Delhiwala Chaat",
            "rating": 0.9,
            "weighted_score": 0.8880583672263855
        },
        {
            "address": "Shop No. 889, Sairam Nagar, Puppalaguda, Manikonda Beside Tharuni Supermarket, Hyderabad India",
            "cluster": 2,
            "distance": 0.9262648193548305,
            "latitude": 17.40226,
            "longitude": 78.38224,
            "name": "Muffin Bakers",
            "rating": 0.9,
            "weighted_score": 0.9157588916128983
        },
        {
            "address": "Ocean Park Cross Roads, Gandipet Road, Ganndipet, Hyderabad India",
            "cluster": 0,
            "distance": 0.15771173852410378,
            "latitude": 17.37656,
            "longitude": 78.38591,
            "name": "Sri Renuka Family Dhaba",
            "rating": 0.9,
            "weighted_score": 0.45462704311446234
        },
        {
            "address": null,
            "cluster": 1,
            "distance": 0,
            "latitude": 0,
            "longitude": 0,
            "name": null,
            "rating": 0,
            "weighted_score": 0
        },
        {
            "address": "Plot 3, Pochamma Colony, Pipeline Road, Manikonda, Hyderabad 500018 India",
            "cluster": 2,
            "distance": 0.8284145109354069,
            "latitude": 17.39813,
            "longitude": 78.37499,
            "name": "Chickpet Donne Biryani Manikonda",
            "rating": 1,
            "weighted_score": 0.8970487065612441
        },
        {
            "address": "9 - 5 - 1/A Ashraf Coffee House Gandipet Road, Hyderabad 500031 India",
            "cluster": 0,
            "distance": 0.15771173852410378,
            "latitude": 17.37656,
            "longitude": 78.38591,
            "name": "Ashraf Coffee House",
            "rating": 1,
            "weighted_score": 0.49462704311446226
        },
        {
            "address": "Adam's Colony Beside Tv Showroom, Tolichowki, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.808856089923672,
            "latitude": 17.39682,
            "longitude": 78.39399,
            "name": "Hotel Adam's Victoria Restaurant",
            "rating": 1,
            "weighted_score": 0.8853136539542033
        },
        {
            "address": "9-4-86/38, Salarjung Colony, Near Rta Office, Tolichowki, Hyderabad India",
            "cluster": 2,
            "distance": 0.808856089923672,
            "latitude": 17.39682,
            "longitude": 78.39399,
            "name": "Marrybrown",
            "rating": 1,
            "weighted_score": 0.8853136539542033
        },
        {
            "address": "Shop No. 162, Nizaam Colony, Tolichowki Beside Kaba Hospital, Hyderabad India",
            "cluster": 2,
            "distance": 0.808856089923672,
            "latitude": 17.39682,
            "longitude": 78.39399,
            "name": "Hotel Zishan Restaurant",
            "rating": 1,
            "weighted_score": 0.8853136539542033
        },
        {
            "address": "Ocean Park cross Roads, Gandipet Road, Gandipet, Hyderabad India",
            "cluster": 0,
            "distance": 0.15771173852410378,
            "latitude": 17.37656,
            "longitude": 78.38591,
            "name": "HKGN Family Dhaba",
            "rating": 1,
            "weighted_score": 0.49462704311446226
        },
        {
            "address": null,
            "cluster": 1,
            "distance": 0,
            "latitude": 0,
            "longitude": 0,
            "name": null,
            "rating": 0,
            "weighted_score": 0
        },
        {
            "address": "Indira Nagar Gachibowli Ibrahim Bagh Lines, Hyderabad 500031 India",
            "cluster": 0,
            "distance": 0.2381037154318609,
            "latitude": 17.38402,
            "longitude": 78.37958,
            "name": "Hot Rottis North Indian Veg Restaurant 4",
            "rating": 0.8,
            "weighted_score": 0.4628622292591166
        },
        {
            "address": "Manikonda Road, Opposite Star Gym, Hyderabad 500033 India",
            "cluster": 2,
            "distance": 0.9999999999999999,
            "latitude": 17.4029,
            "longitude": 78.3758,
            "name": "Pritto's",
            "rating": 0.8,
            "weighted_score": 0.9199999999999999
        },
        {
            "address": "Pupalguda Road, Opposite Prerana Hospital, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.9083496120509034,
            "latitude": 17.40176,
            "longitude": 78.38597,
            "name": "Laxmi Venkateshwara Tiffins & Fast Food",
            "rating": 0.8,
            "weighted_score": 0.865009767230542
        },
        {
            "address": "Near Pratibha School, Secretariat Colony, Manikonda, Hyderabad India",
            "cluster": 2,
            "distance": 0.8915145045424215,
            "latitude": 17.40133,
            "longitude": 78.38615,
            "name": "Urmila's Premium Biryani House",
            "rating": 0.8,
            "weighted_score": 0.8549087027254529
        },
        {
            "address": "Road Number I Banjara Hills, Hyderabad 500034 India",
            "cluster": 2,
            "distance": 0.7296010160823783,
            "latitude": 17.36274,
            "longitude": 78.38897,
            "name": "Lido Restaurant",
            "rating": 0.6000000000000001,
            "weighted_score": 0.677760609649427
        },
        {
            "address": "9 4 77/3A, Yousif Tekri Complex Opposite Salarjung Colony, Tolichowki, Hyderabad 500008 India",
            "cluster": 2,
            "distance": 0.808856089923672,
            "latitude": 17.39682,
            "longitude": 78.39399,
            "name": "Fishermans Fare Restaurant",
            "rating": 0.6000000000000001,
            "weighted_score": 0.7253136539542032
        },
        {
            "address": "1 Road Number, Hyderabad 500034 India",
            "cluster": 0,
            "distance": 0.7296010160823783,
            "latitude": 17.36274,
            "longitude": 78.38897,
            "name": "Smokin Joes",
            "rating": 0.5,
            "weighted_score": 0.6377606096494269
        },
        {
            "address": "Mythri Grand, Shivalayam Road, Puppalaguda - Manikonda Main Rd, Hyderabad 500089 India",
            "cluster": 0,
            "distance": 0.7409900869763721,
            "latitude": 17.39678,
            "longitude": 78.37745,
            "name": "U.S.Pizza",
            "rating": 0,
            "weighted_score": 0.44459405218582326
        },
        {
            "address": "Puppalaguda, Near Heritage Fresh, Manikonda, Hyderabad India",
            "cluster": 0,
            "distance": 0.8800972787106426,
            "latitude": 17.40074,
            "longitude": 78.38822,
            "name": "Just Biryani",
            "rating": 0,
            "weighted_score": 0.5280583672263855
        }
    ]
}
const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [data, setData] = useState()
    useEffect(() => { setData(undefined) }, [coordinates])
    console.log(data?.data, ' ----------------------------------------------------')

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [days, setDays] = useState(3)


    //GPS person geolocation
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() => {
        (async () => {
            try {

                if (bounds.sw && bounds.ne) {
                    setIsLoading(true);
                    getPlacesData(type, bounds.sw, bounds.ne)
                        .then((data) => {

                            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                            setFilteredPlaces([]);
                            setIsLoading(false);
                        })
                    const data = await axios.post('http://127.0.0.1:5000/', { type, sw: bounds.sw, ne: bounds.ne, days });
                    setData(data)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            {/* <div>
                <label htmlFor="myInput">Number of days</label>
                <StyledInput type="numeric" id="myInput" value={days} onChange={(e) => setDays(e.target.value)} />
            </div> */}
            {data &&
                <div style={{}}>
                    {/* {Array(days).map((item) => { */}
                        <div className='scrollable-container' >
                            <div className='container'>
                                {[...data.data['restrounts']].filter(obj => obj.cluster === 0).map((item) => (
                                    <div className='item' key={item.id}>
                                        <Card item={item} />
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                        <div className='scrollable-container'>
                            <div className='container'>
                                {[...data.data['attractions']].filter(obj => obj.cluster === 0).map((item) => (
                                    <div className='item' key={item.id}>
                                        <Card item={item} />
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    {/* })} */}
                </div>

            }
            {!data && <div className='banner'><div><CircularProgress size="5rem" /></div></div>}
            <Grid container style={{ height: '100vh', width: '100%', margin: 0, display: data ? 'none' : 'block' }}>
                <Grid item xs={12} sm={6} md={8} lg={9} style={{ position: 'relative' }}>
                    <div className='map'>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            setChildClicked={setChildClicked}
                            setData={setData}
                        />

                    </div>
                </Grid>

            </Grid>
        </>
    )
};

export default App;
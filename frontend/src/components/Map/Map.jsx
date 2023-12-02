import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, useMediaQuery, Typography } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from "@material-ui/lab/Rating";

import useStyles from './styles';
import mapStyles from '../../mapStyles';
import axios from "axios";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, setData }) => {
    const isDesktop = useMediaQuery('(min-width:600px)');
    const classes = useStyles();
    function getBounds(center, radius) {
        const earthRadius = 6371; // Earth's radius in kilometers

        const latDelta = (radius / earthRadius) * (180 / Math.PI);
        const lngDelta = (radius / earthRadius) * (180 / Math.PI) / Math.cos((center.lat * Math.PI) / 180);

        const sw = {
            lat: center.lat - latDelta,
            lng: center.lng - lngDelta,
        };
        const ne = {
            lat: center.lat + latDelta,
            lng: center.lng + lngDelta,
        };

        return { sw, ne };
    }

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // style={{ display: 'none' }}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={async (e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })

                    // const k = getBounds(e.center, 5)
                    // console.log(k)
                    // setBounds({ ...k })
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"}
                                        alt={place.name} />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )}
                    </div>
                ))
                }
            </GoogleMapReact >
        </div>
    )
}

export default Map;


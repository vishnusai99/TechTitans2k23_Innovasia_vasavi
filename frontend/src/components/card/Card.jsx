import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoomIcon from '@mui/icons-material/Room';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import './card.css';



const defaultTheme = createTheme();



// ... (Previous imports remain unchanged)

export default function SignInSide({ item }) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" className='card'>
                <CssBaseline />
                <Grid
                    item
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // Adjust maxWidth and margin for smaller card size
                        maxWidth: '40%', // You can adjust this value as needed
                        margin: 'auto',
                        borderRadius: '4%',
                    }}
                >
                    <Box
                        sx={{
                            my: 2,
                            mx: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Top part divided into horizontal layout */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} md={6}>
                                {/* Image on the left */}
                                <div className='image'>

                                    <img
                                        src={item?.image ? item.image : "https://source.unsplash.com/random?office"}
                                        alt="office"
                                        style={{ width: 200, height: 200 }}
                                        className='image'
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* Paragraph on the right */}
                                <Typography>
                                    {item?.name}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
                                    <div className='row'>
                                        <IconButton className='icon' color="success">
                                            <RoomIcon />
                                        </IconButton>
                                        <p className='text' >{item?.address}</p>
                                    </div>
                                    <div className='row'>
                                        <IconButton color="black" className='icon'>
                                            <AttachMoneyIcon />
                                        </IconButton>
                                        <p className='text'>{item?.price || '$8.00 - $17.00'}</p>
                                    </div>
                                    {/* Rating component */}
                                    <Rating name="rating" defaultValue={item['rating-original'] || 0} precision={0.5} />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Divider */}
                        <Divider sx={{ width: '100%', my: 2 }} />

                        {/* Additional paragraphs at the bottom */}
                        <Typography variant="body2" color="text.secondary" align="left">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum sint et doloribus
                            magnam aspernatur fuga laudantium consectetur officia quisquam labore autem est
                            quidem cumque magni eaque, illum ullam vitae nostrum, ipsa dolorem perferendis
                            aliquam! Iure, nem
                        </Typography>

                        {/* Icons at the bottom */}

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
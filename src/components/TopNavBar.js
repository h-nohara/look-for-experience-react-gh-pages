import React from 'react';
import { useState, useContext } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import { Grid, IconButton, } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import './TopNavBar.css';
import { FeedFilterForm } from "./FeedFilterForm"

// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };


const TopNavBar = () => {
    // 絞り込みモーダル
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpened(open);
    };

    return (
        <div id="topNavContainer">
            <Grid container spacing={3}>
                <Grid item xs>
                </Grid>
                <Grid item xs={8}>
                    <h2><span>フォロー中</span>  |   <span>おすすめ</span></h2>
                </Grid>
                <Grid item xs
                    container
                    alignItems="center">
                    <IconButton color="default" size="large" onClick={toggleDrawer(true)}>
                        <TuneIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <SwipeableDrawer
                variant="temporary"
                anchor="right"
                open={isDrawerOpened}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                    sx: {
                        width: "450px"
                    }
                }}
            >
                <FeedFilterForm toggleDrawer={toggleDrawer}></FeedFilterForm>
            </SwipeableDrawer>
        </div >
    );
};

export default TopNavBar;
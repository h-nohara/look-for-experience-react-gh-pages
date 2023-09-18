import React from 'react';
import { useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';

import './TopNavBar.css'
import {
    Grid, IconButton, Button, Box,
    OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip
} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

const costList = [
    "1000円以内",
    "1000円〜3000円",
    "3000円以上"
];

const durationList = [
    "１時間以内",
    "１時間〜３時間",
    "３時間以上"
];

const distanceList = [
    "近所",
    "そんなに遠くない",
    "旅行"
];

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

    function applyFilter() {
        console.log(cost, duration, distance);
        toggleDrawer(false)();
    }

    // 絞り込みフォーム

    const [cost, setCost] = useState([]);
    const [duration, setDuration] = useState([]);
    const [distance, setDistance] = useState([]);
    const categoryFuncMap = {
        "cost": setCost,
        "duration": setDuration,
        "distance": setDistance,
    }

    const handleSelected = (category) => (event) => {
        const {
            target: { value },
        } = event;
        const f = categoryFuncMap[category];
        f(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const categoryConfig = [
        {
            key: "cost",
            label: "料金",
            itemList: cost,
            allItemList: costList,
        },
        {
            key: "duration",
            label: "所要時間",
            itemList: duration,
            allItemList: durationList,
        }, {
            key: "distance",
            label: "近さ",
            itemList: distance,
            allItemList: distanceList,
        },
    ];

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
                <Box textAlign='center'>
                    <h2>絞り込み</h2>
                    {
                        categoryConfig.map(function (conf) {
                            return (
                                <FormControl
                                    sx={{ m: 1, width: 300 }}
                                    key={conf.key}
                                >
                                    <InputLabel id="cost-filter-label">{conf.label}</InputLabel>
                                    <Select
                                        labelId="cost-filter-label"
                                        multiple
                                        value={conf.itemList}
                                        onChange={handleSelected(conf.key)}
                                        input={
                                            <OutlinedInput
                                                // id="select-multiple-chip"
                                                label={conf.label} />
                                        }
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {conf.allItemList.map((v) => (
                                            <MenuItem
                                                key={v}
                                                value={v}
                                            // style={getStyles(v, cost, theme)}
                                            >
                                                {v}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        })
                    }
                    <Button
                        onClick={applyFilter}
                        variant="outlined"
                        sx={{ marginTop: "50px", width: "50%" }}
                    >
                        決定
                    </Button>
                </Box>
            </SwipeableDrawer>
        </div >
    );
};

export default TopNavBar;
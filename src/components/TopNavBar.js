import React from 'react';
import { useState, useContext } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import {
    Grid, IconButton, Button, Box,
    OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip
} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import './TopNavBar.css';
import { AppContext } from "../App";


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

const categoryList = [
    "飲食",
    "遊び",
    "休憩"
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

    // 絞り込みフォーム

    const context = useContext(AppContext);

    const [cost, setCost] = useState([]);
    const [category, setCategory] = useState([]);
    const [distance, setDistance] = useState([]);

    const categoryConfig = [
        {
            key: "cost",
            label: "料金",
            selectedItemList: cost,
            updateFunc: setCost,
            allItemList: costList,
        },
        {
            key: "category",
            label: "カテゴリー",
            selectedItemList: category,
            updateFunc: setCategory,
            allItemList: categoryList,
        }, {
            key: "distance",
            label: "近さ",
            selectedItemList: distance,
            updateFunc: setDistance,
            allItemList: distanceList,
        },
    ];

    const handleSelected = (key) => (event) => {
        const {
            target: { value },
        } = event;
        // On autofill we get a stringified value.
        const newVal = typeof value === 'string' ? value.split(',') : value;
        let conf = null;
        for (let c of categoryConfig) {
            if (key == c.key) {
                conf = c;
                break;
            }
        }
        conf.updateFunc(newVal);
    };

    function applyFilter() {
        console.log(cost, category, distance);
        context.setFeedFilter({
            "cost": cost,
            "category": category,
            "distance": distance,
        });
        toggleDrawer(false)();
    }

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
                                    <InputLabel>{conf.label}</InputLabel>
                                    <Select
                                        multiple
                                        value={conf.selectedItemList}
                                        onChange={handleSelected(conf.key)}
                                        input={
                                            <OutlinedInput
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
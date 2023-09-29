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
import { costChoiceList, categoryChoiceList, distanceChoiceList } from "./feedFilter";

// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

function getChoiceDisplayNameFromKey(key, selectionInfo) {
    for (let c of selectionInfo.choiceList) {
        if (c.key == key) {
            return c.displayName;
        }
    }
    return "not found name";
}


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

    const selectionConfig = [
        {
            key: "cost",
            label: "料金",
            selectedItemList: cost,
            updateFunc: setCost,
            choiceList: costChoiceList,
        },
        {
            key: "category",
            label: "カテゴリー",
            selectedItemList: category,
            updateFunc: setCategory,
            choiceList: categoryChoiceList,
        },
        {
            key: "distance",
            label: "近さ",
            selectedItemList: distance,
            updateFunc: setDistance,
            choiceList: distanceChoiceList,
        }
    ];

    const handleSelected = (key) => (event) => {
        const {
            target: { value },
        } = event;
        // On autofill we get a stringified value.
        const newVal = typeof value === 'string' ? value.split(',') : value;
        let conf = null;
        for (let c of selectionConfig) {
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
                        selectionConfig.map(function (conf) {
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
                                                    <Chip key={value} label={getChoiceDisplayNameFromKey(value, conf)} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {conf.choiceList.map((selectionInfo) => (
                                            <MenuItem
                                                key={`${conf.key}-${selectionInfo.key}`}
                                                value={selectionInfo.key}
                                            // style={getStyles(v, cost, theme)}
                                            >
                                                {selectionInfo.displayName}
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
import React from 'react';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from '@mui/icons-material/Restore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import './BottomNavBar.css'


const BottomNavbar = () => {
    return (
        <div id="bottomNavContainer">
            <BottomNavigation
                style={{ height: "100%" }}
            // showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Add" icon={<AddBoxIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default BottomNavbar;
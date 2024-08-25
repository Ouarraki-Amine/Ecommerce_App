import React from "react";
import { AppBar,  Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@mui/material";
import { ShoppingCart} from "@mui/icons-material";
import logo from '../../assets/bird_2.jpg';
import useStyles from './styles';
import { Link,useLocation } from "react-router-dom";


const Navbar = ({itemCart}) => {
    const classes = useStyles();
    const location= useLocation();

    return ( 
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="80px" className={classes.image} />
                        commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                     {location.pathname==="/" && <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={itemCart} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>}  
                    </div>
                </Toolbar>
            </AppBar>
        </>
     );
}
 
export default Navbar;
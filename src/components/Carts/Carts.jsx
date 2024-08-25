import React from "react";
import { Container, Typography, Button, Grid } from '@mui/material';
import useStyles from './styles';
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";



const Cart = ({cart, onUpdateToCart,onRemoveCart,onEmptyCart}) => {
    
    const classes = useStyles();
    
    const EmptyCart = ()=>{
        return(
        <Typography variant="subtitle1">You have no items in your shopping cart,
        <Link to="/" className={classes.link}>start adding some!</Link></Typography>
        )}

    const FilledCart = ()=>{
        return(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onRemoveCart={onRemoveCart} onUpdateToCart={onUpdateToCart} />
                    </Grid>
                    ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} onClick={()=>{onEmptyCart()}} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" component={Link} to="/checkout" color="primary">Checkout</Button>
                </div>
            </div>
        </>)
    }
    if(!cart || !cart.line_items){
        
        return 'loading...'
    }
    return ( 
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart/>:<FilledCart/>}
        </Container>
     );
}
 

export default Cart;
import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import useStyles from './styles';


const CartItem = ({ item, onUpdateToCart,onRemoveCart }) => {
    const classes = useStyles();
    
    return (
        <>
            <Card>
                <CardMedia className={classes.media} image={item.image.url} alt={item.name} />
                <CardContent className={classes.CardContent}>
                    <Typography variant='h4'>{item.name}</Typography>
                    <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
                </CardContent>
                <CardActions className={classes.CardActions}>
                    <div className={classes.buttons}>
                        <Button type="button" onClick={()=>onUpdateToCart(item.id,item.quantity-1)} size='small'>-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type='button'  onClick={()=>onUpdateToCart(item.id,item.quantity+1)} size='small'>+</Button>
                    </div>
                    <button variant="contained" onClick={()=>onRemoveCart(item.id)} type='button' color='secondary'>Remove</button>
                </CardActions>
            </Card>
        </>
    )
}

export default CartItem;
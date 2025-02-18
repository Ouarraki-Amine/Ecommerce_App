import React, { useEffect, useState } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@mui/material';
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from "../PaymentForm";
import { Link } from "react-router-dom";
import { commerce } from "../../../lib/commerce";


const steps = ['Shipping address','Payment details',];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep]=useState(0)
    const [shippingData, setShippingData]=useState('');
    const [checkoutToken, setCheckoutToken]=useState(null);
    const classes =useStyles();

    

    let Confirmation = ()=> order.customer ? (
    
            <>
            
            <div>
                <Typography variant="h5">Thank you for your pruchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference} </Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error){
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const nextStep =()=> setActiveStep((prevActiveStep)=> prevActiveStep+1);
    const backStep =()=> setActiveStep((prevActiveStep)=> prevActiveStep-1);

    const next =(data)=>{

        setShippingData(data)

        nextStep();
    }

    const Form = ()=>{ 
        if (activeStep=== 0){
        return (<AddressForm checkoutToken={checkoutToken} next={next}/>)}
        else {return (<PaymentForm shippingData={shippingData} back={backStep} next={next} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout}/>)}

    }

    useEffect(()=>{
        const generateToken = async ()=>{
            try{
            const token = await commerce.checkout.generateToken(cart.id, {type:'cart'} );
            console.log(token)
            setCheckoutToken(token);
            }catch(error){
                console.log(error)

            }
        }

        generateToken()
    },[cart])

    return ( 
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length?<Confirmation/>: checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
     );
}
 
export default Checkout;
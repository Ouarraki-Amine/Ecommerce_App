import React, { useEffect, useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import {useForm, FormProvider} from 'react-hook-form'
import { commerce } from '../../lib/commerce'
import FormInput from './FormInput';
import { Link } from 'react-router-dom';

const AddressForm = ({checkoutToken, next}) => {
  const [shippingCountries, setShippingCountries]= useState([]);
  const [shippingCountry, setShippingCountry]= useState('');
  const [shippingSubdivisions, setShippingSubdivisions]= useState([]);
  const [shippingSubdivision, setShippingSubdivision]= useState('');
  const [shippingOptions, setShippingOptions]= useState([]);
  const [shippingOption, setShippingOption]= useState('');
  const methods = useForm();
  const countries = Object.entries(shippingCountries).map(([code,name])=>({id: code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({id: code, label: name}));
  const options = shippingOptions.map((sO)=>({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))
  console.log(shippingOptions)

  const fetchShippingCountries = async (checkoutTokenId)=>{
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    console.log(Object.keys(countries)[0])
    setShippingCountry(Object.keys(countries)[0])//j'ai pas bien compris
  }


  const fetchShippingSubdivisions = async (countryCode) =>{
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0])//j'ai pas bien compris
  }

  const fetchShippingOptions = async ( checkoutTokenId, country, region= null) =>{
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country, region});

    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  useEffect(()=>{
    fetchShippingCountries(checkoutToken.id)
  },[])

  useEffect(()=>{
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry)
  },[shippingCountry])

  useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry,shippingSubdivision)
  },[shippingSubdivision])
  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider { ...methods}>
            <form onSubmit={methods.handleSubmit((data)=> next({...data, shippingCountry,shippingSubdivision,shippingOption}))}>
                <Grid container spacing={3}>
                    <FormInput required v-model="form.customer.firstName" name='firstName' label ='First name'/>
                    <FormInput required v-model="form.customer.lastName" name='lastName' label ='Last name'/>
                    <FormInput required v-model="form.shipping.street" name='address1' label ='Address'/>
                    <FormInput required v-model="form.customer.email" name='email' label ='Email'/>
                    <FormInput required v-model="form.shipping.city" name='city' label ='City'/>
                    <FormInput required v-model="form.shipping.postalZipCode" name='zip' label ='ZIP / Postal code'/>
                    <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                              {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                {country.label} 
                                </MenuItem>
                              ))}
                            </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
                              {subdivisions.map((subdivision)=>(
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label} 
                                </MenuItem>
                              ))}
                            </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Shipping Options</InputLabel>
                      <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)}>
                        {options.map((option)=>(
                        <MenuItem key={option.id} value={option.id}>
                           {option.label} 
                        </MenuItem>
                         ))}
                      </Select>
                    </Grid>
                </Grid>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                  <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm
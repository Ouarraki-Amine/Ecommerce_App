import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products"
import { commerce } from "./lib/commerce";
import Carts from "./components/Carts/Carts"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";




function App() {
  const [products, setProducts]=useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder]= useState({});
  const [errorMessage, setErrorMessage]=useState('');

  const fetchProducts = async()=>{
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async()=>{
    const data1 = await commerce.cart.retrieve();
    setCart(data1)
  }

  const handleAddToCart = async (productId, quantity)=>{
    const item = await commerce.cart.add(productId,quantity);
    setCart(item);
   
  }

  const handleUpdateCartQty = async (lineItemId, quantity) => {
   const qty = await commerce.cart.update(lineItemId, { quantity });
   setCart(qty);
  }

  const handleRemoveCart = async (lineItemId)=>{
    const sup = await commerce.cart.remove(lineItemId);
    setCart(sup);
  }

  const handleEmptyCart = async ()=>{
    const emp = await commerce.cart.empty();
    setCart(emp);
  }


  const refreshCart = async()=>{

    const newCart = await commerce.cart.refresh();
    setCart(newCart);

  }


  const handleCaptureCheckout = async (CheckoutTokenId, newOrder)=>{
    try{
      const incomingOrder= await commerce.checkout.capture(CheckoutTokenId,newOrder);

      setOrder(incomingOrder)
      console.log("ssssss")
      refreshCart();
    }catch(error){
        setErrorMessage(error.data.error.message);
    }
  }
  console.log(cart)
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
  
  return (
    <>
      <Router>
        <div>
        <Navbar itemCart={cart.total_items}/>
          <Routes>
            <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
            <Route exact path="/cart" element={
              <Carts 
                onRemoveCart={handleRemoveCart} 
                onEmptyCart={handleEmptyCart}
                onUpdateToCart={handleUpdateCartQty}  
                cart={cart} 
              />}
            />
            <Route exact path="/checkout" element={
              <Checkout 
                cart={cart} 
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />}/>
          </Routes>  
        </div>
      </Router>
    </>
  )
}
export default App;

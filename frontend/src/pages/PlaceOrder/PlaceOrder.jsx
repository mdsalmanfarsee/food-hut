import React, { useContext, useEffect, useMemo, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, token, food_list, url } = useContext(StoreContext);
    const cartTotal = useMemo(() => getTotalCartAmount(), [cartItems]);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((data) => ({ ...data, [name]: value }));

    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = []

        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount(),
        }

        const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

        if (response.data.success) {
            toast.success("Order Placed Successfully!")
            setTimeout(() => {
                navigate('/myorders')
            }, 1000)

        }
        else {
            alert('Error')
        }

    }


    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className='place-order-left'>
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name' name='firstName' value={data.firstName} onChange={onChangeHandler} required />
                    <input type="text" placeholder='Last Name' name='lastName' value={data.lastName} onChange={onChangeHandler} required />
                </div>
                <input type="email" placeholder='Email address' name='email' value={data.email} onChange={onChangeHandler} required />
                <input type="text" placeholder='Street' name='street' value={data.street} onChange={onChangeHandler} required />
                <div className="multi-fields">
                    <input type="text" placeholder='City' name='city' value={data.city} onChange={onChangeHandler} required />
                    <input type="text" placeholder='State' name='state' value={data.state} onChange={onChangeHandler} required />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder='Zip code' name='zipCode' value={data.zipCode} onChange={onChangeHandler} required />
                    <input type="text" placeholder='Country' name='country' value={data.country} onChange={onChangeHandler} required />
                </div>
                <input type="text" placeholder='Phone' name='phone' value={data.phone} onChange={onChangeHandler} required />
            </div>
            <div className='place-order-right'>
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${cartTotal}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>

                            <p>${cartTotal >= 250 ? "Free" : cartTotal === 0 ? "0" : "29"}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>${cartTotal < 250 ? cartTotal === 0 ? cartTotal : `${cartTotal + 29}` : cartTotal}</p>
                        </div>
                    </div>
                    <button type='submit'>Proceed to Payment</button>
                </div>
            </div>
            <ToastContainer />
        </form>
    )
}

export default PlaceOrder;
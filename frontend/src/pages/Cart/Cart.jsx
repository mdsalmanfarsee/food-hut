import React, { useContext, useMemo } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
    const navigate = useNavigate();
    const cartTotal = useMemo(() => getTotalCartAmount(), [cartItems]);

    const onClickHandler = () => {
        if (!token) {
            toast.error("You need to Login first");
            setTimeout(() => {
                navigate('/cart');
            }, 5000);

        }
        else if (cartTotal === 0) {
            toast.error("Add something in the cart first");
            setTimeout(() => {
                navigate('/cart');
            }, 5000);
        }
        else {
            navigate('/order');
        }
    }
    const removeItemHandler = (id) => {
        removeFromCart(id)
        toast.success("Item removed");
    }


    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div>
                                    <div className='cart-items-title cart-items-item'>
                                        {/* <img src={url + "/images/" + item.image} alt="" /> */}
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>{item.price * cartItems[item._id]}</p>
                                        <p onClick={() => removeItemHandler(item._id)} className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="cart-bottom">
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
                    <button onClick={onClickHandler}>Proceed to Checkout</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promocode, enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promocode' />
                            <button>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}


export default Cart;
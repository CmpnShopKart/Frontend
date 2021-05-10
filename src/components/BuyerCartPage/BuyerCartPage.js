import React,{useEffect,useState} from 'react';
import './BuyerCartPage.scss';
import {connect} from 'react-redux'
import {removeFromCart,clearCart} from '../../redux/buyer/buyer.actions';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const BuyerCartPage = (props) => {

    useEffect(() => {
        var cartAmount = 0;
        props.buyer.cartItems.map(product => cartAmount = cartAmount + product.product_price);
        setCartTotal(cartAmount);
        setCartTotal(cartAmount);
    },[props.buyer])

    const [cartTotal,setCartTotal] = useState(0);

    const onToken = async(token) => {
        alert("Payment successful");
        const productArr = [];
        props.buyer.cartItems.map(product => {
            const productObj = {
                ProductId:product._id,
                isProductProcessed:false,
                isProductShipped:false,
                isProductDelivered:false
            }
            productArr.push(productObj);
        })
        const formData = new FormData();
        formData.append('Products',productArr);
        formData.append('userId',props.buyer.buyerData._id);
        const orderObj = {
            Products:productArr,
            UserId:props.buyer.buyerData._id
        }
        const res = await axios.post('/user/postorders',orderObj);
        if(res.status===200){
            props.clearCart();
            alert("Order placed successfully");    
        }
    }

    const publishableKey='pk_test_51HYvvrB9Pkw3eQ0jCmSwvf7ohXkZuj3mWzNLJ9Zdm02izIHCMcAMV6uTiTiPt6i76dNn7ic8c6Oe8JRfNCflGmAq00p185MJFI'

    return(
        <div className='buyer-cart-page-container'> 
            <div className='buyer-cart-page-container__header'>
                <ul className='buyer-cart-page-container__header__list'>
                    <li 
                        className='buyer-cart-page-container__header__list__item' 
                        onClick={() => props.history.push('/buyer/home')}
                    >
                        Home
                    </li>
                    <li 
                        className='buyer-cart-page-container__header__list__item active'
                    >
                        Cart
                    </li>
                    <li 
                        className='buyer-cart-page-container__header__list__item'
                        onClick={() => props.history.push('/buyer/orders')}
                    >
                        Orders
                    </li>
                    <li 
                        className='buyer-cart-page-container__header__list__item'
                    >
                        Logout
                    </li>
                </ul>
            </div>
            <div className='buyer-cart-page-container__items'>
                {(props.buyer.cartItems.length===0)?<h3>Please add some products to cart</h3>:null}
                {
                    props.buyer.cartItems.map(product => {
                        return(
                            <div className='buyer-cart-page-container__items__product-card' key={product._id}>
                                <div className='buyer-cart-page-container__items__product-card__img'>
                                    <img src={product.product_image}></img>
                                </div>
                                <div className='buyer-cart-page-container__items__product-card__details'>
                                    <h5 className='title'>{product.product_name}</h5>
                                    <p>{product.product_description}</p>
                                    <h5 className='price'>{product.product_price}</h5>
                                    <div className='buyer-cart-page-container__items__product-card__details__cq'>
                                        <div                    className='buyer-cart-page-container__items__product-card__details__cq__c'>
                                            <h6>Category</h6>
                                            <p>{product.product_category}</p>
                                        </div>
                                        <div                    className='buyer-cart-page-container__items__product-card__details__cq__q'>
                                            <i className='bi bi-trash' onClick={() => props.removeFromCart(product._id)}></i>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {(cartTotal>0)?<div className='buyer-cart-page-container__panel'>
                <h4 className='buyer-cart-page-container__panel__total'>Total Rs. {cartTotal}</h4>
                <div className='buyer-cart-page-container__panel__checkout'>
                    <StripeCheckout
                        label='Pay now'
                        name='Shopkart Ltd.'
                        billingAddress
                        shippingAddress
                        description={`Your total is ${cartTotal}`}
                        amount={cartTotal*100}
                        panelLabel='Pay now'
                        token={onToken}
                        currency='INR'
                        stripeKey={publishableKey}
                    />
                </div>
            </div>:null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    buyer:state.buyer
})

const mapDispatchToProps = (dispatch) => ({
    removeFromCart : (productId) => dispatch(removeFromCart(productId)),
    clearCart : () => dispatch(clearCart())
})

export default connect(mapStateToProps,mapDispatchToProps)(BuyerCartPage);
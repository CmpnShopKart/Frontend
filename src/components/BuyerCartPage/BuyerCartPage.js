import React,{useEffect,useState} from 'react';
import './BuyerCartPage.scss';
import {connect} from 'react-redux'
import {removeFromCart} from '../../redux/buyer/buyer.actions';

const BuyerCartPage = (props) => {

    useEffect(() => {
        var cartAmount = 0;
        props.buyer.cartItems.map(product => cartAmount = cartAmount + product.product_price);
        setCartTotal(cartAmount);
        setCartTotal(cartAmount);
    },[props.buyer])

    const [cartTotal,setCartTotal] = useState(0);

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
            <h4>Total :- {cartTotal}</h4>
        </div>
    )
}

const mapStateToProps = (state) => ({
    buyer:state.buyer
})

const mapDispatchToProps = (dispatch) => ({
    removeFromCart : (productId) => dispatch(removeFromCart(productId))
})

export default connect(mapStateToProps,mapDispatchToProps)(BuyerCartPage);
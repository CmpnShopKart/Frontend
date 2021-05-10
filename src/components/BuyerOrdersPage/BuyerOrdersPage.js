import React,{useEffect} from 'react';
import './BuyerOrdersPage.scss';
import {getUserOrders} from '../../redux/buyer/buyer.actions';
import {connect} from 'react-redux';
import moment from 'moment';

const BuyerOrdersPage = (props) => {

    useEffect(() => {
        const getData = async(userId) => {
            const res = await props.getUserOrders(userId);
            return res;
        }
        const res = getData(props.buyer.buyerData._id);
        console.log(res.data)
    },[])

    return(
        <div className='buyer-orders-page-container'>
            <div className='buyer-orders-page-container__header'>
                <ul className='buyer-orders-page-container__header__list'>
                    <li 
                        className='buyer-orders-page-container__header__list__item' 
                        onClick={() => props.history.push('/buyer/home')}
                    >
                        Home
                    </li>
                    <li 
                        className='buyer-orders-page-container__header__list__item'
                    >
                        Cart
                    </li>
                    <li 
                        className='buyer-orders-page-container__header__list__item active'
                        onClick={() => props.history.push('/buyer/orders')}
                    >
                        Orders
                    </li>
                    <li 
                        className='buyer-orders-page-container__header__list__item'
                    >
                        Logout
                    </li>
                </ul>
            </div>
            <div className='buyer-orders-page-container__items'>
                <h2>Your Previous Orders</h2>
                {
                    props.buyer.orders.map(product => {
                        return(
                            <div className='buyer-orders-page-container__items__product-card' key={product._id}>
                                <div className='buyer-orders-page-container__items__product-card__img'>
                                    <img src={product.product_image}></img>
                                </div>
                                <div className='buyer-orders-page-container__items__product-card__details'>
                                    <h5 className='title'>{product.product_name}</h5>
                                    <p>{product.product_description}</p>
                                    <h5 className='price'>{product.product_price}</h5>
                                    <div className='buyer-orders-page-container__items__product-card__details__cq'>
                                        <div                        className='buyer-orders-page-container__items__product-card__details__cq__c'>
                                            <h6>Category</h6>
                                            <p>{product.product_category}</p>
                                        </div>
                                        <div                    className='buyer-cart-page-container__items__product-card__details__cq__q'>
                                            <h6>{moment(product.Date).format('DD/MM/YYYY')}</h6>   
                                        </div>
                                    </div>
                                    <div className='buyer-orders-page-container__items__product-card__details__status'>
                                        {
                                            (product.isProductProcessed === true && product.isProductShipped === false && product.isProductDelivered === false)
                                            ?
                                            <h3 className='processed'>Order Processed</h3>
                                        :null}
                                        {
                                            (product.isProductProcessed === true && product.isProductShipped === true && product.isProductDelivered === false)
                                            ?
                                            <h3 className='shipped'>Order shipped</h3>
                                        :null}
                                        {
                                            (product.isProductProcessed === true && product.isProductShipped === true && product.isProductDelivered === true)
                                            ?
                                            <h3 className='delivered'>Order Delivered</h3>
                                        :null}
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    buyer:state.buyer
});

const mapDispatchToProps = (dispatch) => ({
    getUserOrders : (userId) => dispatch(getUserOrders(userId))
});

export default connect(mapStateToProps,mapDispatchToProps)(BuyerOrdersPage);

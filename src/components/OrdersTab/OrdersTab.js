import React from 'react';
import './OrdersTab.scss';
import {useEffect} from 'react';
import {getSellerOrders} from '../../redux/seller/seller.actions';
import {connect} from 'react-redux';

const OrdersTab = (props) => {

    useEffect(() => {
        const getData = async(sellerId) => {
            const res = await props.getSellerOrders(sellerId);
            return res;
        }
        const res = getData(props.seller.sellerData._id); 
    },[])

    return(
        <div className='orders-tab-container'>
            <h3>Orders Received</h3>
            <div className='orders-tab-container__orders'> 
                {
                    props.seller.orders.map(order => {
                        return(
                            <div className='orders-tab-container__orders__order-card'>
                                <div className='orders-tab-container__orders__order-card__img-container'>
                                    <img src={order.product_image}></img>
                                </div>
                                <div className='orders-tab-container__orders__order-card__details'>
                                    <div className='orders-tab-container__orders__order-card__details__headings'>
                                        <h3>{order.product_name}</h3>
                                        <h4>{order.product_description}</h4>
                                    </div>
                                    <h3>{order.product_price}</h3>
                                    <div className='orders-tab-container__orders__order-card__details__user'>
                                        <div className='orders-tab-container__orders__order-card__details__user__name'>
                                            <h4>Ordered by</h4>
                                            <p>{order.UserName}</p>
                                        </div>
                                        <div className='orders-tab-container__orders__order-card__details__user__address'>
                                            <h4>Shipping address</h4>
                                            <p>{order.ShippingAdress}</p>
                                        </div>
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
    seller:state.seller
});

const mapDispatchToProps = (dispatch) => ({
    getSellerOrders : (sellerId) => dispatch(getSellerOrders(sellerId))
});


export default connect(mapStateToProps,mapDispatchToProps)(OrdersTab);
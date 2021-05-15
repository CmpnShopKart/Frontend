import React from 'react';
import './OrdersTab.scss';
import {useEffect} from 'react';
import {getSellerOrders,updateOrderStatus} from '../../redux/seller/seller.actions';
import {connect} from 'react-redux';

const OrdersTab = (props) => {

    useEffect(() => {
        const getData = async(sellerId) => {
            const res = await props.getSellerOrders(sellerId);
            return res;
        }
        const res = getData(props.seller.sellerData._id); 
    },[])

    const updateStatusHandler = async(order) => {
        console.log(order);
        var currentStatus = ""
        if(order.isProductProcessed===false && order.isProductShipped===false && order.isProductDelivered===false){
            currentStatus = "Status will be set to Processed";
        }
        if(order.isProductProcessed===true && order.isProductShipped===false && order.isProductDelivered===false){
            currentStatus = "Status will be set to Shipped";
        }
        if(order.isProductProcessed===true && order.isProductShipped===true && order.isProductDelivered===false){
            currentStatus = "Status will be set to Delivered";
        }
        if(order.isProductProcessed===true && order.isProductShipped===true && order.isProductDelivered===true){
            alert("Product is delivered");
            return;
        }
        alert(currentStatus);
        const formData = {
            ProductId:order.ProductId,
            OrderId:order.OrderId
        }
        console.log(formData);
        const res = await props.updateOrderStatus(formData);
        if(res.status===200){
            alert("Status updated successfully");
            await props.getSellerOrders(props.seller.sellerData._id);
        }
    }

    return(
        <div className='orders-tab-container'>
            <h3 className='title'>Orders Received</h3>
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
                                        <h5>{order.product_name}</h5>
                                        <p>{order.product_description}</p>
                                    </div>
                                    <h5 className='price'>{order.product_price}</h5>
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
                                    <div className='orders-tab-container__orders__order-card__details__btn'>
                                        <button onClick={() => updateStatusHandler(order)}>Update Status</button>
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
    getSellerOrders : (sellerId) => dispatch(getSellerOrders(sellerId)),
    updateOrderStatus : (formData) => dispatch(updateOrderStatus(formData))
});


export default connect(mapStateToProps,mapDispatchToProps)(OrdersTab);
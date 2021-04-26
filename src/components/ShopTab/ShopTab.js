import React from 'react';
import './ShopTab.scss';
import {connect} from 'react-redux';
import {useEffect,useState} from 'react';
import {getShopDetails} from '../../redux/shop/shop.actions';

const ShopTab = (props) => {
    
    useEffect(() => {
        const getData = async() => {
            const res = await props.getShopDetails(props.seller.sellerData._id);
            if(res.status===204){
                setIsShopRegistered(false);
            }else{
                setIsShopRegistered(true)
            }        
        }
        getData();
    }, [])

    const [isShopRegistered,setIsShopRegistered] = useState(null);
    
    return(
        <div className='shop-tab-container'>
            {(isShopRegistered)?
                <div className='shop-tab-container__shop-details-card'>
                    <div className='shop-tab-container__shop-details-card__header'>
                        <h3 className='shop-tab-container__shop-details-card__header__title'>{props.shop.shopData.shop_name}</h3>
                    </div>
                    <div className='shop-tab-container__shop-details-card__details'>
                        <div className='shop-tab-container__shop-details-card__details__address'>
                            <h4>Address:</h4>
                            <p>{props.shop.shopData.shop_address}</p>
                        </div>
                        <div className='shop-tab-container__shop-details-card__details__gstNo'>
                            <h4>Gst No.</h4>
                            <p>{props.shop.shopData.seller_gstin}</p>
                        </div>
                    </div>
                    <div className='shop-tab-container__shop-details-card__footer'>
                        <button>Edit details</button>
                        <button>View Products</button>
                    </div>
                </div>
                :
                <div className='shop-tab-container__shop-registration-form'>

                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    seller:state.seller,
    shop:state.shop
});

const mapDispatchToProps = (dispatch) => ({
    getShopDetails : (sellerId) => dispatch(getShopDetails(sellerId))
});

export default connect(mapStateToProps,mapDispatchToProps)(ShopTab);

import React from 'react';
import './ShopTab.scss';
import {connect} from 'react-redux';
import {useEffect,useState} from 'react';
import {getShopDetails,registerShop} from '../../redux/shop/shop.actions';
import { geolocated } from "react-geolocated";

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
    const [shopName,setShopName] = useState("");
    const [shopAddress,setShopAddress] = useState("");
    const [sellerGstin,setSellerGstin] = useState("");

    const registerShopSubmit = async(e) => {
        e.preventDefault();
        const formdata = {
            shop_name:shopName,
            shop_address:shopAddress,
            seller_gstin:sellerGstin,
            seller_id:props.seller.sellerData._id,
            shop_latitude:props.coords.latitude,
            shop_longitude:props.coords.longitude
        }
        const formData = new FormData();
        formData.append('shop_name',shopName);
        formData.append('shop_address',shopAddress);
        formData.append('seller_gstin',sellerGstin);
        formData.append('seller_id',props.seller.sellerData._id);
        formData.append('shop_latitude',props.coords.latitude);
        formData.append('shop_longitude',props.coords.longitude);
        console.log(formdata);
        const res = await props.registerShop(formdata);
        if(res.status===200){
            alert("Shop Registered Successfully");
            const res = await props.getShopDetails(props.seller.sellerData._id);
            setIsShopRegistered(true);
        }
    }

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
                        <button className='br-l'><i className='bi bi-pencil'/>Edit details</button>
                        <button className='br-r'><i className='bi bi-bag'/>View Products</button>
                    </div>
                </div>
                :
                <div className='shop-tab-container__shop-registration-form'>
                    <div className='shop-tab-container__shop-registration-form__headings'>
                        <h4>Fill the form below to register your shop.</h4>
                        <p>Please allow the location permission if prompted as we need it to display your shop to the users</p>
                    </div>
                        {
                            !props.isGeolocationAvailable ? (
                                <div>Your browser does not support Geolocation</div>
                            ) : !props.isGeolocationEnabled ? (
                                <div>Geolocation is not enabled</div>
                            ) : props.coords ?  
                                <div className='shop-tab-container__shop-registration-form__form'>
                                    <form onSubmit={registerShopSubmit}>
                                        <input
                                            type='text'
                                            placeholder='Enter your shop name'
                                            required
                                            value={shopName}
                                            onChange={(e) => setShopName(e.target.value)}
                                        />
                                        <label
                                            htmlFor='shop-photo'
                                        >
                                            Select your shop photo
                                        </label>
                                        <input
                                            type='file'
                                            id='shop-photo'
                                        />
                                        <input
                                            type='text'
                                            placeholder='Enter your shop address'
                                            required
                                            value={shopAddress}
                                            onChange={(e) =>setShopAddress(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            placeholder='Enter your gstNo.'
                                            required
                                            minLength={15}
                                            maxLength={15}
                                            value={sellerGstin}
                                            onChange={(e) =>setSellerGstin(e.target.value)}
                                        />
                                        <button type='submit'>Register<i className='bi bi-arrow-right'/></button>
                                    </form>
                                </div>
                            :
                                <div>
                                    Getting the location data
                                </div>
                        }
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
    getShopDetails : (sellerId) => dispatch(getShopDetails(sellerId)),
    registerShop : (formData) => dispatch(registerShop(formData))
});

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(mapStateToProps,mapDispatchToProps)(ShopTab));

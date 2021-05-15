import react from 'react';
import './BuyerHomePage.scss';
import {connect} from 'react-redux';
import {useEffect,useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { geolocated } from "react-geolocated";
import {addToCart, getNearbyShops,getSelectedShopProducts} from '../../redux/buyer/buyer.actions';
import NavMenu from '../NavMenu/NavMenu';


const BuyerHomePage = (
        {buyer,history,isGeolocationEnabled,isGeolocationAvailable,coords,getNearbyShops,getSelectedShopProducts,addToCart}
    ) => {

    const [selectedShopId,setSelectedShopId] = useState("");
    const [selectedShopName,setSelectedShopName] = useState("");
    const [isNavClicked,setIsNavClicked] = useState(false);
    
    useEffect(() => {
        if(!buyer.buyerData.isValidCredentials){
            history.push('/');
        }
        const getData = async() => {
            if(isGeolocationAvailable && isGeolocationEnabled && coords){
                await getNearbyShops({latitude:coords.latitude,longitude:coords.longitude});
            }
        }
        const getProductData = async() => {
            await getSelectedShopProducts(selectedShopId);
        } 
        getData();
        getProductData();
    },[isGeolocationEnabled,isGeolocationAvailable,coords,selectedShopId])


    const handleAddToCart = (product) => {
        if(product.product_quantity===0){
            alert("Product out of stock!");
            return;
        }
        addToCart(product);
        alert("Product added to cart!");
    }
    

    return !isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : coords && buyer.buyerData.nearbyShops ? (
        <div className='buyer-home-page'>
            <div className='buyer-home-page__info-container'>
                <div className='buyer-home-page__info-container__header'>
                    <i className={`${isNavClicked?'bi bi-x':'bi bi-list'}`} onClick={() => setIsNavClicked(!isNavClicked)}></i>
                </div>
                {
                    (isNavClicked)?<NavMenu history={history}/>:null
                }
                <div className='buyer-home-page__info-container__headings'>
                    <h3>{selectedShopName}</h3>
                </div>
                <div className='buyer-home-page__info-container__shop-info'>
                    {(buyer.buyerData.selectedShopProducts.length)?
                        buyer.buyerData.selectedShopProducts.map(product => {
                            return(
                                <div className='buyer-home-page__info-container__shop-info__product-card' key={product._id}>
                                    <div className='buyer-home-page__info-container__shop-info__product-card__img'>
                                        <img src={product.product_image}></img>
                                    </div>
                                    <div className='buyer-home-page__info-container__shop-info__product-card__details'>
                                        <h5 className='title'>{product.product_name}</h5>
                                        <p>{product.product_description}</p>
                                        <h5 className='price'>{product.product_price}</h5>
                                        <div className='buyer-home-page__info-container__shop-info__product-card__details__cq'>
                                            <div                    className='buyer-home-page__info-container__shop-info__product-card__details__cq__c'>
                                                <h6>Category</h6>
                                                <p>{product.product_category}</p>
                                            </div>
                                            <div                    className='buyer-home-page__info-container__shop-info__product-card__details__cq__q'>
                                                <h6>Quantity</h6>
                                                <p>{(product.product_quantity===0)?<p style={{color:'red'}}>Out of stock</p>:product.product_quantity}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleAddToCart(product)}>
                                            <i className='bi bi-cart'/>Add to cart                                            
                                        </button>
                                    </div>
                                </div>
                            )
                        }):null
                    }
                </div>
            </div>
            <div className='buyer-home-page__map-container'>
                <MapContainer center={[coords.latitude,coords.longitude]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        buyer.buyerData.nearbyShops.map(shop => {
                            return (
                                <Marker 
                                    key={shop._id}
                                    position={[shop.shop_latitude,shop.shop_longitude]}
                                    eventHandlers={{
                                        click: () => {
                                            setSelectedShopId(shop._id);
                                            setSelectedShopName(shop.shop_name);
                                        },
                                    }}
                                >
                                    <Popup>
                                        {shop.shop_name}
                                    </Popup>
                                </Marker>
                            )
                        })    
                    }
                </MapContainer>
            </div>
        </div>
    ):(<div>Getting the location data</div>)
}


const mapStateToProps = (state) => ({
    buyer:state.buyer
});

const mapDispatchToProps = (dispatch) => ({
    getNearbyShops : (formData) => dispatch(getNearbyShops(formData)),
    getSelectedShopProducts : (shopId) => dispatch(getSelectedShopProducts(shopId)),
    addToCart : (product) => dispatch(addToCart(product))
});

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(mapStateToProps,mapDispatchToProps)(BuyerHomePage));
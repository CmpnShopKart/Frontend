import React from 'react';
import './ProductsTab.scss';
import AddProductModal from '../AddProductModal/AddProductModal';
import {useState,useEffect} from 'react';
import {getProducts} from '../../redux/products/products.actions';
import {connect} from 'react-redux';

const ProductsTab = (props) => {

    const [showModal,setShowModal] = useState(false);

    useEffect(() => {
        const getData = async(shopId) => {
            await props.getProducts(shopId);
        } 
        getData(props.shop.shopData._id);
    },[])

    return(
        <div className='products-tab-container'>
            <div className='products-tab-container__add-product'>
                <button onClick={() => setShowModal(true)}><i className='bi bi-plus'/>Add Product</button>
            </div>
            {(showModal)?
                <AddProductModal 
                    closeModal={() => setShowModal(false)}
                />
            :null}
            <div className='products-tab-container__products'>
                {(props.products.isFetching)?
                    <div>loading</div>
                    :
                    props.products.productsData.map(product => (
                        <div className='products-tab-container__products__product-card'>
                            <div className='products-tab-container__products__product-card__img'>
                                <img src={product.product_image}></img>
                            </div>
                            <div className='products-tab-container__products__product-card__details'>
                                <h5 className='title'>{product.product_name}</h5>
                                <p>{product.product_description}</p>
                                <h5 className='price'>{product.product_price}</h5>
                                <div className='products-tab-container__products__product-card__details__cq'>
                                    <div                    className='products-tab-container__products__product-card__details__cq__c'>
                                        <h6>Category</h6>
                                        <p>{product.product_category}</p>
                                    </div>
                                    <div                    className='products-tab-container__products__product-card__details__cq__q'>
                                        <h6>Quantity</h6>
                                        <p>{product.product_quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) 
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    shop:state.shop,
    seller:state.seller,
    products:state.products
});

const mapDispatchToProps = (dispatch) => ({
    getProducts : (shopId) => dispatch(getProducts(shopId))
});

export default connect(mapStateToProps,mapDispatchToProps)(ProductsTab);
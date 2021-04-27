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
                            <img src={product.product_image} width={100} height={100}></img>
                            <h3>{product.product_name}</h3>
                            <h3>{product.product_price}</h3>
                            <h3>{product.product_category}</h3>
                            <h3>{product.product_description}</h3>
                            <h3>{product.product_quantity}</h3>
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
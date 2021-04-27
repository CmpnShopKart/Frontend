import React from 'react';
import ReactDom from 'react-dom';
import './AddProductModal.scss';
import {useState} from 'react';
import{connect} from 'react-redux';
import {getProducts,addProduct} from '../../redux/products/products.actions';

const AddProductModal = (props) => {

    const addProductSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('seller_id',props.seller.sellerData._id);
        formData.append('shop_id',props.shop.shopData._id);
        formData.append('product_image',productImage);
        formData.append('product_name',productName);
        formData.append('product_price',productPrice);
        formData.append('product_category',productCategory);
        formData.append('product_description',productDescription);
        formData.append('product_quantity',productQuantity);
        const res = await props.addProduct(formData);
        if(res.status===200){
            alert("Product added successfully");
            await props.getProducts(props.shop.shopData._id);
            props.closeModal();
        }
    } 

    const [productName,setProductName] = useState("");
    const [productPrice,setProductPrice] = useState("");
    const [productCategory,setProductCategory] = useState("Tech");
    const [productDescription,setProductDescription] = useState("");
    const [productQuantity,setProductQuantity] = useState("");
    const [productImage,setProductImage] = useState();
    const categories = ['Tech','Grocery','Sports','Hardware'];

    return ReactDom.createPortal(
        <div className='add-product-modal-container'>
            <div className='add-product-modal-container__modal'>
                <div className='add-product-modal-container__modal__header'>
                    <h3>Add Product</h3>
                    <i className='bi bi-x' onClick={props.closeModal}/>
                </div>
                <div className='add-product-modal-container__modal__body'>
                    <form onSubmit={addProductSubmit}>
                        <input
                            type='text'
                            placeholder='Product name'
                            required
                            value={productName}
                            onChange={(e)=> setProductName(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Product Description'
                            required
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Product Price'
                            required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <select required 
                            onChange={(e) => {
                                console.log(categories[e.target.selectedIndex]);
                                setProductCategory(categories[e.target.selectedIndex]);                           
                            }}
                        >
                            <option value='Tech'>Tech</option>
                            <option value='Grocery'>Grocery</option>
                            <option value='Sports'>Sports</option>
                            <option value='Hardware'>Hardware</option>
                        </select>
                        <input
                            type='text'
                            placeholder='Product quantity'
                            required
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                        />
                        <label htmlFor='product-image'>
                            Product image
                        </label>
                        <input
                            type='file'
                            id='product-image'
                            required
                            onChange={(e) =>setProductImage(e.target.files[0])}
                        />
                        <button type='submit'><i className='bi bi-plus'/>Add</button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}


const mapStateToProps = (state) => ({
    seller:state.seller,
    shop:state.shop
})

const mapDispatchToProps = (dispatch) => ({
    getProducts : (shopId) => dispatch(getProducts(shopId)),
    addProduct : (formData) => dispatch(addProduct(formData))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddProductModal);
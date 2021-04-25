import React from 'react';
import './SellerHomePage.scss';
import {useState} from 'react';
import HomeTab from '../HomeTab/HomeTab';
import ShopTab from '../ShopTab/ShopTab';
import ProductsTab from '../ProductsTab/ProductsTab';
import OrdersTab from '../OrdersTab/OrdersTab';

const SellerHomePage = () => {

    const [selectedObj,setSelectedObj] = useState({
        isHomeSelected:true,
        isShopSelected:false,
        isProductsSelected:false,
        isOrdersSelected:false
    });

    const setActive = (e) => {
        const link = e.target.dataset.link;
        if(link==='home'){
            setSelectedObj({
                isHomeSelected:true,
                isShopSelected:false,
                isProductsSelected:false,
                isOrdersSelected:false
            })
        }
        if(link==='shop'){
            setSelectedObj({
                isHomeSelected:false,
                isShopSelected:true,
                isProductsSelected:false,
                isOrdersSelected:false
            })
        }
        if(link==='products'){
            setSelectedObj({
                isHomeSelected:false,
                isShopSelected:false,
                isProductsSelected:true,
                isOrdersSelected:false
            })
        }
        if(link==='orders'){
            setSelectedObj({
                isHomeSelected:false,
                isShopSelected:false,
                isProductsSelected:false,
                isOrdersSelected:true
            })
        }
    }

    return(
        <div className='seller-home-page-container'>
            <div className='seller-home-page-container__header'>

            </div>
            <div className='seller-home-page-container__admin-panel-container'>
                <div className='seller-home-page-container__admin-panel-container__tabs'>
                    <ul className='seller-home-page-container__admin-panel-container__tabs__list'>
                        <li 
                            className={`seller-home-page-container__admin-panel-container__tabs__list__item ${selectedObj.isHomeSelected?'active':''}`}
                            data-link='home'
                            onClick={setActive}
                        >
                            <i className='bi bi-house'></i>            Home
                        </li>
                        <li 
                            className={`seller-home-page-container__admin-panel-container__tabs__list__item ${selectedObj.isShopSelected?'active':''}`}
                            data-link='shop'
                            onClick={setActive}
                        >
                            <i className='bi bi-shop-window'></i>            Shop
                        </li>
                        <li 
                            className={`seller-home-page-container__admin-panel-container__tabs__list__item ${selectedObj.isProductsSelected?'active':''}`}
                            data-link='products'
                            onClick={setActive}
                        >
                            <i className='bi bi-handbag'></i>            Products
                        </li>
                        <li 
                            className={`seller-home-page-container__admin-panel-container__tabs__list__item ${selectedObj.isOrdersSelected?'active':''}`}
                            data-link='orders'
                            onClick={setActive}
                        >
                            <i className='bi bi-cart2'></i>            Orders
                        </li>
                    </ul>
                </div>
                <div className='seller-home-page-container__admin-panel-container__content'>
                    {(selectedObj.isHomeSelected)?<HomeTab/>:null}
                    {(selectedObj.isShopSelected)?<ShopTab/>:null}
                    {(selectedObj.isProductsSelected)?<ProductsTab/>:null}
                    {(selectedObj.isOrdersSelected)?<OrdersTab/>:null}
                </div>
            </div>
        </div>
    )
}

export default SellerHomePage;
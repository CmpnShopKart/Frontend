import React from 'react';
import {useState,useEffect} from 'react';
import './RootPage.scss';

const RootPage = () => {
    const [isBuyersSelected,setIsBuyersSelected] = useState(true);
    return(
        <div className='root-page-container'>
            <div className='root-page-container__text-container'>
                {(isBuyersSelected)?
                    <h1 className='root-page-container__text-container__heading'>
                        Help the local shopkeepers near you by buying their products online and make a difference!
                    </h1>:
                    <h1 className='root-page-container__text-container__heading'>
                        Register your store online and take advantage of our platform to sell your products online!
                    </h1>
                }
            </div>
            <div className='root-page-container__tabbed-pane-container'>
                <div className='root-page-container__tabbed-pane-container__buttons'>
                    <button 
                        onClick={(e) => setIsBuyersSelected(true)}
                        className={`${isBuyersSelected ? "active" : ""}`}
                    >
                        For Buyers
                    </button>
                    <button 
                        onClick={(e) => setIsBuyersSelected(false)}
                        className={`${isBuyersSelected ? "" : "active"}`}
                    >
                        For Sellers
                    </button>
                </div>
                <div className='root-page-container__tabbed-pane-container__form-container'>
                    <form>
                        <input type='email' placeholder='Enter Your E-mail'></input>
                        <input type='password' placeholder='Enter Your Password'></input>
                        <button type='submit'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RootPage;
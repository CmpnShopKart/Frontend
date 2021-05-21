import React from 'react';
import ReactDom from 'react-dom';
import './SignUpModal.scss';
import {useState} from 'react';
import axios from 'axios';

const SignUpModal = ({isBuyersSelected,closeModal}) => {
    const signUpSeller = (e) => {
        e.preventDefault();
        const formData = {
            phoneNumber:phoneNumber,
            password:sellerPassword
        }
        axios.post('seller/signup',formData)
            .then(res => {
                console.log(res.data);
                alert("Seller Registered successfully");
                closeModal();
            })
            .catch(err => console.log(err));
    }
    const signUpBuyer = (e) => {
        e.preventDefault();
        const formData = {
            userName:userName,
            password:buyerPassword,
            email:email,
            shippingAddress:buyerShippingAddress
        }
        axios.post('user/signup',formData)
            .then(res => {
                console.log(res.data);
                alert("Buyer Registered successfully");
                closeModal();
            })
            .catch(err => console.log(err));
    }

    const [phoneNumber,setPhoneNumber] = useState("");
    const [sellerPassword,setSellerPassword] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [buyerPassword,setBuyerPassword] = useState("");
    const [buyerShippingAddress,setBuyerShippingAddress] = useState("");

    return ReactDom.createPortal(
        <div className='sign-up-modal-container'>
            <div className='sign-up-modal-container__modal'>
                <div className='sign-up-modal-container__modal__header'>
                    {(isBuyersSelected)?<h3>Register as a buyer</h3>:<h3>Register as a seller</h3>}
                    <i className="bi bi-x" onClick={closeModal}></i>
                </div>
                <div className='sign-up-modal-container__modal__form'> 
                    {(isBuyersSelected)?
                        <form onSubmit={signUpBuyer}>
                            <input 
                                type='text' 
                                placeholder='Enter a username'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input 
                                type='email' 
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type='password' 
                                placeholder='Enter a password'
                                value={buyerPassword}
                                onChange={(e) => setBuyerPassword(e.target.value)}
                            />
                            <input 
                                type='text' 
                                placeholder='Enter shipping address'
                                value={buyerShippingAddress}
                                onChange={(e) => setBuyerShippingAddress(e.target.value)}
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                    :
                        <form onSubmit={signUpSeller}>
                            <input 
                                type='text' 
                                placeholder='Enter your phone no.' 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <input 
                                type='password' 
                                placeholder='Enter a password'
                                value={sellerPassword}
                                onChange={(e) => setSellerPassword(e.target.value)}
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                    }
                </div>
            </div>
        </div>
        ,document.getElementById('portal')
    );
}

export default SignUpModal;


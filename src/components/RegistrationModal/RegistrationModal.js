import React from 'react';
import ReactDom from 'react-dom';
import './RegistrationModal.scss';
import {connect} from 'react-redux';
import {useState} from 'react';
import {sellerRegistration} from '../../redux/seller/seller.actions';

const RegistrationModal = (props) => {
    
    const [sellerName,setSellerName] = useState("");
    const [email,setEmail] = useState("");
    const [panNumber,setPanNumber] = useState("");
    const [adharNumber,setAdharNumber] = useState("");
    const [adharPhoto,setAdharPhoto] = useState("");
    const [gstNo,setGstNo] = useState("");

    const registerSeller = async(e) => {
        e.preventDefault();
        const formData = new FormData(); 
        formData.append("sellerId",props.seller.sellerData._id);
        formData.append("sellerName",sellerName);
        formData.append("phoneNumber",props.seller.sellerData.phoneNumber);
        formData.append("email",email);
        formData.append("panNumber",panNumber);
        formData.append("aadharNumber",adharNumber);
        formData.append("aadharPhoto",adharPhoto);
        formData.append("gstNo",gstNo);
        console.log(formData)
        const res = await props.sellerRegistration(formData);
        console.log(res);
        alert("Thank you for registering ! Please continue to log in");
    }

    return ReactDom.createPortal(
        <div className='registration-modal-container'>
            <div className='registration-modal-container__modal'>
                <div className='registration-modal-container__modal__header'>
                    <h3>Thank you for signing up ! please fill the form below to register yourself as a seller .</h3>
                </div>
                <div className='registration-modal-container__modal__form'> 
                    <form onSubmit={registerSeller}>
                        <input 
                            type='text' 
                            placeholder='Enter your full name' 
                            value={sellerName}
                            onChange={(e) =>setSellerName(e.target.value)}
                            required
                        />
                        <input 
                            type='email' 
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type='text' 
                            placeholder='Enter your adhar number'
                            value={adharNumber}
                            onChange={(e) =>setAdharNumber(e.target.value)}
                            required
                        />
                        <input 
                            type='file' 
                            placeholder='Upload your adhar image'
                            onChange={(e) =>setAdharPhoto(e.target.files[0])}
                            required
                        />
                        <input 
                            type='text' 
                            placeholder='Enter your pan number'
                            value={panNumber}
                            onChange={(e) =>setPanNumber(e.target.value)}
                            required
                        />
                        <input 
                            type='text' 
                            placeholder='Enter your gst number'
                            value={gstNo}
                            onChange={(e) =>setGstNo(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        ,document.getElementById('portal')
    );
}

const mapStateToProps = (state) => ({
    seller:state.seller
})

const mapDispatchToProps = (dispatch) => ({
    sellerRegistration : (formData) => dispatch(sellerRegistration(formData))
})

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationModal);


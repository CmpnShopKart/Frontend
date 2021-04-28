import React from 'react';
import {useState} from 'react';
import './RootPage.scss';
import SignUpModal from '../SignUpModal/SignUpModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import {connect} from 'react-redux';
import fetchUsers from '../../redux/user/user.actions';
import {buyerSignIn} from '../../redux/buyer/buyer.actions';
import {sellerSignIn} from '../../redux/seller/seller.actions';

const RootPage = (props) => {

    const [isBuyersSelected,setIsBuyersSelected] = useState(true);
    const [showSignUpModal,setShowSignUpModal] = useState(false);
    const [email,setEmail] = useState("");
    const [buyerPassword,setBuyerPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [sellerPassword,setSellerPassword] = useState("");

    const buyerSignInSubmit = async(e) => {
        e.preventDefault();
        const formData = {
            email:email,
            password:buyerPassword
        }
        const res = await props.buyerSignIn(formData);
        console.log(res);
        if(res.isValidCredentials){
            props.history.push('/buyer/home');
        }
    }

    const sellerSignInSubmit = async(e) => {
        e.preventDefault();
        const formData = {
            phoneNumber:phoneNumber,
            password:sellerPassword
        }
        const res = await props.sellerSignIn(formData);
        console.log(res.data.isValidCredentials,res.data.sellerRegistered);
        if(!res.data.isValidCredentials){
            alert("Please enter valid credentials");
        }
        if(res.data.isValidCredentials && res.data.sellerRegistered){
            props.history.push('/seller/home');
        }
    }


    return(
        <div className='root-page-container'>
            {(props.seller.sellerData.sellerRegistered===false && props.seller.sellerData.isValidCredentials)?
                <RegistrationModal/>:null
            }
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
                    {
                        (isBuyersSelected)?
                            <form onSubmit={buyerSignInSubmit}>
                                <input 
                                    type='email' 
                                    placeholder='Enter Your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input 
                                    type='password' 
                                    placeholder='Enter Your Password'
                                    value={buyerPassword}
                                    onChange={(e) => setBuyerPassword(e.target.value)}
                                    required
                                />
                                <button type='submit'>Sign In</button>
                            </form>
                        :
                            <form onSubmit={sellerSignInSubmit}>
                                <input 
                                    type='text' 
                                    placeholder='Enter your phone no.'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}    
                                    required
                                />
                                <input 
                                    type='password' 
                                    placeholder='Enter Your Password'
                                    value={sellerPassword}
                                    onChange={(e) => setSellerPassword(e.target.value)}
                                    required
                                />
                                <button type='submit'>Sign In</button>
                            </form>
                    }
                </div>
                <a
                    onClick={(e) => setShowSignUpModal(true)}
                >
                    Don't have an account ? Create one
                </a>
            </div>
            {(showSignUpModal===true)?
                <SignUpModal
                    isBuyersSelected={isBuyersSelected}
                    closeModal={(e) => setShowSignUpModal(false)}
                />
                :null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    buyer:state.buyer,
    seller:state.seller
})

const mapDispatchToProps = dispatch => ({
    fetchUsers : () => dispatch(fetchUsers()),
    buyerSignIn : (formData) => dispatch(buyerSignIn(formData)),
    sellerSignIn : (formData) => dispatch(sellerSignIn(formData))
})

export default connect(mapStateToProps,mapDispatchToProps)(RootPage);
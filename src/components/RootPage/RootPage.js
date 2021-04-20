import React from 'react';
import {useState,useEffect} from 'react';
import './RootPage.scss';
import SignUpModal from '../SignUpModal/SignUpModal';
import {connect} from 'react-redux';
import fetchUsers from '../../redux/user/user.actions';

const RootPage = ({fetchUsers,user}) => {

    const [isBuyersSelected,setIsBuyersSelected] = useState(true);
    const [showSignUpModal,setShowSignUpModal] = useState(false);

    useEffect(() => {
        const getData = async() => {
            await fetchUsers();
        }
        getData();
        console.log(user);
    },[fetchUsers]);

    if(user.isLoading){
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
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
                        <input type='email' placeholder={`${isBuyersSelected?'Enter Your E-mail':'Enter your phone no.'}`}></input>
                        <input type='password' placeholder='Enter Your Password'></input>
                        <button type='submit'>Sign In</button>
                    </form>
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
    user:state.user
})

const mapDispatchToProps = dispatch => ({
    fetchUsers : () => dispatch(fetchUsers())
})

export default connect(mapStateToProps,mapDispatchToProps)(RootPage);
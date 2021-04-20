import React from 'react';
import ReactDom from 'react-dom';
import './SignUpModal.scss';


const SignUpModal = ({isBuyersSelected,closeModal}) => {
    return ReactDom.createPortal(
        <div className='sign-up-modal-container'>
            <div className='sign-up-modal-container__modal'>
                <div className='sign-up-modal-container__modal__header'>
                    {(isBuyersSelected)?<h3>Register as a buyer</h3>:<h3>Register as a seller</h3>}
                    <i className="bi bi-x" onClick={closeModal}></i>
                </div>
                <div className='sign-up-modal-container__modal__form'> 
                    <form>
                        <input type='text' placeholder={`${isBuyersSelected?'Enter e-mail':'Enter Phone no.'}`}></input>
                        <input type='password' placeholder='Enter a password'></input>
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        ,document.getElementById('portal')
    );
}

export default SignUpModal;


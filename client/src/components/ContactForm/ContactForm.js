import React, { useState } from 'react';
import axios from 'axios'
import './style.css'

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const ContactForm = () => {

    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const [errorMessage, setErrorMessage] = useState('');

    const { name, email, message } = formState;

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
        console.log(formState)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateEmail(email)

        if (name.length && isValid) {

            axios.post("/api/sendemail", formState)
                .then(
                    setFormState({ name: '', email: '', message: '' }),
                    setErrorMessage(``)
                )
        } else if (!name.length && isValid) {
            console.log("valid degil")
            setErrorMessage(`Please fill in "name".`)
        } else if (name.length && !isValid)
            setErrorMessage(`Please enter valid email`)
    }
    return (
        <div className="row justify-content-md-center">
            <section id="contact-section" className=" col-md-6">
                {/* <h1 className="contact">hhutku.wa@gmail.com</h1> */}
                <h1 className="contact"><a  href="mailto:hhutku.wa@gmail.com">hhutku.wa@gmail.com</a></h1>
                <hr></hr>
                <form className="justify-content-center" id="contact-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">name:</label>
                        <input className="form-control" type="text" name="name" value={name} onChange={handleChange} />
                    </div>
                    <div >
                        <label htmlFor="email">email:</label>
                        <input className="form-control" type="email" name="email" value={email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="message">message:</label>
                        <textarea className="form-control" name="message" value={message} onChange={handleChange} rows="10" />
                    </div>
                    {errorMessage && (
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    )}

                    <div>
                        <button data-testid='button' className="btn btn-outline-light mt-4 submit-btn" type="submit" >Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default ContactForm

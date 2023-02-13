import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER } from '../gqloperations/mutations'

const Signup = () => {
    const [formData, setFormData] = useState({})
    const [signupUser,{ data, loading, error }] = useMutation(SIGNUP_USER)
   
    if(loading) return <h1>Loading...</h1>

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        signupUser({
            variables:{
                userNew: formData
            }
        })
    }

    return (
        <div className='container my-container'>
            {
                error && <div className="red card-panel">{error.message}</div>
            }
            {
                data && data.user && <div className="green card-panel">{data.user.firstName} is SignedUp. You can login now!</div>
            }
            <h5>Signup!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='firstName'
                    placeholder='Enter first name'
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name='lastName'
                    placeholder='Enter last name'
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name='email'
                    placeholder='Enter email'
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name='password'
                    placeholder='Enter password'
                    onChange={handleChange}
                    required
                />
                <button className='btn #673ab7 deep-purple' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup
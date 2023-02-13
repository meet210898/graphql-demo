import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { SIGNIN_USER } from '../gqloperations/mutations'

const Login = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const [userSignin, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted(data) {
            localStorage.setItem('token', data.user.token)
            navigate('/')
        }
    })
    
    if(loading) return <h1>Loading...</h1>

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        userSignin({
            variables: {
                userSignin: formData
            }
        })
    }

    return (
        <div className='container my-container'>
            {
                error && <div className="red card-panel">{error.message}</div>
            }
            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
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
                <Link to="/signup"><p>Dont have an account ?</p></Link> 
                <button className='btn #673ab7 deep-purple' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
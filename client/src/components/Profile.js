import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_PROFILE } from '../gqloperations/queries'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { data, error, loading } = useQuery(GET_MY_PROFILE)
    const navigate = useNavigate()

    if(!localStorage.getItem('token')) {
        navigate('/login')
        return <h1>Unauthorized</h1>
    }
    if(loading) return <h1>Profile is loading...</h1>
    if(error) console.log('error', error)

    return (
        <div className="container my-container">
            {
                error && <div className="red card-panel">{error.message}</div>
            }
            <div className="center-align">
                <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data?.myprofile?.firstName}.png?size=200x200`} alt="pic" />
                <h5>{data?.myprofile?.firstName} {data?.myprofile?.lastName}</h5>
                <h6>Email - {data?.myprofile?.email}</h6>
            </div>
             <h3>Your quotes</h3>
             {
                data?.myprofile?.quotes.map(quote => 
                    <blockquote>
                        <h6>{quote.name}</h6>
                    </blockquote>
                )
             }
        </div>
    )
}

export default Profile
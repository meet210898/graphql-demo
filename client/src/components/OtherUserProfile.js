import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../gqloperations/queries'
import { useParams } from 'react-router-dom'

const OtherUserProfile = () => {
    const { userid } = useParams()
    const { data, error, loading } = useQuery(GET_USER_BY_ID,{
        variables: { userid }
    })

    if(loading) return <h1>Profile is loading...</h1>
    if(error) console.log('error', error)

    return (
        <div className="container my-container">
            {
                error && <div className="red card-panel">{error.message}</div>
            }
            <div className="center-align">
                <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data?.user?.firstName}.png?size=200x200`} alt="pic" />
                <h5>{data?.user?.firstName} {data?.user?.lastName}</h5>
                <h6>Email - {data?.user?.email}</h6>
            </div>
             <h3>Your quotes</h3>
             {
                data?.user?.quotes.map(quote => 
                    <blockquote>
                        <h6>{quote.name}</h6>
                    </blockquote>
                )
             }
        </div>
    )
}

export default OtherUserProfile
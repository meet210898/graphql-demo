import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_QUOTE } from '../gqloperations/mutations'

const CreateQuote = () => {
    const [quote,setQuote] = useState("")
    const [createQuote, { data, error, loading }] = useMutation(CREATE_QUOTE, {
        refetchQueries: [
            "getAllQuotes",
            "getMyProfile"
        ]
    })

    if(loading) return <h1>Loading...</h1>
    if(error) console.log("error", error.message)
    if(data) console.log("data", data)

    const handleSubmit = (e)=>{
        e.preventDefault()
        createQuote({
            variables: {
                name: quote
            }
        })
    }
    return (
        <div className="container my-container">
            {
                error && <div className="red card-panel">{error.message}</div>
            }
            {
                data && <div className="green card-panel">{data.quote} is SignedUp. You can login now!</div>
            }
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={quote}
                    onChange={e=>setQuote(e.target.value)}
                    placeholder="write your quote here"
                    />
                 <button className="btn green">Create</button>
            </form>
            
        </div>
    )
}

export default CreateQuote
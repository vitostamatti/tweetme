import React from 'react'
import { apiTweetCreate } from './lookup'

export function TweetCreate(props) {
    const textAreaRef = React.createRef()
    const { didTweet } = props

    const handleBackendResponse = (response, status) => {
        if (status === 201) {
            didTweet(response)
        } else {
            console.log(response)
        }
    }
    const handleSubmit = (event) => {
        //backend api request
        event.preventDefault()
        const newVal = textAreaRef.current.value
        apiTweetCreate(newVal, handleBackendResponse)
        textAreaRef.current.value = ''
    }
    return (
        <div className={props.className}>
            < form onSubmit={handleSubmit} >
                <textarea ref={textAreaRef} placeholder="Your tweet..." required={true} className="form-control" name="tweet"></textarea>
                <button type="submit" className="btn btn-sm btn-primary my-3">Tweet</button>
            </form >
        </div>
    )
}
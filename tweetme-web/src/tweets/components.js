import React, { useState, useEffect } from 'react'
import { TweetsList } from './list'
import { TweetCreate } from './create'
import { Tweet } from './detail'
import { apiTweetDetail } from './lookup'

export function TweetsComponent(props) {
    const [newTweet, setNewTweet] = useState([])
    const canTweet = props.canTweet === 'false' ? false : true // converting string to boolean

    const handlNewTweet = (newTweet) => {
        let tempNewTweet = [...newTweet]
        tempNewTweet.unshift(newTweet)
        setNewTweet(tempNewTweet)
    }
    return (
        <div className={props.className}>
            {canTweet === true && <TweetCreate didTweet={handlNewTweet} className='col-10 mb-3 mx-auto'></TweetCreate>}
            <TweetsList {...props} newTweet={newTweet} />
        </div>
    )
}

export function TweetDetailComponent(props) {
    const { tweetId } = props
    const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setTweet(response)
        } else {
            alert("There was an error finding your tweet")
        }
    }
    useEffect(() => {
        if (didLookup === false) {
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }
    }, [tweetId, didLookup, setDidLookup])
    return (tweet === null ? null : <Tweet tweet={tweet} className={props.className}></Tweet>)
}
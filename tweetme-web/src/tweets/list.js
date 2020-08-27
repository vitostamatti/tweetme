import React, { useState, useEffect } from 'react'
import { apiTweetList } from './lookup'
import { Tweet } from './detail'

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    useEffect(() => {
        //const finalTweetList = [...props.newTweet].concat(tweetsInit)
        const finalTweetList = [...props.newTweets].concat(tweetsInit)
        if (finalTweetList.length !== tweets.length) {
            setTweets(finalTweetList)
        }
    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() => {
        if (tweetsDidSet === false) {
            // Do lookup to database
            const handleTweetListLookup = (response, status) => {
                //console.log(response, status)
                if (status === 200) {
                    setTweetsInit(response)
                    setTweetsDidSet(true)
                } else {
                    console.log("There was an error")
                }
            }
            apiTweetList(props.username, handleTweetListLookup)
        }

    }, [tweetsInit, setTweetsDidSet, tweetsDidSet, props.username])

    const handledidRetweet = (newTweet) => {
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)
        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(newTweet)
        setTweets(updateFinalTweets)


    }

    return tweets.map((item, index) => {
        return <Tweet
            tweet={item}
            didRetweet={handledidRetweet}
            key={`${index}-${item.id}`}
            className="my-2 py-2 border rounded bg-light text-dark" />
    })
}
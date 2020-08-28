import React, { useState, useEffect } from 'react'
import { apiTweetFeed } from './lookup'
import { Tweet } from './detail'

export function TweetsFeedList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
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
                    setNextUrl(response.next)
                    setTweetsInit(response.results)
                    setTweetsDidSet(true)
                } else {
                    console.log("There was an error")
                }
            }
            apiTweetFeed(handleTweetListLookup)
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

    const handleLoadNext = (event) => {
        event.preventDefault()
        if (nextUrl !== null) {
            const handleLoadNextResponse = (response, status) => {
                if (status === 200) {
                    setNextUrl(response.next)
                    const newTweets = [...tweets].concat(response.results)
                    setTweetsInit(newTweets)
                    setTweets(newTweets)
                } else {
                    console.log("There was an error")
                }
            }
            apiTweetFeed(handleLoadNextResponse, nextUrl)
        }
    }
    return <React.Fragment>{
        tweets.map((item, index) => {
            return <Tweet
                tweet={item}
                didRetweet={handledidRetweet}
                key={`${index}-${item.id}`}
                className="mx-auto my-2 p-3 border rounded bg-light text-dark" />
        })}
        {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load More Tweets</button>}
    </React.Fragment>
}
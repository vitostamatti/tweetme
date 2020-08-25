import React, { useState, useEffect } from 'react'

import { apiTweetCreate, apiTweetList, apiTweetAction } from './lookup'

export function TweetsComponent(props) {
    const textAreaRef = React.createRef()
    const [newTweet, setNewTweet] = useState([])

    const handleBackendResponse = (response, status) => {
        //backend api response handler
        let tempNewTweet = [...newTweet]
        if (status === 201) {
            tempNewTweet.unshift(response)
            setNewTweet(tempNewTweet)
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
            <div className="col-10 mb-3 mx-auto">
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} placeholder="Your tweet..." required={true} className="form-control" name="tweet"></textarea>
                    <button type="submit" className="btn btn-sm btn-primary my-3">Tweet</button>
                </form>
            </div>
            <TweetsList newTweet={newTweet} />
        </div>
    )
}

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    useEffect(() => {
        const finalTweetList = [...props.newTweet].concat(tweetsInit)
        if (finalTweetList.length !== tweets.length) {
            setTweets(finalTweetList)
        }
    }, [props.newTweet, tweets, tweetsInit])

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
            apiTweetList(handleTweetListLookup)
        }

    }, [tweetsInit, setTweetsDidSet, tweetsDidSet])

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

export function ActionBtn(props) {
    const { tweet, action, didPerformAction } = props
    const likes = tweet.likes ? tweet.likes : 0
    const className = props.className ? props.className : "btn btn-primary btn-sm"
    const actionDisplay = action.display ? action.display : "Action"

    const handleBackendActionResponse = (response, status) => {
        console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }

    }
    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleBackendActionResponse)

    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return (
        <button className={className} onClick={handleClick}>
            {display}
        </button>
    )
}

export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent ? (
        <div className='row'>
            <div className="col-11 p-3 mx-auto border rounded">
                <p className="mb-0 text-muted small">Retweeted</p>
                <Tweet hideActions className={'  '} tweet={tweet.parent}></Tweet>
            </div>
        </div>
    ) : null
}

export function Tweet(props) {
    const { tweet, didRetweet, hideActions } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-11 mx-auto col-md-7'

    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {
            setActionTweet(newActionTweet)
        } else if (status === 201) {
            if (didRetweet) {
                didRetweet(newActionTweet)
            }
        }

    }

    return (
        <div className={className}>
            <div>
                <p>{tweet.id} - {tweet.content}</p>
                <ParentTweet tweet={tweet}></ParentTweet>
            </div>
            {(actionTweet && hideActions !== true) &&
                < div className="btn btn-group">
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "like", display: "Likes" }} />
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "unlike", display: "Unlike" }} />
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "retweet", display: "Retweet" }} />
                </div>
            }
        </div >);
}

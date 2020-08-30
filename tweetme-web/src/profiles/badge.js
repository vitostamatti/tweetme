import React, { useEffect, useState } from 'react'
import { apiProfileDetail, apiProfileFollowToggle } from './lookup'
import { UserDisplay, UserPicture } from './components'
import { DisplayCount } from './utils'


function ProfileBadge(props) {
    const { user, didFollowToggle, profileLoading } = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    return (user ?
        <div>
            <div><UserPicture user={user} hideLink></UserPicture></div>
            <div><UserDisplay user={user} includeFullName hideLink ></UserDisplay></div>
            <div><DisplayCount>{user.follower_count}</DisplayCount> followers</div>
            <div><DisplayCount>{user.following_count}</DisplayCount> following</div>
            <div>{user.location}</div>
            <div>{user.bio}</div>
            <button onClick={handleFollowToggle} className="btn btn-primary">{currentVerb}</button>
        </div> : null)

}

export function ProfileBadgeComponent(props) {
    const { username } = props
    // lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        }
    }
    useEffect(() => {
        if (didLookup === false) {
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [username, didLookup, setDidLookup])

    const handleFollow = (action) => {
        apiProfileFollowToggle(username, action, (response, status) => {
            //console.log(response, status)
            if (status === 200) {
                setProfile(response)
                //apiProfileDetail(username, handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)

    }

    return didLookup === false ? "Loading..." : <ProfileBadge user={profile} didFollowToggle={handleFollow} profileLoading={profileLoading}></ProfileBadge>
}
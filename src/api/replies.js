import apiUrl from "../apiConfig"
import axios from "axios"

export const getQuibblReplies = (quibblId) => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/${quibblId}/replies`
    })
}

export const postReply = (user, currentQuibblId, newReply) => {
    return axios({
        method: 'POST',
        url: `${apiUrl}/${currentQuibblId}/replies`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            reply: {
                reply: newReply
            }
        }
    })
}

export const updateReply = (user, replyId, changeReply) => {
    console.log('this is user', user)
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/replies/${replyId}`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            reply: {
                reply: changeReply
            }
        }
    })
}

export const upvoteReply = (replyId, user) => {
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/replies/${replyId}/vote`,
        data: {
            reply: {
                votes: user
            }
        }
    })
}
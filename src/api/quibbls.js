import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUsersQuibbls = (searchId) => {
    console.log('this is searchId', searchId)
    return axios({
        method: 'GET',
        url: `${apiUrl}/quibbls/${searchId}`,
    })
}
export const getOfficialQuibbls = () => {
    
    return axios({
        method: 'GET',
        url: `${apiUrl}/quibbls/official`,
    })
}

export const getQuibbls = () => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/quibbls`
    })
}

export const getOneQuibbl = (quibblId) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/quibbls/' + quibblId
    })
}

export const postQuibbl = (user, quibblTitle, value, tags, quibblDuration) => {
    return axios({
        method: 'POST',
        url: apiUrl + '/quibbls',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            quibbl: {
                title: quibblTitle,
                description: value,
                tags: tags,
                duration: quibblDuration
            }
        }
    })
}

export const destroyQuibbl = (user, itemId) => {
    return axios({
        method: 'DELETE',
        url: `${apiUrl}/quibbls/${itemId}`,
        headers: { Authorization: `Token token=${user.token}` }
    })
}

export const updateQuibbl = (user, quibblId, value) => {
    console.log('THIS IS quibbl ID:', quibblId)
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/quibbls/${quibblId}`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            quibbl: {
                description: value
            }
        }
    })
}

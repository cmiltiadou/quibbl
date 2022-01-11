import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUsersQuibbls = (user) => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/quibbls/user`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
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

export const postQuibbl = (user, newQuibbl, value) => {
    return axios({
        method: 'POST',
        url: apiUrl + '/quibbls',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            quibbl: {
                title: newQuibbl.title,
                description: value,
                img: newQuibbl.img
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

export const updateQuibbl = (user, quibblId, changeQuibbl) => {
    console.log('THIS IS quibbl ID:', quibblId)
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/quibbls/${quibblId}`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            quibbl: {
                description: changeQuibbl
            }
        }
    })
}

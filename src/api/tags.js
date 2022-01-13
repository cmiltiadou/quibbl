import apiUrl from '../apiConfig'
import axios from 'axios'

export const getTags = () => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/tags`
    })
}
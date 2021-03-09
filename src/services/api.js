export default class GalleryService {
    _baseUrl = 'https://boiling-refuge-66454.herokuapp.com'

    getAllImages = async () => {
        const response = await fetch(`${this._baseUrl}/images`)
        return response.json()
    }

    getExtraData = async (id) => {
        const response = await fetch(`${this._baseUrl}/images/${id}`)
        return response.json()
    }

    addComment = async (id, comment) => {
        const response = await fetch(`${this._baseUrl}/images/${id}/comments`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
        return response
    }
}
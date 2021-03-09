import React from 'react'
import './gallery-item.css'

const GalleryItem = ({ url, id, choosePhotoHandler }) => {

    return (
        <li onClick={() => choosePhotoHandler(id)} className="gallery-item">
            <img src={url} alt="" />
        </li>
    )
}

export default GalleryItem
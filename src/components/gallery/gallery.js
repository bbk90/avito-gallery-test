import React from 'react'
import GalleryItem from '../gallery-item/gallery-item'
import './gallery.css'

const Gallery = ({ photos, choosePhotoHandler }) => {

    return (
        <ul className="gallery">
            {photos.map((item) => {
                return (
                    <GalleryItem
                        key={item.id}
                        url={item.url}
                        choosePhotoHandler={choosePhotoHandler}
                        {...item} />
                )
            })}
        </ul>
    )
}

export default Gallery
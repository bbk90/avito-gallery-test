import React, { useEffect, useState } from 'react'
import GalleryService from '../../services/api'
import Footer from '../footer/footer'
import Gallery from '../gallery/gallery'
import Loader from '../loader/loader'
import ModalWindow from '../modal-window/modal-window'
import './app.css'

const App = () => {

    const galleryService = new GalleryService()

    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModal, setIsModal] = useState(false)
    const [id, setId] = useState(null)

    useEffect(() => {
        galleryService.getAllImages()
            .then(images => {
                setPhotos(images)
                setIsLoading(false)
            })
    }, [])

    const choosePhotoHandler = (id) => {
        setId(id)
        setIsModal(true)
    }

    const closeModal = () => {
        setIsModal(false)
    }

    const loader = isLoading ? <Loader /> : null
    const gallery = !isLoading ? <Gallery
        photos={photos}
        choosePhotoHandler={choosePhotoHandler} /> : null
    const modal = isModal ? <ModalWindow photos={photos} id={id} closeModal={closeModal} /> : null

    return (
        <div className="app">
            <h1>TEST APP</h1>
            {loader}
            {gallery}
            {modal}
            <Footer />
        </div>
    )
}

export default App
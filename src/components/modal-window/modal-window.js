import React, { useEffect, useState } from 'react'
import GalleryService from '../../services/api'
import './modal-window.css'
import Loader from '../loader/loader'

const ModalWindow = ({ id, closeModal }) => {

    const galleryService = new GalleryService()

    const [bigPhoto, setBigPhoto] = useState(null)
    const [comments, setComments] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

    useEffect(() => {
        galleryService.getExtraData(id)
            .then(data => {
                setBigPhoto(data.url)
                setComments(data.comments)
                setIsLoading(false)
            })
    }, [id])

    const onSubmitHandler = (e) => {
        if (name && comment !== '') {
            galleryService.addComment(id, { comment, name })
                .then(data => {
                    if (data.status === 204) {
                        alert("Ваш комментарий успешно отправлен")
                    } else {
                        alert("Произошла ошибка. Комментарий не добавлен!")
                    }

                })
            setName('')
            setComment('')
        } else {
            alert("Заполните поля!")
        }
        e.preventDefault()
    }

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

    const loader = isLoading ? <Loader /> : null
    const content = !isLoading ?
        <>
            <div className="modal-leftside">
                <img src={bigPhoto} alt="" />
                <form className="modal-form" onSubmit={onSubmitHandler}>
                    <input value={name} onChange={onNameChange} placeholder="Ваше имя" type="text" />
                    <input value={comment} onChange={onCommentChange} placeholder="Ваш комментарий" type="text" />
                    <button type="submit">Оставить комментарий</button>
                </form>
            </div>
            <div className="modal-rightside">
                {comments ?
                    <div className="modal-comments">
                        {comments.map(comment => {
                            return (
                                <div className="modal-comment" key={comment.id}>
                                    <span>{("" + (new Date(comment.date)).toISOString())
                                        .replace(/^([^T]+)T(.+)$/, '$1')
                                        .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')}</span>
                                    <p>{comment.text}</p>
                                </div>
                            )
                        })}
                    </div> : null}
            </div>

        </>
        : null

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button onClick={closeModal} className="close">×</button>
                    </div>
                    <div className="modal-body">
                        {loader}
                        {content}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModalWindow
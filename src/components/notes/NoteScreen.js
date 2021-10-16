import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting, startSaveNote, startUploading } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id } = formValues;

    const activeId = useRef(note.id);


    const handleSave = () => {
        dispatch(startSaveNote(note))
    }

    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file))
        }
    }

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }))
    }, [formValues, dispatch])


    const handleDelete = () => {
        dispatch(startDeleting(id))
    }

    

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea placeholder="What happened today?"
                    className="notes__text-area"
                    name="body"
                    value={body}
                    onChange={handleInputChange}>

                </textarea>
                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="arbol"
                        />

                    </div>
                }

                <div className="adminActions">
                <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
                    {/* <input type="checkbox" name="adminToggle" class="adminToggle" /> */}
                    <div className="saveButton" onClick={handleSave}><i className="fas fa-save"></i></div>
                    <div className="imageButton" onClick={handlePicture}><i className="fas fa-image"></i></div>
                    <div className="deleteButton" onClick={handleDelete}><i className="fas fa-trash"></i></div>
                   
                </div>
            </div>

          

        </div>
    )
}

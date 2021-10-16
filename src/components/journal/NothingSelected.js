import React from 'react'
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../actions/notes';

export const NothingSelected = () => {

    const dispatch = useDispatch();
    const handleAddNew = ()=>{
        dispatch(startNewNote())
    }

    return (
        <div className="nothing__main-content">
            
             <div>Select something</div>    
              <div>or</div>  
              <button className="btn btn-primary btn-m" onClick={handleAddNew}>Create new note</button>
            
        
            
        </div>
    )
}

import './charList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

const CharList = (props) => {
    
    const [data, setData] = useState([])    
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    
    const {loading, error, getAllCharacters} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])    
   
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharsListLoaded)
    }

    const onCharsListLoaded = (newData) => {
        let ended = false
        if (newData.length < 9) {
            ended = true
        }

        setData(data => [...data, ...newData])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded( charEnded => ended)
    }
   
    const listView = (data) => {
        const charactersList = data.map( element => {  
            let imgStyle = {'objectFit': 'cover'}
            if (element.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }    
            return (
                <li 
                    className="char__item"
                    key={element.id}
                    onClick={() => props.onCharSelected(element.id)}>
                    <img src={element.thumbnail} alt={element.name} style={imgStyle}/>
                    <div className="char__name">{element.name}</div>
                </li>                   
            ) 
        })
        return (
            <ul className="char__grid">
                {charactersList}   
            </ul>  
        )       
    }       
    
    const itemList = listView(data)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null
       
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}              
            {itemList}                                   
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
  
}


export default CharList;
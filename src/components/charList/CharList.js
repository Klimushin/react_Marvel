import './charList.scss';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

const CharList = (props) => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    
    const marvelService = new MarvelService()

    useEffect(() => {
        onRequest()
    }, [])    
   
    const onRequest = (offset) => {
        onCharsListLoading()
        marvelService
            .getAllCharacters(offset)
            .then(onCharsListLoaded)
            .catch(onError)
    }

    const onCharsListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharsListLoaded = (newData) => {
        let ended = false
        if (newData.length < 9) {
            ended = true
        }

        setData(data => [...data, ...newData])
        setLoading(loading => false)       
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded( charEnded => ended)
    }

    const onError = () => {       
        setLoading(loading => false)
        setError(error => true)
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
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? itemList : null
    
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}              
            {content}                                   
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
import './comicsList.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = (props) => {
    
    const [data, setData] = useState([])    
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)
    
    const {loading, error, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])    
   
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newData) => {
        let ended = false
        if (newData.length < 8) {
            ended = true
        }

        setData(data => [...data, ...newData])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 8)
        setComicsEnded( comicsEnded => ended)
    }
   
    const listView = (data) => {
        const comicsList = data.map( element => {                
            return (
                <li className="comics__item" key={element.id}>
                    <Link to={`/comics/${element.id}`}>                        
                        <img src={element.thumbnail} className="comics__item-img"/>
                        <div className="comics__item-name">{element.title}</div>
                        <div className="comics__item-price">{element.price}$</div>
                    </Link>
                </li>                           
            ) 
        })

        return (
            <ul className="comics__grid">
                {comicsList}   
            </ul>  
        )       
    }       
    
    const itemList = listView(data)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && newItemLoading ? <Spinner/> : null
       
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}              
            {itemList}                                   
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
  
}

export default ComicsList;
import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

class CharList extends Component {
    
    state = {
        data: [],
        loading: true, 
        error: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.getCharacters()
    }

    onCharLoaded = (data) => {
        this.setState({
            data,
            loading: false
        })
    }

    onError = () => {
        this.setState({            
            loading: false,
            error: true
        })
    }

    getCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    listView (data) {
        const charactersList = data.map( element => {  
            let imgStyle = {'objectFit': 'cover'}
            if (element.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }    
            return (
                <li className="char__item">
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

    render() {
        
        const {data, loading, error} = this.state
        const itemList = this.listView(data)
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? itemList : null
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}              
                {content}                                   
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;
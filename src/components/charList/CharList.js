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
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharsListLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsListLoaded)
            .catch(this.onError)
    }

    onCharsListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharsListLoaded = (newData) => {
        let ended = false
        if (newData.length < 9) {
            ended = true
        }

        this.setState(({offset, data}) => ({
            data: [...data, ...newData],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({            
            loading: false,
            error: true
        })
    }
   
    listView (data) {
        const charactersList = data.map( element => {  
            let imgStyle = {'objectFit': 'cover'}
            if (element.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }    
            return (
                <li 
                    className="char__item"
                    key={element.id}
                    onClick={() => this.props.onCharSelected(element.id)}>
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
        
        const {data, loading, error, newItemLoading, offset, charEnded} = this.state
        const itemList = this.listView(data)
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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;
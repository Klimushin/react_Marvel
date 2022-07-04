import {useHttp} from '../hooks/http.hook'


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBaseURL = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=5a3c7eb939cf98f084ce5213c6cc6be3'
    const _baseCharOffset = 210
    const _baseComicsOffset = 150
    
    const getAllCharacters = async (offset = _baseCharOffset) => {
        const res = await request(`${_apiBaseURL}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res =  await request(`${_apiBaseURL}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBaseURL}comics?issueNumber=4&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 150)}  ... ` : 'Description is empty',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }    
    
    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService
// import { async } from "jshint/src/prod-params"

class MarvelService {
    _apiBaseURL = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=5a3c7eb939cf98f084ce5213c6cc6be3'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBaseURL}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res =  await this.getResource(`${this._apiBaseURL}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 250)}  . . . ` : 'Description is empty',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService
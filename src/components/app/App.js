import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    
    const [selectedCharId, setCharId] = useState(null)
    

    const onCharSelected = (id) => {
        setCharId(id)
    } 
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ComicsList/>
                {/* <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    
                    <ErrorBoundary>
                        <CharInfo charId={selectedCharId}/>
                    </ErrorBoundary>
                    
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
            </main>
        </div>
    )
    
}

export default App;
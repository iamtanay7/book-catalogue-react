import Book from './components/Book'
import Author from './components/Author'
import MyNavbar from './components/MyNavbar'
import './style.css'
import { useState } from 'react'

const App = () => {
    const [currentState, setCurrentState] = useState(false);
    const changeState = () => {
        console.log(currentState)
        setCurrentState(!currentState)
    }

    return (
        <div>
            <MyNavbar/>
            <button onClick={changeState}>Toggle</button>
            <AppState currentState={currentState}/>
        </div>
    )
}

const AppState = (props) => {
    return props.currentState?<Book/>:<Author/>
}
export default App;
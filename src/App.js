import Book from './components/Book'
import Author from './components/Author'
import MyNavbar from './components/MyNavbar'
import './style.css'
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import { BottomNavigation } from '@mui/material'

const App = () => {
    const [currentState, setCurrentState] = useState(false);
    const changeState = () => {
        console.log(currentState)
        setCurrentState(!currentState)
    }

    return (
        <div>
            <div id="hello"><p>Hello!</p></div>
            <MyNavbar/>
            <div className='container flex' style={{marginTop:"80px"}}>
                Currently showing: {currentState?"Books":"Authors"}
                <Switch onChange={changeState}>Toggle</Switch>
            </div>
            <AppState currentState={currentState}/>
            <BottomNavigation/>
        </div>
    )
}

const AppState = (props) => {
    return props.currentState?<Book/>:<Author/>
}
export default App;
import Book from './components/Book'
import Author from './components/Author'
import './style.css'
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import { BottomNavigation, AppBar, Toolbar, Typography } from '@mui/material'

const App = () => {
    const [currentState, setCurrentState] = useState(false);
    const changeState = () => {
        console.log(currentState)
        setCurrentState(!currentState)
    }

    return (
        <div>
            <div id="hello"><p>Hello!</p></div>
            <AppBar>
          <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Gene Box
          </Typography>
              <Typography textAlign="right">
              Currently showing: {currentState?"Books":"Authors"}
              </Typography> 
                <Switch onChange={changeState} color="secondary"></Switch>
          </Toolbar>
        </AppBar>
           
            <AppState currentState={currentState}/>
            <BottomNavigation/>
        </div>
    )
}

const AppState = (props) => {
    return props.currentState?<Book/>:<Author/>
}
export default App;
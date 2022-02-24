import Book from './components/Book'
import Author from './components/Author'
import MyNavbar from './components/MyNavbar'
import './style.css'

const App = () => {
    return (
        <div>
            <MyNavbar/>
            <Author></Author><br/>
            <Book></Book><br/>
            Hello world!
        </div>
    )
}

export default App;
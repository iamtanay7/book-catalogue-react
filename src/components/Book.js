import { useState, useEffect } from "react";

const Book = (props) => {
    const [book, setBook] = useState(null);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/books/`)
        .then(res => res.json())
        .then(setBook)
        .then(console.error)
      }, [])

      let i = 0;
      for (const key in book) {
          if (Object.hasOwnProperty.call(book, key)) {
              book[key] = 
              <div className="box" key={i}>
                  {book[key].name}<br/>
                  <hr/>
                  {book[key].number_of_pages}<br/>
                  {book[key].date_of_publishing}<br/>
                  {book[key].average_critics_rating}<br/>
                  {book[key].author}<br/>
                </div>;
                i++;             
          }
      }
    // book = book.map(object => object.name);

    return (
        <>
        <div className="my-element">
            {book}
        </div>
        </>
    )
}
export default Book;
import { useState, useEffect } from "react";

const Author = (props) => {
    const [author, setAuthor] = useState(null);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/authors/`)
        .then(res => res.json())
        .then(setAuthor)
        .then(console.error)
      }, [])

      let i = 0;
      for (const key in author) {
          if (Object.hasOwnProperty.call(author, key)) {
              author[key] = 
              <div className="box" key={i}>
                  {author[key].name}<br/>
                  <hr/>
                  {author[key].age}<br/>
                  {author[key].gender}<br/>
                  {author[key].country}<br/>
                </div>;
                i++;             
          }
      }
    // book = book.map(object => object.name);

    return (
        <>
        <div className="my-element">
            {author}
        </div>
        </>
    )
}
export default Author;
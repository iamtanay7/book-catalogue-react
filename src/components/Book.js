import { useState, useEffect } from "react";

const Author = (props) => {
    const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [items, setItems] = useState([]);
      const [q,setQ] = useState("")
      const [searchParam] = useState(["name"])
    
   useEffect(()=>{
       fetch("http://127.0.0.1:8000/books/")
       .then(res=>res.json())
       .then(
           (result) => {
               setIsLoaded(true)
               setItems(result)
           },
           (error) => {
               setIsLoaded(true)
               setError(error)
           }
       )
   }, [])
   if(error){
    return <div>Error: {error.message}</div>;
   }
   else if(!isLoaded){
       return <>Loading...</>
   }
   else{
    return (
        <>
        <div className="container">
            <input type="text"
            id={props.id}
            placeholder="Search books by name...(Case insensitive)"
            className="search-bar box"
            value={q}
            onChange={(e)=>setQ(e.target.value.toLowerCase())}
            />
        </div>
        <div className="container">
            {
                items.filter((item)=>item.name.toLowerCase().includes(q)).map((item, index)=>(
                    <div className="box mycard" key={index}>
                        {item.name}<br/>
                        {item.number_of_pages}<br/>
                        {item.date_of_publishing}<br/>
                        {item.average_critics_rating}<br/>
                    </div>
                ))
            }
        </div>
        </>
    )
   }

    
}

export default Author;
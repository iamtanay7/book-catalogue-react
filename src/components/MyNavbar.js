const MyNavbar = () => {
    return(
      <>
        <div className="navbar">
          <p className="navbar-text">Welcome to The Gene Box Library!</p>
        </div>
        <div className="search-bar">
        <input type="text" placeholder="Type here..." />
        <button className="search-button">Search</button>
        </div>
      </>

    )
}

export default MyNavbar;
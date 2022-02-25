import { AppBar, Toolbar, Typography } from "@mui/material";

const MyNavbar = () => {
    return(
      <>
        {/* <div className="navbar">
          <p className="navbar-text">Welcome to The Gene Box Book Catalogue!</p>
        </div> */}
        <AppBar>
          <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Gene Box
          </Typography>
          </Toolbar>
        </AppBar>
      </>

    )
}

export default MyNavbar;
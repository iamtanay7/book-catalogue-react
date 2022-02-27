import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { IconButton, Button, Modal, Typography, Box, InputLabel, MenuItem, Select, FormControl, CircularProgress, Card, CardActionArea, CardMedia, CardContent, Rating } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import setCurrentState from '../App'


const Book = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [snack, setSnack] = useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    const [authorId, setAuthorId] = useState(1);
    const [allAuthors, setAllAuthors] = useState([]);
    const [snackAuthor, setSnackAuthor] = useState(false)
    const [snackError, setSnackError] = useState(false)
    const handleChange = (event) => {
        setAuthorId(event.target.value)
    };
    const handleAuthorSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackAuthor(false)
    }
    const handleErrorSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackError(false)
    }
    const actionAuthor = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleAuthorSnackClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const actionError = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleErrorSnackClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    const handleSearchChange = (event) => {
        event.preventDefault()
        setQ(event.target.value.toLowerCase())
    }

    const exportToCsv = () => {
        setSnack(true)
        window.location.href = "https://tanay-books.herokuapp.com/exportbooksascsv"

    }
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnack(false)
    }
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )


    const addNewBook = () => {
        let obj = {}
        obj.author_id = authorId
        obj.name = document.querySelector("#book-name").value
        obj.number_of_pages = parseInt(document.querySelector("#pages").value)
        obj.average_critics_rating = parseInt(document.querySelector("#rating").value)
        obj.date_of_publishing = document.querySelector("#publish-date").value
        obj.image_url = document.querySelector("#image_url").value || "url"
        
        console.log(obj)
        axios.post("https://tanay-books.herokuapp.com/addnewbook/", obj)
            .then(function (response) {
                if(response.data.error==="Invalid input"){
                    setSnackError(true)
                }
                else{
                    setSnackAuthor(true)
                    handleClose()
                    window.location.reload()
                }
            })
            .catch(function (error) {
                console.log(error);
                setSnackError(true)
            });
    }

    useEffect(() => {
        fetch("https://tanay-books.herokuapp.com/books/")
            .then(res => res.json())
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
            fetch("https://tanay-books.herokuapp.com/allauthors/")
            .then( res=> res.json())
            .then(
                (result) => {
                    setAllAuthors(result)
                }
            )



    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', marginTop:'300px' }}>
                <CircularProgress />
            </Box>
        )
    }
    else {
        return (
            <>
                <div className="container" style={{ marginTop: "80px" }}>

                    <TextField variant="outlined"
                        label="Search"
                        id={props.id}
                        className="search-bar"
                        placeholder="Search books by name...(Case insensitive)"
                        value={q}
                        onChange={handleSearchChange}
                        sx={{ position: "sticky" }}
                    />

                    <Button variant="contained" onClick={handleOpen}>Add new book</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} noValidate component="form">
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Add new book
                            </Typography>

                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <TextField variant="outlined" label="Name of book" id="book-name" required />
                            </FormControl>


                            <FormControl fullWidth style={{ marginTop: '20px' }} >
                                <TextField
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Number of pages"
                                    id="pages"
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth style={{ marginTop: '20px' }} >
                                <TextField
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Average critics rating"
                                    id="rating"
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <InputLabel id="demo-simple-select-label">Author</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label2"
                                    id="select-author"
                                    label="Author"
                                    value={authorId}
                                    required
                                    onChange={handleChange}
                                >
                                  { allAuthors.map(
                                        (obj)=><MenuItem key={obj.id} value={obj.id}>{obj.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <div style={{marginTop:"20px"}}>
                                    <label htmlFor="publish_date">Date published:</label>
                                    <input type="date" id="publish-date" className="form-control" required/>
                                </div>   
                            </FormControl>

                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <TextField variant="outlined" label="Image URL" id="image_url" />
                            </FormControl>

                            <FormControl fullWidth>
                                <Button
                                    style={{ marginTop: '20px' }}
                                    variant="contained"
                                    onClick={addNewBook}
                                >Add book</Button>
                            </FormControl>
                        </Box>
                    </Modal>
                    <Button
                        variant="contained"
                        onClick={exportToCsv}>
                        Export to CSV</Button>
                    <Snackbar
                        open={snack}
                        autoHideDuration={4000}
                        message="Exported data to CSV!"
                        action={action}
                        onClose={handleSnackClose}
                    />
                    <Snackbar
                        open={snackAuthor}
                        autoHideDuration={4000}
                        message="Book added successfully!"
                        action={actionAuthor}
                        onClose={handleAuthorSnackClose}
                    />
                    <Snackbar
                        open={snackError}
                        autoHideDuration={4000}
                        message="Please enter valid data!"
                        action={actionError}
                        onClose={handleErrorSnackClose}
                    />
                </div>


                <div className="my-element">
                    {
                        items.filter((item) => item.name.toLowerCase().includes(q))
                            .sort(
                                function (a, b) {
                                    let x = a.name.toLowerCase();
                                    let y = b.name.toLowerCase();
                                    if (x < y) { return -1; }
                                    if (x > y) { return 1; }
                                    return 0;
                                }
                            )
                            .map((item, index) => (
                                <Card key={index}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={item.image_url}
                                            alt="Image not available"
                                            sx={{ width:"100%", height:"15wv" }}
                                        />

                                        <CardContent>
                                            <Typography gutterBottom component="div">
                                                {item.name}<br />
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.number_of_pages} pages<br />
                                                Published on {item.date_of_publishing}<br />
                                                Written by {item.author_name}<br />
                                                <Typography component="legend">
                                                <Rating name="read-only" precision={0.5} value={item.average_critics_rating/2} readOnly></Rating>
                                                </Typography>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))
                        || "No results found"}
                </div>
            </>
        )
    }


}

export default Book;
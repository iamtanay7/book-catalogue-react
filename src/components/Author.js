import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { IconButton, Slider, Button, Modal, Typography, Box, InputLabel, MenuItem, Select, FormControl, CircularProgress, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'


const Author = (props) => {
    const [filterAge, setFilterAge] = useState(0)
    const [filterGender, setFilterGender] = useState('');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [snack, setSnack] = useState(false)
    const [snackAuthor, setSnackAuthor] = useState(false)
    const [snackError, setSnackError] = useState(false)
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
    const [gender, setGender] = useState('');
    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleSearchChange = (event) => {
        event.preventDefault()
        setQ(event.target.value.toLowerCase())
    }

    const exportToCsv = () => {
        setSnack(true)
        window.location.href = "https://tanay-books.herokuapp.com/exportauthorsascsv"

    }
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnack(false)
    }
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


    const addNewAuthor = () => {
        let obj = {}
        obj.name = document.querySelector("#author-name").value
        obj.gender = gender
        obj.age = parseInt(document.querySelector("#age").value)
        obj.country = document.querySelector("#country").value
        obj.image_url = document.querySelector("#image_url").value || "url"
        console.log(obj)
        axios.post("https://tanay-books.herokuapp.com/addnewauthor/", obj)
            .then(function (response) {
                if (response.data.error === "Invalid input") {
                    setSnackError(true)
                }
                else {
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
        fetch("https://tanay-books.herokuapp.com/authors/")
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

    }, [])

    const filterItems = (items) => {
        if (filterAge !== 0) {
            items = items.filter((item) => item.age <= filterAge)
        }

        if (filterGender !== '') {
            items = items.filter((item) => item.gender === filterGender)
        }
        return items.filter((item) => item.name.toLowerCase().includes(q))
            .sort(
                function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                }
            )
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', marginTop: '300px' }}>
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
                        placeholder="Search authors by name...(Case insensitive)"
                        value={q}
                        onChange={handleSearchChange}
                        sx={{ position: "sticky" }}
                    />

                    <Button variant="contained" onClick={handleOpen}>Add new author</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} noValidate component="form">
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Add new author
                            </Typography>

                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <TextField variant="outlined" label="Name of author" id="author-name" required />
                            </FormControl>

                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <TextField variant="outlined" label="Country" id="country" required />
                            </FormControl>


                            <FormControl fullWidth style={{ marginTop: '20px' }} >
                                <TextField
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Age"
                                    id="age"
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="gender"
                                    label="Gender"
                                    value={gender}
                                    required
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Others">Others </MenuItem>
                                </Select>
                            </FormControl>


                            <FormControl fullWidth style={{ marginTop: '20px' }}>
                                <TextField variant="outlined" label="Image URL" id="image_url" />
                            </FormControl>

                            <FormControl fullWidth>
                                <Button
                                    style={{ marginTop: '20px' }}
                                    variant="contained"
                                    onClick={addNewAuthor}
                                >Add author</Button>
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
                        message="Author added successfully!"
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
                <div className="container" style={{ marginTop: "20px", width: "50%" }}>

                    <label>Age: </label>
                    <Slider
                        defaultValue={filterAge}
                        valueLabelDisplay="auto"
                        aria-label="default"
                        min={0}
                        max={100}
                        step={10}
                        onChange={(e) => setFilterAge(e.target.value)}
                    >

                    </Slider>
                </div>
                <div className="container" style={{ marginTop: "20px", width: "50%" }}>
                    <label>Gender: </label>
                    <Select
                        labelId="demo-simple-select-label4"
                        id="gender"
                        label="Gender"
                        value={filterGender}
                        required
                        onChange={(e) => setFilterGender(e.target.value)}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others </MenuItem>
                    </Select>
                </div>

                <div className="my-element">
                    {
                        filterItems(items)
                            .map((item, index) => (
                                <Card key={index}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={item.image_url}
                                            alt="Image not available"
                                        />

                                        <CardContent>
                                            <Typography gutterBottom component="div">
                                                {item.name}<br />
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.country}<br />
                                                {item.gender}, {item.age}<br />
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

export default Author;
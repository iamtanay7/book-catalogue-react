import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Skeleton, Button, Modal, Typography, Box, InputLabel, MenuItem, Select, FormControl, CircularProgress, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import axios from "axios";


const Author = (props) => {
    const { loading, setLoading } = useState(true)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        setQ(event.target.value.toLowerCase())
    }

    const addNewAuthor = () => {
        let obj = {}
        obj.name = document.querySelector("#author-name").value
        obj.gender = gender
        obj.age = parseInt(document.querySelector("#age").value)
        obj.country = document.querySelector("#country").value
        obj.image_url = document.querySelector("#image_url").value || "url"
        console.log(obj)
        axios.post("http://127.0.0.1:8000/authors/", obj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/authors/")
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
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', margin: 'auto' }}>
                <CircularProgress />
            </Box>
        )
    }
    else {
        return (
            <>
                <div className="container">

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
                                <TextField error variant="outlined" label="Name of author" id="author-name" required />
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
                                <TextField variant="outlined" label="Image URL" id="image_url"/>
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
                    <Button variant="contained" onClick={handleOpen}>Export to CSV</Button>
                </div>


                <div className="my-element">
                    {
                        items.filter((item) => item.name.toLowerCase().includes(q))
                        .sort(
                            function(a, b){
                                let x = a.name.toLowerCase();
                                let y = b.name.toLowerCase();
                                if (x < y) {return -1;}
                                if (x > y) {return 1;}
                                return 0;
                              }
                        )
                        .map((item, index) => (
                            // <div className="box mycard" key={index}>
                            //     {item.name}<br />
                            //     {item.age}<br />
                            //     {item.gender}<br />
                            // </div>
                            <Card key={index} class="cards">
                                <CardActionArea>
                                    {
                                        loading?
                                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />:
                                    
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={item.image_url}
                                        alt="green iguana"
                                    />
                                        }
                                    <CardContent>
                                        <Typography gutterBottom component="div">
                                            {item.name}<br />
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.age}<br />
                                            {item.gender}<br />
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
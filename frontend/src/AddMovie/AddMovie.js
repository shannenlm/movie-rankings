import React, {Component} from 'react'
import './AddMovie.css'

import { 
    Modal,
    TextField,
    Button
} from '@material-ui/core';

export default class AddMovie extends Component { 
    constructor(props) { 
        super(props) 

        this.state = {
            title: "", 
            director: "",
            genres: "",
            country: "",
            year: "",
            image: "",
            titleError: false,
            directorError: false,
            genresError: false,
            countryError: false,
            yearError: false,
            imageError: false
        }
    }

    // returns true if no errors. else, false
    validate() { 
        if (this.state.titleError || this.state.directorError || this.state.genresError ||
            this.state.countryError || this.state.yearError) { 
                return false;
            }
        return true;
    }

    render() { 
        return(
            <div> 
                <Modal
                    open={this.props.showAddMovie}
                >
                    <div className="centered">
                        <span style={{fontSize: "14pt"}}><b>Add Movie</b></span>
                        <TextField 
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Title"
                            onChange={(event) => {
                                this.setState({
                                    title: event.target.value,
                                    titleError: ((event.target.value.length > 0) ? false : true)
                                })
                            }} 
                            error={this.state.titleError}
                            helperText={this.state.titleError ? "Cannot be empty" : ""}
                        /> <br />
                        <TextField 
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Director"
                            onChange={(event) => {
                                this.setState({
                                    director: event.target.value,
                                    directorError: ((event.target.value.length > 0) ? false : true)
                                })
                            }}
                            error={this.state.directorError}
                            helperText={this.state.directorError ? "Cannot be empty" : ""}
                        /> <br />
                        <TextField 
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Genre(s)"
                            onChange={(event) => {
                                this.setState({
                                    genres: event.target.value,
                                    genresError: ((event.target.value.length > 0) ? false : true)
                                })
                            }}
                            error={this.state.genresError}
                            helperText={this.state.genresError ? "Cannot be empty" : ""}
                        /> <br />
                        <TextField 
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Country of origin"
                            onChange={(event) => {
                                this.setState({
                                    country: event.target.value,
                                    countryError: ((event.target.value.length > 0) ? false : true)
                                })
                            }}
                            error={this.state.countryError}
                            helperText={this.state.countryError ? "Cannot be empty" : ""}
                        /> <br />
                        <TextField 
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Year"
                            onChange={(event) => {
                                this.setState({
                                    year: event.target.value,
                                    yearError: ( (/^\d{4}$/.test(event.target.value)) ? false : true)
                                })
                            }}
                            error={this.state.yearError}
                            helperText={this.state.yearError ? "Must be a four digit number" : ""}
                        /> <br />
                        <TextField 
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="URL to image of movie poster"
                            onChange={(event) => {
                                this.setState({
                                    image: event.target.value,
                                    imageError: ((event.target.value.length > 0) ? false : true)
                                })
                            }}
                            helperText={this.state.yearError ? "Will assume valid image URL. Cannot be empty." : "Will assume valid image URL."}
                        /> <br />

                        <Button 
                            className="modal-button"
                            variant="contained"
                            onClick={() => this.props.onClose()}
                        >
                            Close
                        </Button>
                        <Button
                            className="modal-button"
                            variant="contained"
                            onClick={() => {
                                if (this.validate()) { 
                                    this.props.handleSubmit(this.state.title, this.state.director,
                                    this.state.genres, this.state.country,this.state.year, this.state.image)
                                }
                                else { 
                                    alert("One or more errors! Did you forget to fill out a field?")
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}
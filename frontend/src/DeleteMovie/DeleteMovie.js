import React, {Component} from 'react'
import { 
    Modal,
    TextField,
    Button
} from '@material-ui/core';

export default class DeleteMovie extends Component { 
    constructor(props) { 
        super(props) 

        this.state = {
            title: "", 
            director: "",
            year: "",
            titleError: false,
            directorError: false,
            yearError: false
        }
    }

    // returns true if no errors. else, false
    validate() { 
        if (this.state.titleError || this.state.directorError || this.state.yearError) { 
            return false;
        }
        return true;
    }

    render() { 
        return(
            <div> 
                <Modal
                    open={this.props.showDeleteMovie}
                >
                    <div className="centered">
                        <span style={{fontSize: "14pt"}}><b>Delete Movie</b></span>
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
                                    this.props.handleSubmit(this.state.title, this.state.director, this.state.year)
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
import React, { Component } from 'react'
import './Movie.css'
import { 
    IconButton, 
    Button
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpvoted: false
        }
    }

    // handles upvote event. removes upvote if user has already upvvoted,
    // adds upvote if user has not upvoted yet
    handleUpvote(title, director, genres, country, year, image, upvotes) {
        if (this.state.isUpvoted) { 
            this.props.removeUpvote(title, director, genres, country, year, image, upvotes);
            this.setState({
                isUpvoted: false
            });
        }
        else { 
            this.props.addUpvote(title, director, genres, country, year, image, upvotes);
            this.setState({
                isUpvoted: true
            });
        }
    }

    render() {
        return (
            <div className="movie-container">
                <div className="upvote"> 
                    <IconButton
                        aria-label="Add a like to a movie"
                        onClick={() => 
                            this.handleUpvote(this.props.title, this.props.director, 
                                        this.props.genres, this.props.country,
                                        this.props.year, this.props.image,
                                        this.props.upvotes)
                        }
                        color={this.state.isUpvoted ? "primary" : "default"}
                    >
                        <ThumbUpIcon />
                    </IconButton>
                    <br className="upvote-br"/>
                    
                    <span className="upvote-number"><b>{this.props.upvotes}</b></span>
                </div>

                <div className="movie-content"> 
                    <div className="movie-poster"> 
                        <img src={this.props.image}></img>
                    </div>
                    
                    <div className="movie-description"> 
                        <h2>{this.props.title} ({this.props.year})</h2>
                        <p>
                            <b>Director: </b> {this.props.director} <br/>
                            <b>Genre(s): </b> {this.props.genres}   <br/>
                            <b>Country: </b> {this.props.country}   <br/>
                        </p>

                        <Button
                            className="button"
                            onClick={ () => 
                                this.props.onDelete(this.props.title, this.props.director, 
                                                    this.props.genres, this.props.country,
                                                    this.props.year, this.props.image,
                                                    this.props.upvotes)
                            }
                            startIcon={<DeleteForeverIcon />}
                            variant="contained"
                            color="secondary"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
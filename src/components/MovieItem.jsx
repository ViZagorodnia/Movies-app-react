import React from 'react';

class MovieItem extends React.Component {
	constructor () {
		super ();

		this.state = {
			willWatch: false
		}
	}

	render () {
		const { movie, removeMovie, addMovieToWillWatch,removeMovieFromWillWatch } = this.props;
		return (
			<div className="card">
				<img 
					src= {`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
					alt="{movie.title}" 
					className="card-img-top"
				/>
				<div className="card-body">
					<h6 className="card-title" style={{height:"50px"}}>{movie.title}</h6>
					<p className="mb-0">Rating: {movie.vote_average}</p>						
					<div className="d-flex justify-content-between mt-2">
							{this.state.willWatch ? 
								(<button 
						 			className="btn btn-success btn-sm"
									type="button"
			 						onClick={() => {
			 							this.setState({
			 								willWatch: false
			 							});
			 							removeMovieFromWillWatch(movie)}
			 							}
			 					>
			 					Watching
			 					</button>) : ( 				
					 			<button 
							 		className="btn btn-outline-success btn-sm"
							 		type="button"
							 		onClick={() => {
							 			this.setState({
							 				willWatch: true
							 			});
							 			addMovieToWillWatch(movie)}
							 		}
							 	>
							 	Add to list
							 	</button>)
							}
							<button 
								className="btn btn-sm btn-outline-danger"
								onClick={removeMovie.bind(null, movie)}
							>
								Delete movie
							</button>
						</div>
					
					</div>
				</div>

		);
	}
}


export default MovieItem;
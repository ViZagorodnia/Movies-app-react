import React from 'react';
//import { moviesData } from '../moviesData';
import MovieItem from './MovieItem.jsx';
import MovieTabs from './MovieTabs.jsx';
import { API_URL, API_KEY_3} from '../utils/api.js';

//UI = fn(state, props)

class App extends React.Component {
	constructor () {
		super ();

		this.state = {
			movies: [],
			moviesWillWatch: [],
			sort_by: "popularity.desc",
			page: 1
		};
	};

	componentDidMount() {
		this.getMovies();
	};

	componentDidUpdate (prevProps, prevState) {
		if (prevState.sort_by !== this.state.sort_by) {
			this.getMovies();
		};
		if (prevState.page !== this.state.page) {
			this.getMovies();
		};
	};

	getMovies = () => {
		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
		.then((response) => {
			return response.json();
			})
		.then((data) => {
			this.setState({
				movies: data.results
			});
		});
	};

	removeMovie = movie => {
		const updateMovies = this.state.movies.filter(function (item) {
			return item.id !== movie.id;
		});

		this.setState({
			movies: updateMovies
		});
	};

	addMovieToWillWatch = movie => {
		
		const updateMoviesWatch = [...this.state.moviesWillWatch, movie];
		this.setState({
			moviesWillWatch: updateMoviesWatch
		});
	};

	removeMovieFromWillWatch = movie => {
		const updateMoviesWatch = this.state.moviesWillWatch.filter(function (item) {
			return item.id !== movie.id;
		});
		this.setState({
			moviesWillWatch: updateMoviesWatch
		});
	};

	updateSortBy = value => {
		this.setState({
			sort_by: value
		});
	}

	nextPage = () => {
		if (this.state.page !== 50) {
			this.setState({
				page: this.state.page + 1
			});
		}
		
	}

	prevPage = () => {
		this.setState({
			page: this.state.page - 1
		});
	}

	render () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-9">
						<div className="row mb-4">
							<div className="col-12">
								<MovieTabs 
									sort_by={this.state.sort_by}
									updateSortBy={this.updateSortBy}
								/>
							</div>							
						</div>
						<div className="row">							
							{this.state.movies.map(movie => {
								return (
									<div className="col-4 mb-4" key={movie.id}>
										<MovieItem
											movie={movie}
											removeMovie={this.removeMovie}
											addMovieToWillWatch={this.addMovieToWillWatch}
											removeMovieFromWillWatch={this.removeMovieFromWillWatch}
										/>	
									</div>	
								);
							})}
						</div>
					</div>
				<div className="col-3">
					<h4>	Will watch: {this.state.moviesWillWatch.length} movie</h4>
					<ul className="list-group">
						{this.state.moviesWillWatch.map((movie) => (
							<li key={movie.id} className="list-group-item">
								<div className="d-flex justify-content-between">
									<p>{movie.title}</p>
									<p>{movie.vote_average}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				</div>
				<div className="row mb-4">
					<div className="col-12">
						{this.state.page !== 1 ? 
							(<button
	 							type="button"
	 							className="btn btn-outline-success btn-sm"
	 							onClick={this.prevPage}
	 						>Prev</button>)	: null }		
						<p className="navigation">{this.state.page}</p>
						<button
							type="button"
							className="btn btn-outline-success btn-sm"
							onClick={this.nextPage}
						>Next</button>	
					</div>
				</div>
			</div>
		)

	}
};

export default App;
import React from 'react';

class MovieTabs extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.sort_by !== this.props.sort_by) {
			return true;
		} else {
			return false;
		}
	}

	render () {
		const {sort_by, updateSortBy} = this.props;
		const handleClick = value => {
			return () => {
				updateSortBy(value);
			};
		};
	
		const getClassByValue = value => {
			return `nav-link ${sort_by === value ? "active" : ""}`
		}
	
		return (
				<ul className="tabs nav nav-pills">
					<li className="nav-item">
						<div 
							className={getClassByValue("popularity.desc")}
							onClick={handleClick("popularity.desc")}
							type="button"
						>
							Popularity
						</div>
					</li>
					<li className="nav-item">
						<div 
							className={getClassByValue("revenue.desc")}
							onClick={handleClick("revenue.desc")}
							type="button"
						>
							Revenue
						</div>
					</li>
					<li className="nav-item">
						<div 
							className={getClassByValue("vote_average.desc")}
							onClick={handleClick("vote_average.desc")}
							type="button"
						>
							Vote average
						</div>
					</li>
				</ul>
			)
	}
}

export default MovieTabs;
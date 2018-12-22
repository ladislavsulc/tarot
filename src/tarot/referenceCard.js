import React, { Component } from 'react';

class ReferenceCard extends Component {
	render() {
		return (
			<div className='tarotEntryParent u-cf'>
				<div>
					<img className='u-max-full-width' src={process.env.PUBLIC_URL+'/'+this.props.value.image} alt={this.props.value.description} title={this.props.value.description}></img>
				</div>
				<div>
					<h3>Description</h3>
					<p>
						{this.props.value.description}
					</p>
				</div>
				<div>
					<h3>Interpretation</h3>
					<p>
						{this.props.value.interpretation}
					</p>
				</div>
			</div>
		)
	}
}

export default ReferenceCard;

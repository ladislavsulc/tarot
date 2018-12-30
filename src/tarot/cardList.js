import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import ReferenceCard from './referenceCard.js';

class CardListItem extends Component {
	
	state = {
		open: false,
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	render() {
		const { open } = this.state;
		return (
			<div>
				<button
					className='uk-button uk-button-default uk-width-1-1'
					onClick={this.onOpenModal}
				>{this.props.value.name}
				</button>
				<Modal open={open} onClose={this.onCloseModal} center>
					<h2 className='u-pull-left referenceHead'>{this.props.value.name}</h2>
					<ReferenceCard value={this.props.value}/>
				</Modal>
			</div>

		);
	}
}

class CardList extends Component {
	renderListItem(card){
		return (
			<li key={card.name}>
				<CardListItem value={card}></CardListItem>
			</li>
		)
	}
	render(props){
		let that = this
		const cardList = this.props.deck.map(function(card, index){
			// console.log('card', card, 'index', index)
			return that.renderListItem(card)
		});
		return (
			<section className="uk-section uk-section-primary">
				<div className="uk-container">
					<h1 className="uk-text-center uk-margin-medium-bottom">Card Reference</h1>
					<div className='uk-grid uk-child-width-1-4@l uk-child-width-1-2@s' uk-grid="true">{cardList}</div>
				</div>
			</section>
		)
	}
}

export { CardList, CardListItem }

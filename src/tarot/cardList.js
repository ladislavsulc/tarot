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
					className='uk-button uk-button-default'
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
			<section className="uk-section">
				<div className="uk-container">
					<h1>Card Reference</h1>
					<ul className='uk-list'>{cardList}</ul>
				</div>
			</section>
		)
	}
}

export { CardList, CardListItem }

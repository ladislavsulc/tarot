import React, { Component } from 'react';
import Modal from 'react-modal';
import ReferenceCard from './referenceCard.js';

// const customModalStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
// 	width				  : '300px',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

class CardListItem extends Component {
	constructor(){
		super();
		this.state = {
			modalIsOpen: false,
		};
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		console.log('card', this.props.value)
		this.setState({
			modalIsOpen: true,
			// modalContent: card
		})
	}
	afterOpenModal() {
		// this.subtitle.style.color = '#f00';
	}
	closeModal() {
		this.setState({modalIsOpen: false})
	}
	render() {
		return (
			<div>
				<button
					className='cardButton'
					onClick={this.openModal}
				>{this.props.value.name}
				</button>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					// style={customModalStyles}
					contentLabel='Example modal'
				>
					<h2 className='u-pull-left referenceHead'>{this.props.value.name}</h2>
					<button className='u-pull-right close' onClick={this.closeModal}>X</button>
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
			<div>
				<h1>Card Reference</h1>
				<ul className='cardList'>{cardList}</ul>
			</div>
		)
	}
}

export { CardList, CardListItem }

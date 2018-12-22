import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Modal from 'react-modal';

import { CardListItem } from './cardList.js';
import ReferenceCard from './referenceCard.js';

const customModalStyles = {
   content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		width				  : '1200px',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
   }
};

console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL + '/spreads')

class Spreads extends Component {
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL + '/spreads'}>
				<div className="uk-container">
					<section className="uk-section">
						<h1>Available Spreads</h1>
						<ul className='spreadsNav'>
							<li><Link className='button' to="/one-card-draw">One Card Draw</Link></li>
							<li><Link className='button' to="/ThreeCardDraw">Three Card Draw</Link></li>
							<li><Link className='button' to="/CelticCross">Celtic Cross</Link></li>
						</ul>
					</section>
					<Route exec path="/one-card-draw" component={() => <OneCardDraw deck={this.props.deck}/>}/>
					<Route path="/ThreeCardDraw" component={() => <ThreeCardDraw deck={this.props.deck}/>}/>
					<Route path="/CelticCross" component={() => <CelticCross deck={this.props.deck}/>}/>
				</div>
			</Router>
		)
	}
}

function randomDraw(deck, number){
	// function that returns random unique cards from provided deck
	let newShuffle = deck.slice();
	newShuffle = newShuffle.sort(function(){return .5 - Math.random()});
	let drawnCards = newShuffle.slice(0,number);
	return drawnCards;
}

class SpreadCard extends CardListItem {
	constructor(props) {
		super(props);
		this.state = {
			flipped: false,
			modalIsOpen: false
		}
		this.flipCard = this.flipCard.bind(this);
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	flipCard(e) {
		this.setState({
			flipped: !this.state.flipped
		});
	}
	render() {
		return (
			<div>
				<div className='cardContainer'>
					<div className={this.state.flipped ? 'spreadCard flipped': 'spreadCard' } >
						<div
							className='front'
							// onClick={this.openModal}
						>
							<img alt='card' src={process.env.PUBLIC_URL+'/'+this.props.value.image}/>
							<button className='uk-button uk-button-primary' onClick={this.openModal}>
							?</button>
						</div>
						<div
							className='back'
							onClick={this.flipCard}
						>
						</div>

					</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customModalStyles}
					contentLabel='Example modal'
					ariaHideApp={false}
				>
					<h2 className='u-pull-left referenceHead'>{this.props.value.name}</h2>
					<button className='u-pull-right close' onClick={this.closeModal}>X</button>
					<ReferenceCard value={this.props.value}/>
				</Modal>
			</div>
		)
	}
}

class OneCardDraw extends Component {
	render() {
		this.draw = randomDraw(this.props.deck, 1)
		const drawList = this.draw.map(function(card, index){
			// console.log('card', card, 'index', index)
			return (
				<li key={card.name}>
					<SpreadCard value={card}/>
				</li>
			)
		});
		return (
			<div>
				<p>This is a new one-card draw. Use it as a concept to meditate on for the day.</p>
				<ul className='uk-list'>{drawList}</ul>
			</div>
		)
	}
}

class ThreeCardDraw extends Component {
	constructor(props){
		super(props);
		// console.log('this', this.props.deck)

		this.positions = [
			{id: 0, placement: 'Past'},
			{id: 1, placement: 'Present'},
			{id: 2, placement: 'Future'},
		]
	}
	render() {
		let that = this;
		this.draw = randomDraw(this.props.deck, 3);
		const drawList = this.draw.map(function(card, index){
			// console.log('card', card, 'index', index)
			return (
				<li key={card.name}>
					<strong>{that.positions[index].placement}</strong><SpreadCard value={card}/>
				</li>
			)
		});
		return (
			<div>
				<p>This is a new three-card draw</p>
				<ul className='threeCardDrawList'>{drawList}</ul>
			</div>
		)
	}
}

class CelticCross extends Component {
	constructor(props){
		super(props);
		// console.log('this', this.props.deck)

		this.positions = [
			{id: 0, placement: 'What influences currently surround the querent?'},
			{id: 1, placement: 'What are the obstacles currently blocking the querent?'},
			{id: 2, placement: 'The recent past which formed the foundation for the current situation.'},
			{id: 3, placement: 'The distant past — issues the querent has had to deal with.'},
			{id: 4, placement: 'What does the querent wish to achieve?'},
			{id: 5, placement: 'What is before the querent? The future.'},
			{id: 6, placement: 'The querent\'s attitude or position on the matter.'},
			{id: 7, placement: 'How others see the querent.'},
			{id: 8, placement: 'The querent\'s hopes or fears.'},
			{id: 9, placement: 'The outcome.'},
		]
	}
	render() {
		let that = this;
		this.draw = randomDraw(this.props.deck, 10);
		const drawList = this.draw.map(function(card, index){
			// console.log('card', card, 'index', index)
			return (
				<li key={card.name}>
					<strong>{that.positions[index].placement}</strong><SpreadCard value={card}/>
				</li>
			)
		});
		return (
			<div>
				<p>This is a new celtic cross draw</p>
				<ul className='celticCrossDrawList'>{drawList}</ul>
			</div>
		)
	}
}

export { Spreads };

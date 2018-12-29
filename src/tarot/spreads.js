import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Modal from 'react-responsive-modal';

import { CardListItem } from './cardList.js';
import ReferenceCard from './referenceCard.js';

console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL + '/spreads')

class Spreads extends Component {
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL + '/spreads'}>
				<div>
					<section className="uk-section">
						<div className="uk-container">	
							<h1>Available Spreads</h1>
							<div className="uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-match" uk-grid="true">
								<div>
									<div className="uk-card-media-top uk-visible@s">
										<Link to="/one-card-draw"><img src="https://getuikit.com/docs/images/light.jpg" alt="" /></Link>
									</div>
									<div className="uk-card uk-card-default uk-card-body">
										<h3 className="uk-card-title"><Link to="/one-card-draw">One Card Draw</Link></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
									</div>
								</div>
								<div>
									<div className="uk-card-media-top uk-visible@s">
										<Link to="/ThreeCardDraw"><img src="https://getuikit.com/docs/images/light.jpg" alt="" /></Link>
									</div>
									<div className="uk-card uk-card-primary uk-card-body">
										<h3 className="uk-card-title"><Link to="/ThreeCardDraw">Three Card Draw</Link></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
									</div>
								</div>
								<div>
									<div className="uk-card-media-top uk-visible@s">
										<Link to="/CelticCross"><img src="https://getuikit.com/docs/images/light.jpg" alt="" /></Link>
									</div>
									<div className="uk-card uk-card-secondary uk-card-body">
										<h3 className="uk-card-title"><Link to="/CelticCross">Celtic Cross</Link></h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="uk-section uk-padding-remove-top">
						<div className="uk-container">
							<Route exec path="/one-card-draw" component={() => <OneCardDraw deck={this.props.deck}/>}/>
							<Route path="/ThreeCardDraw" component={() => <ThreeCardDraw deck={this.props.deck}/>}/>
							<Route path="/CelticCross" component={() => <CelticCross deck={this.props.deck}/>}/>
						</div>
					</section>
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
	state = {
		open: false,
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};
	constructor(props) {
		super(props);
		this.state = {
			flipped: false,
		}
		this.flipCard = this.flipCard.bind(this);
	}
	flipCard(e) {
		this.setState({
			flipped: !this.state.flipped
		});
	}
	render() {
		const { open } = this.state;
		return (
			<div>
				<div className='cardContainer'>
					<div className={this.state.flipped ? 'spreadCard flipped': 'spreadCard' } >
						<div
							className='front'
							// onClick={this.openModal}
						>
							<a onClick={this.onOpenModal}>
								<img alt='card' src={process.env.PUBLIC_URL+'/'+this.props.value.image}/>
								<button className='uk-button uk-button-primary' onClick={this.onOpenModal}>
								Meaning</button>
							</a>
						</div>
						<div
							className='back'
							onClick={this.flipCard}
						>
						</div>

					</div>
				</div>
				<Modal open={open} onClose={this.onCloseModal} center>
					<h2 className='u-pull-left referenceHead'>{this.props.value.name}</h2>
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
				<div key={card.name}>
					<SpreadCard value={card}/>
				</div>
			)
		});
		return (
			<div>
				<p className="uk-text-lead">This is a new one-card draw. Use it as a concept to meditate on for the day.</p>
				<div className='uk-flex'>{drawList}</div>
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
				<div className="uk-margin-medium-bottom uk-margin-right" key={card.name}>
					<h5><strong>{that.positions[index].placement}</strong></h5>
					<SpreadCard value={card}/>
				</div>
			)
		});
		return (
			<div>
				<p className="uk-text-lead">This is a new three-card draw</p>
				<div className="uk-flex uk-flex-wrap uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-6@l">{drawList}</div>
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
				<div className="uk-margin-medium-bottom uk-margin-right" key={card.name}>
					<h5><strong>{that.positions[index].placement}</strong></h5><SpreadCard value={card}/>
				</div>
			)
		});
		return (
			<div>
				<p className="uk-text-lead">This is a new celtic cross draw</p>
				<div className="uk-flex uk-flex-wrap uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l" uk-height-match="target: > div > h5">{drawList}</div>
			</div>
		)
	}
}

export { Spreads };

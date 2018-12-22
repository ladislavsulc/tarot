import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'
// import Modal from 'react-modal';
// import logo from './logo.svg';
import './App.css';
import { CardList } from './tarot/cardList.js';
import { Spreads } from './tarot/spreads.js';
// note: below json generated using ./tarot/makedeck.js, but I elected to use pregenerated json to save some processing time
import deck from './tarot/tarot.json';

class App extends Component {
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<div>
					<nav className="uk-navbar-container" uk-navbar>
						<div className="uk-navbar-center">
							<ul className='uk-navbar-nav'>
								<li><Link to="/">Home</Link></li>
								<li><Link to="/cards">Card Reference</Link></li>
								<li><Link to="/spreads">Spreads</Link></li>
							</ul>
						</div>
					</nav>
					<Route exact path='/' component={Home}/>
					<Route path='/cards' component={() => <CardList deck={deck}/>}/>
					<Route path='/spreads' component={() => <Spreads deck={deck}/>}/>
				</div>
			</Router>
		);
	}
}

class Home extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to Tarot Reader</h1>
				<p>Tarot reader is a simple tarot reading and reference app.</p>
				<p>Built by Andy Zeigert using React.</p>
			</div>
		)
	}
}

export default App;

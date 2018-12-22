import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

class TestThing extends React.Component {
	render(props){
		return (
			<div>
				<h1>{this.props.thingOne}</h1>
				<h2>{this.props.thingTwo}</h2>
			</div>
		)
	}
}

class Panel extends React.Component {
	render(){
		return (
			<section>
				<header><h1>{this.props.heading}</h1></header>
				<article>{this.props.content}</article>
			</section>
		)
	}
}

storiesOf('Button', module)
  	.add('with text', () => (
  		<Button onClick={action('clicked')}>Goodbye Horses</Button>
	))
	.add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)
	.add('with curse words', () => <Button onClick={action('clicked')}>Shitbird Button</Button>);

storiesOf('Jebus', module)
	.add('someThing', () => (
		<TestThing thingOne='Holy shit' thingTwo='What the fuck'></TestThing>
	))

storiesOf('Panels', module)
	.add('panel', () => (
		<Panel
			heading='This is a panel'
			content='What else could go here'
		></Panel>
	))

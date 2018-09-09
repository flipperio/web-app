import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Header from './Header.jsx';
import About from './About.jsx';
import Wall from './Wall.jsx';

function Application() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Header />
					<main>
						<Switch>
							<Route exact path='(/|/wall)'>
								<Wall />
							</Route>
							<Route exact path='/about'>
								<About />
							</Route>
						</Switch>
					</main>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

window.addEventListener('DOMContentLoaded', function() {
	const entryPoint = document.getElementById('root');
	ReactDOM.render(<Application />, entryPoint);
});

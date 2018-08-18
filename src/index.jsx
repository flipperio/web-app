import React from 'react';
import ReactDOM from 'react-dom';

function Application() {
	return (
		<h1>Hello World</h1>
	);
}

window.addEventListener('DOMContentLoaded', function() {
	const entryPoint = document.getElementById('root');
	ReactDOM.render(<Application />, entryPoint);
});

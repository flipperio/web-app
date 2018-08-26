import React from 'react';
import PropTypes from 'prop-types';
import config from './config/index.js';

function NavLink({ navItem }) {
	const { label, path, icon } = navItem;
	return (
		<a href={path}>
			<button type='button'><i className={`fa fa-${icon}`} />{label}</button>
		</a>
	);
}

NavLink.propTypes = {
	navItem: PropTypes.shape({
		label: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired
	}).isRequired
};

function Header() {
	const navItmes = config.nav.map(navItem => <NavLink navItem={navItem} key={navItem.label} />);

	return (
		<header className='header-main'>
			<div className='header-main__logo'>
				<img src={config.logoUrl} alt='' />
			</div>
			<nav className='header-main__nav'>
				{navItmes}
			</nav>
		</header>
	);
}

export default Header;

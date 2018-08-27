import React from 'react';
import PropTypes from 'prop-types';
import config from './config/index.js';

function NavLink({ navItem, className }) {
	const { label, path, icon } = navItem;
	return (
		<a href={path} className={className}>
			<button type='button'><i className={`fa fa-${icon}`} />{label}</button>
		</a>
	);
}

NavLink.propTypes = {
	navItem: PropTypes.shape({
		label: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired
	}).isRequired,
	className: PropTypes.string
};

NavLink.defaultProps = {
	className: ''
};

function Header() {
	const navItmes = config.nav.map(navItem => <NavLink navItem={navItem} className='nav-main__item' key={navItem.label} />);

	return (
		<header className='header-main'>
			<div className='header-main__logo'>
				<img src={config.logoUrl} alt='Header logo' />
			</div>
			<nav className='nav-main'>
				{navItmes}
			</nav>
		</header>
	);
}

export default Header;

import React, { Fragment } from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { Divider, Image } from 'semantic-ui-react'

const linkStyle = {
	color: 'black',
	textDecoration: 'none'
}

const dropDownStyle ={
	color: 'white',
	textDecoration: 'none'
}


const unauthenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
		</Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/quibbls/new' style={linkStyle}>
				Start a Quibbl
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='quibbls' style={linkStyle}>
				Find A Quibbl
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Container>
	<Navbar id="navbar" className='m-auto' expand='md'>
		<Navbar.Brand>
			{/* <Link to='/' style={linkStyle}> */}
			<Image src='https://i.imgur.com/pOgjCK6.png?1' size='small' as={NavLink} to="/" />
			{/* </Link> */}
		</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-0'>
				{user && (
					<NavDropdown
						id="nav-dropdown-dark-example"
						title={user.userName}
						menuVariant="dark">
						<NavDropdown.Item >
							<Link to='quibbls' style={dropDownStyle}>
								Profile
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item>
							<Link to='change-password' style={dropDownStyle}>
								Change Password
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item >
							<Link to='sign-out' style={dropDownStyle}>
								Sign Out
							</Link>
						</NavDropdown.Item>
					</NavDropdown>
				)}
				{alwaysOptions}
				{user ? '' : unauthenticatedOptions}
				
			</Nav>
		</Navbar.Collapse>
	</Navbar>
	<Divider/>
	</Container>
)

export default Header

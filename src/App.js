import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { getQuibbls } from './api/quibbls'
import { getTags } from './api/tags'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import IndexQuibbls from './components/Quibbls/IndexQuibbls'
import NewQuibbl from './components/Quibbls/NewQuibbl'
import ShowQuibbl from './components/Quibbls/ShowQuibbl'



const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

	// <----------- STATES AND HELPER METHODS BELOW -------------> //
	const [quibbls, setQuibbls] = useState([])
	const [tags, setTags] = useState([])


	useEffect(()=>{
		getTags()
		.then((tags)=> {
			setTags(tags.data.foundTags)
		})
		.catch(err => console.error(err))
	}, [])

	useEffect(() => {
		// axios call to find all problems in the db
		getQuibbls()
		.then((quibbls) => {
			console.log('these are all the problems in the db\n', quibbls.data.quibbls)
			// sets all problems in the db to state
			setQuibbls(quibbls.data.quibbls)
		})
		.catch(err => console.error(err))
	}, [])


	// refreshes quibbls index to include posted and updated quibbls
	const refreshQuibbls = () => (
		getQuibbls()
		.then((quibbls) => {
			console.log('these are all the problems in the db\n', quibbls.data.quibbls)
			// sets all problems in the db to state
			setQuibbls(quibbls.data.quibbls)
			})
			.catch(err => console.error(err))
	)
	

	return (
		
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} tags={tags} quibbls={quibbls} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>

			{/*-------------- QUIBBL ROUTES START ------------->*/}
				<Route
					path='/quibbls'
					element={
						<IndexQuibbls user={user} quibbls={quibbls}/>
					}
				/>
				<Route
					path='/quibbls/new'
					element={
						<NewQuibbl user={user} refreshQuibbls={refreshQuibbls} tags={tags}/>
					}
				/>
				<Route
					path='/quibbls/:id'
					element={
						<ShowQuibbl user={user} quibbls={quibbls} refreshQuibbls={refreshQuibbls}/>
					}
				/>




			{/*-------------- END QUIBBL ROUTES ------------->*/}
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
		
	)
}

export default App

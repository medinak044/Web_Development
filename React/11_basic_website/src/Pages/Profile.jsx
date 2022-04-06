import { useEffect } from 'react'
import { useHistory, Switch, Link, Route, useRouteMatch } from 'react-router-dom'

import ViewProfile from './ViewProfile'
import EditProfile from './EditProfile'

const Profile = ({ login }) => {
    const history = useHistory()

    useEffect(() => {
        if (!login) {
            history.push(`/`)
        }
    }, [login, history]) // If any of the dependencies have changed, invoke the function

    const { path, url } = useRouteMatch() // Helps with appending urls

    return (
        <>
            <h1>Profile Page</h1>

            <ul className='nav'>
                <li><Link to={`${url}/view-profile`}>View Profile</Link></li>
                <li><Link to={`${url}/edit-profile`}>Edit Profile</Link></li>
            </ul>

            <Switch>
                <Route path={`${path}/view-profile`} component={ViewProfile} />
                <Route path={`${path}/edit-profile`} component={EditProfile} />
            </Switch>
        </>
    )
}

export default Profile
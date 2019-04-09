import * as React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { StoreState } from '../store'

interface InnerProps {
    loggedIn: boolean
}

type Props = InnerProps

const Header: React.FunctionComponent<Props> = ( { loggedIn } ) => (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        { loggedIn && <Link to="/secret">Secret</Link> }
    </div>
)

const mapStateToProps = ( state: StoreState ): InnerProps => ( {
    loggedIn: state.loggedIn,
} )

export default connect( mapStateToProps )( Header )

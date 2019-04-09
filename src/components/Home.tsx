import * as React from "react"
import { connect } from "react-redux"

import { Circuit } from '../models/Circuit'
import { fetchData, StoreState } from "../store"

interface InnerProps {
    circuits: Circuit[]
}

interface DispatchProps {
    fetchData: () => void
}

type Props = InnerProps & DispatchProps

class Home extends React.Component<Props> {
    public serverFetch = fetchData // static declaration of data requirements

    componentDidMount( ) {
        if ( this.props.circuits.length <= 0 ) {
            this.props.fetchData( )
        }
    }

    render( ) {
        const { circuits } = this.props

        return (
            <div>
                <h2>F1 2018 Season Calendar</h2>
                <ul>
                    { circuits.map( ( { circuitId, circuitName, Location } ) => (
                        <li key={ circuitId } >{ circuitName } - { Location.locality }, { Location.country }</li>
                    ) ) }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ( state: StoreState ): InnerProps => ( {
    circuits: state.data,
} )

const mapDispatchToProps: DispatchProps = {
    fetchData,
}

export default connect( mapStateToProps, mapDispatchToProps )( Home )

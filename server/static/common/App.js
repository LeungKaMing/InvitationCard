import React from 'react';
import {Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        num: state.num
    }
}

class Text1Container extends React.Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
        console.log(this.props, 'in text1')
    }
    render () {
        return (
            <div>i am text{this.props.num + 1}.</div>
        )
    }
}
class Text2Container extends React.Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
        console.log(this.props, 'in text2')
    }
    render () {
        return (
            <div>i am text{this.props.num + 2}.</div>
        )
    }
}

const Text1 = connect(mapStateToProps)(Text1Container)
const Text2 = connect(mapStateToProps)(Text2Container)

class App extends React.Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
    }
    render () {
        return (
            <div>
                <Link to="/text1">go text1</Link>
                <Link to="/text2">go text2</Link>
                <Route path="/text1" component={Text1}></Route>
                <Route path="/text2" component={Text2}></Route> 
            </div>
        )
    }
}

export default App
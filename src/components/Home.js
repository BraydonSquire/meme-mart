import React, {Component} from 'react';
import Nav from './Nav';
import Memelist from './Memelist';
import {connect} from 'react-redux';
import {getUserInfo} from '../ducks/reducer';

class Home extends Component {
    constructor(){
        super()

        this.state = {
            Memes:[{img:'blah'}]
        }
    }

    componentDidMount(){
        this.props.getUserInfo()
    }

    render(){
        const Meme = this.state.Memes
        return(
            <div>
                <Nav />
                <Memelist/>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
        
    }
}

export default connect(mapStateToProps, {getUserInfo})(Home);
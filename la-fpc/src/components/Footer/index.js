import React, { Component } from 'react';
import {MainDiv, LeftDiv, RightDiv} from './style'
class Footer extends Component{
    render(){
        return(
            <MainDiv>
                <LeftDiv>
                    <h1>STAY CONNECTED</h1>
                </LeftDiv>
                <RightDiv>
                    <h1>GET INVOLVED</h1>
                </RightDiv>
            </MainDiv>
        )
    }
}

export default Footer
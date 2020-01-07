import React, { Component } from 'react';
import {MainDiv, LeftDiv, RightDiv, SecondDiv} from './style'
import {Link} from "react-router-dom"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Button from '@material-ui/core/Button';

class Footer extends Component{
    render(){
        return(
            <div>
            <MainDiv>
                <LeftDiv>
                    <h3>STAY CONNECTED</h3>
                        <a target="_blank" href="https://www.facebook.com/LosAngelesFoodPolicyCouncil/">
                            <FacebookIcon style={{
                                margin:'10px',
                                cursor: "pointer"
                                }}/>
                        </a>
                        <a target="_blank" href="https://www.instagram.com/lagoodfood/?hl=en">
                            <InstagramIcon style={{
                                margin:'10px',
                                cursor: "pointer"                 }}/>
                        </a>
                        <a target="_blank" href="https://twitter.com/goodfoodla?lang=en">
                            <TwitterIcon style={{
                                margin:'10px',
                                cursor: "pointer"                 }}/>
                        </a>
                </LeftDiv>
                <RightDiv>
                    <h3>GET INVOLVED</h3>
                    <Button variant="contained" style={{backgroundColor:'orange'}}>DONATE</Button>
                </RightDiv>
            </MainDiv>
            <SecondDiv>
                <p>Copyright © 2018 Los Angeles Food Policy Council. All Rights Reserved</p>
            </SecondDiv>
            </div>
        )
    }
}

export default Footer
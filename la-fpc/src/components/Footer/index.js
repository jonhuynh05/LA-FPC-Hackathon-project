import React, { Component } from 'react';
import { MainDiv, LeftDiv, RightDiv, MiddleDiv, SecondDiv } from './style'
import { Link as LinkRoute } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/PersonOutlined';

class Footer extends Component {
    render() {
        return (
            <div>
                <MainDiv>
                    <LeftDiv>
                        <h3>STAY CONNECTED</h3>
                        <a style={{
                            color: "white"
                        }}
                            target="_blank" href="https://www.facebook.com/LosAngelesFoodPolicyCouncil/">
                            <FacebookIcon style={{
                                margin: '10px',
                                cursor: "pointer"
                            }} />
                        </a>
                        <a style={{
                            color: "white"
                        }}
                            target="_blank" href="https://www.instagram.com/lagoodfood/?hl=en">
                            <InstagramIcon style={{
                                margin: '10px',
                                cursor: "pointer"
                            }} />
                        </a>
                        <a style={{
                            color: "white"
                        }}
                            target="_blank" href="https://twitter.com/goodfoodla?lang=en">
                            <TwitterIcon style={{
                                margin: '10px',
                                cursor: "pointer"
                            }} />
                        </a>
                    </LeftDiv>
                    <MiddleDiv>
                        <h3><a href="www.goodfoodla.org">www.goodfoodla.org</a></h3>
                        <a style={{
                            textDecoration: "none"
                        }}
                            target="_blank" href="https://www.goodfoodla.org/donate">
                            <Button variant="contained" style={{ backgroundColor: 'orange' }}>DONATE</Button>
                        </a>
                    </MiddleDiv>
                    {
                        this.props.isLogged ?
                            <MiddleDiv>
                                <h4>Admin Mode</h4>
                                <Button
                                    onClick={(e) => this.props.logout()}
                                    color="inherit"
                                    style={{ color: 'white', fontWeight: 'bold', textTransform: "capitalize" }}
                                >
                                    Logout
                                    </Button>
                            </MiddleDiv>
                            :
                            <RightDiv>
                                <Button
                                    component={LinkRoute}
                                    to='/SignIn'
                                    color="inherit"
                                    style={{ color: 'white', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap', textTransform: "capitalize" }}
                                >
                                    Admin Login <span><PersonIcon /></span>
                                </Button>
                            </RightDiv>
                    }
                </MainDiv>
                <SecondDiv>
                    <p style={{ width: '100%', textAlign: 'center', marginTop: '0' }}>Copyright © 2020 Los Angeles Food Policy Council. All Rights Reserved</p>
                </SecondDiv>
            </div >
        )
    }
}

export default Footer
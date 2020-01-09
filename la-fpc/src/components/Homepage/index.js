import React, { Component } from 'react'
import { Redirect, Switch } from 'react-router-dom'

import {
    HomeDiv,
    Tiles,
    TileDiv,
    TileWrapper,
    MainDiv,
    BannerDiv,
    BannerText,
} from './style'

import afford from "./img/Afford.png"
import fair from "./img/Fair.png"
import health from "./img/Health.png"
import sus from "./img/Sus.png"

import Hero from "./img/Hero.png"
import Food from "./img/Food.png"
import Compost from "./img/Compost.png"
import Plant from "./img/Plant.png"


class Home extends Component {
    render() {
        return (
            <HomeDiv>
                <BannerDiv>
                    <BannerText>
                        <h1><span>Mission Statement</span></h1>
                        <p>The Food System Dashboard is a comprehensive measurement tool used to evaluate the health, affordability, sustainability, and fairness of our Los Angeles food system. It is intended to be used
                        to empower people involved in any sector that have a goal of creating a Good Food system for all
                        Angelenos</p>
                    </BannerText>
                </BannerDiv>
                <MainDiv>
                    <h1>Pillars</h1>
                    <TileDiv>
                        <TileWrapper>
                            <a href='/sustainable'><Tiles src={sus} alt={"logo"} green /></a>
                            <p>Food system is environmentally responsible, equitable, and economically viable</p>
                        </TileWrapper>
                        <TileWrapper>
                            <a href='/healthy'><Tiles src={health} alt={"logo"} orange /></a>
                            <p>Food is integral to the health and quality of life of individuals and communities</p>
                        </TileWrapper>
                        <TileWrapper>
                            <a href='/affordable'><Tiles src={afford} alt={"logo"} yellow /></a>
                            <p>All Angelenos, regardless of their income level, should have the ability to access Good Food</p>
                        </TileWrapper>
                        <TileWrapper>
                            <a href='/fair'><Tiles src={fair} alt={"logo"} blue /></a>
                            <p>Food is produced, manufactured, distributed, sold and recycled through fair labor practices and humane tratemnt of animals</p>
                        </TileWrapper>
                    </TileDiv>
                </MainDiv>
            </HomeDiv>
        )
    }
}

export default Home
import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

import {
    Container,
  } from './style'
  
  import {
    DescribSec,
    DescribPar,
  } from './style'

class Faq extends Component {
    render(){
        return(
            <div>
                <Container>
                    <DescribSec>
                    <h1>Fairness</h1>
                    <DescribPar>Food is integral to the health and quality of life of individuals and communities. Healthy food is nutritious, delicious and safe. Healthy food meets recommended dietary guidelines and supports the body’s ability to fight disease and heal. All people deserve access to healthy food that is affordable, conveniently availability and culturally relevant.</DescribPar>
                    
                    <DescribPar>Not all communities live in neighborhoods where “the healthy choice is the easy choice,” and instead are surrounded by unhealthy food retail such as liquor stores, convenience stores and fast food restaurants. Through the numerous policy, systems and environmental changes led by stakeholders throughout the LAFPC network, we are collectively innovating solutions for overcoming systemic barriers to healthy food access— tailoring these innovations to the unique dynamics of the communities that we serve.</DescribPar>
                    
                    <DescribPar>In this section, we explore progress towards improving the health of ALL Angelenos by evaluating disparities and change over time in the following categories: Increased healthy food access, Improved eating habits amongst adults & children, Rates of obesity, Rates of diet-related diseases.</DescribPar>
                    </DescribSec>
                </Container>
            </div>
        )
    }
}

export default withRouter(Faq)
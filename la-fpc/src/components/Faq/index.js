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
                    <DescribPar>
                        Not all communities live in neighborhoods where “the healthy choice is the easy choice,” and instead are surrounded by unhealthy food retail such as liquor stores, convenience stores and fast food restaurants. Through the numerous policy, systems and environmental changes led by stakeholders throughout the LAFPC network, we are collectively innovating solutions for overcoming systemic barriers to healthy food access— tailoring these innovations to the unique dynamics of the communities that we serve.
                    </DescribPar>

                    <DescribPar>
                        In this section, we explore progress towards improving the health of ALL Angelenos by evaluating disparities and change over time in the following categories: Increased healthy food access, Improved eating habits amongst adults & children, Rates of obesity, Rates of diet-related diseases.
                    </DescribPar>

                    <strong><h1>What are the LAFPC core values?</h1></strong>
                    <DescribSec>
                        <h1>Healthy</h1>
                        <DescribPar>
                            Food is integral to the health and quality of life of individuals and communities. Healthy food is
                            nutritious, delicious and safe. It meets dietary guidelines and contributes to the health and
                            vitality of those that consume it.
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h1>Affordable</h1>
                        <DescribPar>
                            All Angelenos, regardless of their income level, should have the ability to access Good Food.
                            Affordability is an essential component of access. Supplemental nutrition programs such as
                            SNAP, formerly known as food stamps, and Women, Infants and Children (WIC) increase the
                            accessibility of food by expanding the food budgets of program participants, most of whom are
                            low-income children, families and seniors. Prioritizing affordability means ensuring that our most
                            vulnerable populations can access Good Food through the acceptance of supplemental nutrition
                            vouchers and other strategies.
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h1>Fairness</h1>
                        <DescribPar>Fair food consists of food produced, manufactured, distributed, sold and recycled through fair
                        labor practices and humane treatment of animals. At every point in the food supply chain,
                        workers should receive fair compensation, treatment and be free from exploitation. Promoting
                        fair food ensures that food workers compliant with relevant food safety standards, such as the
                        hundreds of mobile food vendors throughout the City of Los Angeles, are free from legal
                        penalties or fines for bringing food to communities that need it most. Lastly, fair food honors and
                        respects the lives of all species involved in food provision.
                        </DescribPar>
                    </DescribSec>
                    
                    <DescribSec>
                        <h1>Sustainable</h1>
                        <DescribPar>
                        Food is integral to the health and quality of life of individuals and communities. Healthy food is
                        nutritious, delicious and safe. It meets dietary guidelines and contributes to the health and
                        vitality of those that consume it.
                        </DescribPar>
                    </DescribSec>
                </Container>
            </div>
        )
    }
}

export default withRouter(Faq)
import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

import {
    Container,
  } from './style'
  
  import {
    DescribSec,
    DescribPar,
  } from './style'

  class AboutLAFPC extends Component {
    render(){
        return(
            <div>
                <Container> 
                    <h1>About the Los Angeles Food Policy Council</h1>
                    <DescribSec>
                        <h3>MISSION</h3>
                        <DescribPar>
                            The Los Angeles Food Policy Council (LAFPC) works to ensure food is healthy, affordable, fair
                            and sustainable for all.
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h3>VISION</h3>
                        <DescribPar>
                            We believe Good Food for All is possible and that all communities deserve access to good food,
                            grown in a way that respects people and the planet. We work to create a local food system free
                            from hunger, rooted in equity and access, supportive of farmers and food workers, and guided
                            by principles of environmental stewardship and regeneration. To accomplish our vision of Good
                            Food for All, we catalyze, coordinate and connect people across the LA region, including
                            government, business and community groups working on food.  
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h3>WHAT WE DO</h3>
                        <DescribPar>
                            The Los Angeles Food Policy Council serves as backbone organization for a network of over
                            400 organizations and agencies working for healthy, sustainable and fair food. Growing from the
                            collective impact model, which brings people and organizations together strategically to create
                            social change. We are making transformative change in three primary ways:
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h5>Cultivate</h5>  
                        <DescribPar>
                            We cultivate a diverse network of change makers from across our food system, from
                            farm to fork and beyond, through cross-sector working groups, network events and other
                            civic engagement activities.
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h5>Align</h5>  
                        <DescribPar>
                            We provide strategic guidance to our stakeholder network through facilitation, research,
                            policy development and training.                
                        </DescribPar>
                    </DescribSec>
                    <DescribSec>
                        <h5>Make Impact</h5>  
                        <DescribPar>
                            We translate collaboration into policy outcomes, and help incubate, launch and lead food
                            system initiatives.                                      
                        </DescribPar>
                    </DescribSec>

                    <DescribSec>
                        <h3>HISTORY</h3>
                        <DescribPar>
                            Originally founded in 2011 as a project of the Office of Mayor Antonio Villaraigosa, LAFPC is
                            now a fiscally Sponsored independent nonprofit and the largest Food Policy Council in the
                            country, with a network of over 6,000 individuals. We run two programs of our own, the Healthy
                            Neighborhood Market Network (HNMN), which works to improve healthy retail access in
                            designated food deserts by providing education and technical assistance to corner store
                            owners, and Food Leaders Lab, which trains food justice leaders in communities that have been
                            most effected by food inequities. We coordinate over 400 organizations from across our region,
                            including government, business, and community groups, to work together on our Good Food for
                            All. We are an 11-member team based in Little Tokyo, Downtown Los Angeles.
                        </DescribPar>
                    </DescribSec>


                </Container>
            </div>
        )
    }
}

export default withRouter(AboutLAFPC)
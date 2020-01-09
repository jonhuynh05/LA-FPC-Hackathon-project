import React, { Component } from 'react'
import "./resources.css"

class Resources extends Component {
    render(){
        return(
            <div>
                <h1 id="resources-header">
                    Resources
                </h1>
                <div id="resources-description">
                    If you'd like more information surrounding food, please download the case studies below.
                </div>
                <div id="resources-container">
                    <div className="case-study-div">
                        <a className="case-study-link" target="_blank" href={require("./caseStudies/Case Study_Affordable_EBT at FMs.docx")} download>
                            EBT at FMs
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Affordable_Everytable.docx")} download>
                            Everytable
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Fair_GFPP.docx")} download>
                            GFPP
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Fair_Street Vending.docx")} download>
                            Street Vending
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Healthy_HNMN.docx")} download>
                            HNMN
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Healthy_WholesomeWave.docx")} download>
                            WholesomeWave
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Sustainable_LA Compost.docx")} download>
                            LA Compost
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Sustainable_Produce Pick Ups.docx")} download>
                            Produce Pick Ups
                        </a>
                    </div>
                    <div className="case-study-div">

                        <a className="case-study-link" href={require("./caseStudies/Case Study_Sustainable_Roots for Peace.docx")} download>
                            Roots for Peace
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Resources
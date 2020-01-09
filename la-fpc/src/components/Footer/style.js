import styled from 'styled-components'

export const MainDiv = styled.div`
    background-color: #156272;
    color: #fff;
    display: flex;
    justify-content: center;
    padding: 10px 20px 10px 20px;
`
export const SecondDiv = styled.div`
    background-color: #156272;
    color: #fff;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
export const LeftDiv = styled.div`
    text-align: center;
    border-right: .5px solid #fff;
    width: 33%;
`

export const MiddleDiv = styled.div`
    text-align: center;
    border-right: .5px solid #fff;
    width: 33%;
    
    a {
        color: white;
    }

    h4 {
        padding-top: 5px;
    }
`

export const RightDiv = styled.div`
    text-align: center;
    width: 33%;
    display: flex;
    margin: auto;
    justify-content: center;

    h3 {
        padding-top: 10px;
    }

    a {
        vertical-align: middle;
    }

    span {
        padding: 0 5px;
    }
`
import styled from 'styled-components'
import health from './img/max-1053152-unsplash.jpg'

export const MainDiv = styled.div`
    margin: 0 5% 0 5%;

    h1 {
        text-align: left;
    }
`
export const BannerDiv = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${health});
    height: 50vh;
    width: 100%; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`

export const BannerText = styled.div`
    text-align: center;
    position: relative;
    width: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
`
export const Tiles = styled.img`
    height: 30vh;
    border-color: ${props => props.green ? '#75b550' : props.orange ? '#f89235' : props.yellow ? '#fcd340' : props.blue ? '#156272' : null};
    border-radius: 20px;
`
export const TileDiv = styled.div`
    margin-top: 0 5% 0 5%;
    display: flex;
    justify-content: center;
    padding-bottom: 3%;
`

export const TileWrapper = styled.div`
    text-align: center;
    padding: 3%;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const DivDataModal = styled.div`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 60%;
  background: #d6d7ad;
  display: flex;
  justify-content: center;
`

export const ContainModal = styled.div`
  width: 50%;
  background: white;
  text-align: center;
`


export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 30px;
`
export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${props => props.isLogged ? "space-evenly" : "center"};
  margin-bottom: 9px;
`

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${props => props.isLogged ? "space-evenly" : "center"};
  margin-bottom: 9px;
`

export const TableData = styled.div`
  margin: 1px;
  width: 11%;
  height: 50px;
  text-align: center;
  overflow: hidden;
  &:hover {
    background: #d6d7ad;
    opacity: .8;
  }
`


export const TableDataHeader = styled.div`
  margin: 1px;
  width: 11%;
  height: 30px;
  text-align: center;
`

export const TableDataButton = styled.div`
  display: flex; 
  flex-direction: row; 
  margin: 1px;
  width: 11%;
  height: 50px;
  text-align: center;
`

export const Button = styled.button`
  width: 100%;
  padding: 3px;
  border-radius: 2px;
`
export const H1 = styled.h1`
  font-size: 1em;
  font-weight: normal;
  background: #d6d7ad;
  margin: 0px;
  margin-bottom: 2px;
  color: white;
`
export const P = styled.p`
  font-size: 20px;
  margin: 0px;
`
export const DescribSec = styled.div`
 text-align: center;
 font-color: gray; 
 margin: 3% 10% 0 10%;
 font-size: 30px; 
`
export const DescribPar = styled.p`
 text-align: center;
 font-size: 25px;
 margin: 2% 0 2% 0;
 font-color: blue; 
 `

 export const ChartDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: 6%;
`

export const ToolKit = styled.div`
  flex-direction: column;
  margin: 3%;
`
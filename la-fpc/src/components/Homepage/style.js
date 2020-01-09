import styled from 'styled-components'
import Hero from './img/Hero.png'


export const HomeDiv = styled.div`
    text-align:center;
`
export const Tiles = styled.img`
    height: 30vh;
    border-width: 2px;
    border-style: solid;
    border-color: ${props => props.green ? '#75b550' : props.orange ? '#f89235' : props.yellow ? '#fcd340' : props.blue ? '#156272' : null};
    border-radius: 20px;
`
export const MainDiv = styled.div`
    margin: 0 10% 0 10%;

    h1 {
        text-align: left;
        padding-left: 30px;
    }
`

export const TileDiv = styled.div`
    margin-top: 0 10% 0 10%;
    display: flex;
    justify-content: center;
    padding-bottom: 3%;
`

export const TileWrapper = styled.div`
    text-align: center;
    padding: 3%;
`

export const BannerDiv = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Hero});
    height: 50vh;
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

export const DescripDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 10% 0 10%;
    border-bottom: 2px solid #D1D1D1;

`

export const Descrip = styled.div`
    text-align: center;
    padding: 3%;
`

export const Text = styled.p`
    text-align: left
`

export const UserImgDiv = styled.div`
    margin-top: 3%;
    display: flex;
    justify-content: center;
    padding: 3%;
    margin: 0 10% 0 10%;
`

export const UserImg = styled.img`
    padding: 30px;
    height: 40vh;
    width: 40vh;
    border-radius: 10%;
    &:hover {
       opacity: .8;
    }
`

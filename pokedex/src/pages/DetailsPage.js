
import { Link } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from "styled-components"
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import GlobalStateContext from "../GlobalState/GlobalContext"
import axios from 'axios'



const MainContainer = styled.div`
height:80vh;
width:100%;
display:flex;
justify-content: space-between;
align-items:center;
`

const ContainerLeft = styled.div`
height:80%;
width:50%;
`
const ContainerRight = styled.div`
height:80%;
width: 50%;
display:flex;

`
const Title = styled.h1`
margin-bottom:3%;
text-align:center;
font-family: poppins;
color:darkgray;
:hover{
  text-decoration:underline #FEB437;
}
`
const FrontBox = styled.div`
background-color: #edb4b4;
display:flex;
align-items:center;
justify-content:center;
margin-left: auto;
margin-right: auto;
margin-bottom: 3%;
height:40%;
width:30%;
-webkit-box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
-moz-box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
`
const FrontImg = styled.img`
height: 100%;
width:100%;
`
const BackImg = styled.img`
height: 100%;
width:100%;
`
const BackBox = styled.div`
background-color: #edb4b4;
display:flex;
align-items:center;
justify-content:center;
margin-left: auto;
margin-right: auto;
height:40%;
width:30%;
-webkit-box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
-moz-box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
`
const Description = styled.div`
text-align:center;
background-color: #edb4b4;
height: 85%;
width:35%;
margin-right:5%;
margin-top: 10%;
-webkit-box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
-moz-box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
box-shadow: -1px 2px 16px 0px rgba(0,0,0,0.34);
`

const DetailsPage = () => {

  const history = useHistory();
  const { name, telaPokedex } = useParams();
  const { pokemons, pokedex } = useContext(GlobalStateContext);
  const [selectedPokemon, setSelectedPokemon] = useState({});


  useEffect(() => {
    let current = [];
    if (telaPokedex) {
      current = pokedex.find((item) => {
        return item.name === name;
      });
    } else {
      current = pokemons.find((item) => {
        return item.name === name;
      });
    }

    if (!current) {
      axios.get(`https://pokeapi.co/api/v2//pokemon/${name}`)
        .then((res) => setSelectedPokemon(res.data))
        .catch((err) => console.log(err.response))
    } else {
      setSelectedPokemon(current)
    }
  }, []);


  return (
    <>

      <Header />
      {selectedPokemon && selectedPokemon.sprites && (
        <MainContainer>
          <ContainerLeft><Title> Pokémon: {name}</Title>
            <FrontBox><FrontImg src={selectedPokemon.sprites.front_default} /></FrontBox>
            <BackBox><BackImg src={selectedPokemon.sprites.back_default} /></BackBox></ContainerLeft>
          <ContainerRight><Description>
            <Title>Powers</Title>
            {selectedPokemon &&
              selectedPokemon.stats.map((stat) => {
                return (
                  <p key={stat.stat.name}>
                    <strong>{stat.stat.name}: </strong>
                    {stat.base_stat}
                  </p>
                );
              })}
            {selectedPokemon &&
              selectedPokemon.types.map((type) => {
                return <p key={type.type.name}>{type.type.name}</p>;
              })}
          </Description>
            <Description>

              <Title>Attacks</Title>
              {selectedPokemon &&
                selectedPokemon.moves.map((move, index) => {
                  return (
                    index < 5 && <p key={move.move.name}>{move.move.name}</p>
                  );
                })}</Description></ContainerRight>
        </MainContainer>

      )}
    </>

  )

};

export default DetailsPage;
  /*{selectedPokemon && selectedPokemon.sprites && ( )}  em volta de tudo, por causa das imagens */

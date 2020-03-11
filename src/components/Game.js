import React from 'react';
import styled from 'styled-components';
import useInterval from '../hooks/use-interval.hook';

import Item from './Item';

import cookieSrc from '../cookie.svg';

const items = [
  { id: 'cookie_monster', name: 'Cookie Monster', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'oompa_loompa', name: 'Oompa Loompa', cost: 1000, value: 105 },
  { id: 'voortman_factory', name: 'Voortman Factory', cost: 50000, value: 5500}
];

let numOwned = {
  cookie_monster: 0,
    grandma: 0,
    oompa_loompa: 0,
    voortman_factory: 0
};

const Game = (
  // {refIndex}
  ) => {
  const [numCookies, setNumCookies] = React.useState(100);
  const [cps, setcps] = React.useState(0);
  // const [itemIndex, setItemIndex] = React.useState(-1);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cookie_monster: 0,
    grandma: 0,
    oompa_loompa: 0,
    voortman_factory: 0
  });
  

  const calculateCookiesPerTick = function(x) {
    return (x.cookie_monster + 10*x.grandma + 105*x.oompa_loompa + 5500*x.voortman_factory)
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies+numOfGeneratedCookies)
  }, 1000);

  function handleClickCookie() {
    setNumCookies(numCookies + 1);
  }
  function handleClickItem(cost, id, value) {
    if (numCookies < cost) {
      window.alert('You must collect more cookies before you can have this')
      return;
    }
    setNumCookies(numCookies - cost);
    numOwned[id] ++;
    setPurchasedItems({
      ...purchasedItems,
      [id]: purchasedItems[id] + 1,
    });
    // console.log(purchasedItems);
    // console.log(numOwned);
    setcps(cps+value);
    // event.stopPropagation(); Couldn't get this working
  }

React.useEffect(() => {
  document.title = `${numCookies} Cookies for Cookie Monster`
  return () => {
    document.title = `Cookie Monster Want Cookies`;
  };
}, [numCookies]);

React.useEffect(() => {
  const psbfc = (ev) => {
    if (ev.code === 'Space') {
      setNumCookies(numCookies + 1);
    }
  }
  window.addEventListener('keydown', psbfc);
  return () => {
    window.removeEventListener('keydown', psbfc);
  };
}, [numCookies]);

let itemIndex = -1;
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cps}</strong> cookies per second
        </Indicator>
        <Button
        onClick = {handleClickCookie}
        >
          <Cookie 
          src = {cookieSrc} 
          />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item=> {
          itemIndex ++;
          return (
            <Item 
              key = {item.id}
              id = {item.id}
              name = {item.name}
              cost = {item.cost}
              value = {item.value}
              numOwned = {numOwned[item.id]}
              handleClickItem = {handleClickItem}
              itemIndex = {itemIndex}
              // refIndex = {refIndex}
              // setItemIndex = {setItemIndex}
            />
          )
      })}

      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;

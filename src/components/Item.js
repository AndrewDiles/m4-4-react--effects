import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';


const Item = ({id, name, cost, value, numOwned, handleClickItem, itemIndex, setItemIndex, refIndex}) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (itemIndex === 0) {
      ref.current.focus();
    }
  }, [itemIndex])
  // {setItemIndex(itemIndex +1);}
  let idPlaceHolder = `button#${itemIndex}`;
  console.log(idPlaceHolder);
  // if (itemIndex === 0) {document.getElementById(`${id}`).focus();}   Does not work.
  return (
    <ItemWrapper
      // onClick = {handleClickItem}
      // onClick = {()=> handleClickItem(cost, id, value) }
    >
      <Left
      onClick = {()=> handleClickItem(cost, id, value) }
      >
        <Name>{name}</Name>
        <ItemInfo>
          <Cost>{`Cost: ${cost} cookie(s). `}</Cost>
          <Value>{` Produces ${value} cookie(s)/second.`}</Value>
        </ItemInfo>
      </Left>
      <Right onClick = {()=> handleClickItem(cost, id, value) }>
        {numOwned}
        <AugmentButton 
          id={idPlaceHolder} 
          // onClick = {()=> handleClickItem(cost, id, value)} 
          ref={itemIndex === 0 ? ref : null
          }
        >
          +
        </AugmentButton>
      </Right>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid;
  border-color: grey;
  margin: 10px;
  justify-content: space-between;
  &:hover, :focus{
    color: lime;
    cursor: pointer;
  }
`;
const AugmentButton = styled.button`
  font-size: 1em;
  background-color: slategray;
  border-color: grey;
  margin-left: 10px;
  min-width: 70px;
  &:hover, :focus{
    color: lime;
    cursor: pointer;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const Right = styled.div`
  font-size: 3em;
  margin-left: 20px;
`;
const Name = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`
const Cost = styled.span`
  color:grey;
`
const Value = styled.span`
  color:grey;
`
const ItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8em;
`


export default Item;

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import { Item } from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useDocumentTitle from "../hooks/use-DocumentTitle.hook";
import useKeydown from "../hooks/use-Keydown.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, clickValue: 0 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, clickValue: 0 },
  { id: "megaCursor", name: "Mega Cursor", cost: 500, value: 0, clickValue: 5 },
  { id: "farm", name: "Farm", cost: 1000, value: 80, clickValue: 0 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    megaCursor: 0,
    farm: 0,
  });
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [cookiesPerClick, setCookiesPerClick] = useState(1);

  const handlePlusOneCookie = () => setNumCookies(numCookies + cookiesPerClick);

  const calculateCookiesPerTick = () => {
    let numCookiesPerSec = 0;
    items.forEach((item) => {
      numCookiesPerSec += purchasedItems[item.id] * item.value;
    });

    return numCookiesPerSec;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
    setCookiesPerSecond(numOfGeneratedCookies);
  }, 1000);

  useDocumentTitle(`${numCookies} cookies`, "Cookie Clicker Workshop");

  useKeydown("Space", handlePlusOneCookie);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={handlePlusOneCookie}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item, index) => {
          return (
            <>
              <Item
                index={index}
                name={item.name}
                cost={item.cost}
                value={item.value}
                clickValue={item.clickValue}
                key={item.id}
                purchasedItem={purchasedItems[item.id]}
                onClick={() => {
                  if (numCookies - item.cost < 0) {
                    window.alert(
                      "You crazy? You ain't got no cash fo' dat! hahaha broke ass"
                    );
                    return;
                  }
                  setNumCookies(numCookies - item.cost);
                  setCookiesPerClick(cookiesPerClick + item.clickValue);
                  setPurchasedItems({
                    ...purchasedItems,
                    [item.id]: purchasedItems[item.id] + 1,
                  });
                  item.cost = Math.floor(Math.pow(item.cost, 1.1));
                }}
              />
            </>
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
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

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;

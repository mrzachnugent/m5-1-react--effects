import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export const Item = ({
  name,
  cost,
  value,
  purchasedItem,
  onClick,
  index,
  clickValue,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!index) {
      ref.current.focus();
    }
  }, [index]);

  return (
    <ItemContainer ref={ref} onClick={onClick}>
      <div>
        <Name>{name}</Name>
        <p>
          Cost: {cost} cookie(s).{" "}
          {!clickValue && `Produces ${value} cookies/second.`}
          {!value && `Produces ${clickValue} cookies/click.`}
        </p>
      </div>
      <PurchasedItems>{purchasedItem}</PurchasedItems>
    </ItemContainer>
  );
};

const ItemContainer = styled.button`
  display: flex;
  text-align: left;
  padding: 15px 0;
  border: none;
  background: transparent;
  color: #fff;
  border-bottom: 1px solid #333;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h5`
  font-size: 21px;
`;

const PurchasedItems = styled.div`
  font-size: 36px;
  padding-left: 25px;
`;

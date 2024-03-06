import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS } from "../helpers/const";
import { calcSubPrice, calcTotalCount } from "../helpers/function";
import axios from "axios";
const cardContext = createContext();
export const useCard = () => useContext(cardContext);

const INIT_STATE = {
  card: JSON.parse(localStorage.getItem("card")),
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_BASKET:
      return { ...state, card: action.payload };

    default:
      return state;
  }
};
const CardContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function addProductToCard(product) {
    let card = JSON.parse(localStorage.getItem("card"));
    if (!card) {
      card = {
        products: [],
        totalCount: 0,
      };
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };
    card.products.push(newProduct);
    localStorage.setItem("card", JSON.stringify(card));
    getProductFromCard();
  }

  function getProductFromCard() {
    let card = JSON.parse(localStorage.getItem("card"));
    if (!card) {
      localStorage.setItem(
        "card",
        JSON.stringify({ products: [], totalCount: 0 })
      );
    }
    dispatch({
      type: ACTIONS.GET_BASKET,
      payload: card,
    });
  }

  function checkProductInCard(id) {
    let card = JSON.parse(localStorage.getItem("card"));
    if (card) {
      let obj = card.products.find((el) => el.item.id === id);
      return obj ? true : false;
    }
    getProductFromCard();
  }

  function deleteProductInCard(id) {
    let card = JSON.parse(localStorage.getItem("card"));
    card.products = card.products.filter((el) => el.item.id !== id);
    card.totalCount = calcTotalCount(card.products);
    localStorage.setItem("card", JSON.stringify(card));
    getProductFromCard();
  }

  function changeProductCount(count, id) {
    let card = JSON.parse(localStorage.getItem("card"));
    if (count < 1) {
      alert("error");
      return;
    }

    card.products.map((product) => {
      if (product.item.id === id) {
        product.count = count;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });
    card.totalCount = calcTotalCount(card.products);
    localStorage.setItem("card", JSON.stringify(card));
    getProductFromCard();
  }

  //! sendProductFromTelegram
  const TOKEN = `6890653434:AAF3nQNuUL_rXKhDTktVLx3nvhqZ80rhmmQ`;
  const MY_ID = `-1002128339253`;
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  async function sendProductFromTelegram(product) {
    let values = ``;
    product.map((el) => {
      values += `Hазвание: `;
      values += `${el.item.title}\n`;
      values += `Цена: `;
      values += `${el.item.price}\n`;
      values += `Описание: `;
      values += `${el.item.descr}\n`;
      values += `Кол-во: `;
      values += `${el.count}\n`;
      values += `${el.item.image}`;
    });
    let newObj = {
      chat_id: MY_ID,
      parse_model: "html",
      text: values,
    };
    await axios.post(URL_API, newObj);
  }
  //! sendProductFromTelegram

  const values = {
    addProductToCard,
    checkProductInCard,
    checkProductInCard,
    getProductFromCard,
    card: state.card,
    deleteProductInCard,
    changeProductCount,
    sendProductFromTelegram,
  };
  return <cardContext.Provider value={values}>{children}</cardContext.Provider>;
};

export default CardContext;

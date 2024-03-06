import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS } from "../helpers/const";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const productContext = createContext();
export const useProduct = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  oneProduct: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET:
      return { ...state, products: action.payload };
    case ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
};

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const productColectionRef = collection(db, "product");

  async function addProduct(newProduct) {
    await addDoc(productColectionRef, newProduct);
  }

  async function readProduct() {
    let data = await getDocs(productColectionRef);
    let response = data.docs.map((item) => ({ ...item.data(), id: item.id }));
    dispatch({
      type: ACTIONS.GET,
      payload: response,
    });
  }

  async function deleteProduct(id) {
    const productDocRef = doc(db, "product", id);
    await deleteDoc(productDocRef);
    readProduct();
  }

  async function getOneProduct(id) {
    const productDocRef = doc(db, "product", id);
    let data = await getDoc(productDocRef);
    data = { ...data.data(), id: data.id };
    dispatch({
      type: ACTIONS.GET_ONE_PRODUCT,
      payload: data,
    });
  }

  async function updateProduct(id, newProduct) {
    const productDocRef = doc(db, "product", id);
    await updateDoc(productDocRef, newProduct);
    readProduct();
  }

  //! PAGINATION

  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  const count = Math.ceil(state.products.length / itemsPerPage);

  function currentPage() {
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    return state.products.slice(start, end);
  }

  //! PAGINATION

  //! SEARCH

  function searchProduct(value) {
    let result = state.products.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.price.toString().includes(value.toString())
    );
    dispatch({
      type: ACTIONS.GET,
      payload: result,
    });
    if (!value) {
      readProduct();
    }
  }

  //! SEARCH

  //! FILTER

  function sortByPrice(value) {
    if (value === "high") {
      let result = state.products.sort((a, b) => +b.price - +a.price);
      dispatch({
        type: ACTIONS.GET,
        payload: result,
      });
    } else if (value === "low") {
      let result = state.products.sort((a, b) => +a.price - +b.price);
      dispatch({
        type: ACTIONS.GET,
        payload: result,
      });
    } else {
      readProduct();
    }
  }

  //! FILTER

  const values = {
    addProduct,
    readProduct,
    products: state.products,
    deleteProduct,
    getOneProduct,
    oneProduct: state.oneProduct,
    updateProduct,
    currentPage,
    setPage,
    count,
    searchProduct,
    sortByPrice,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContext;

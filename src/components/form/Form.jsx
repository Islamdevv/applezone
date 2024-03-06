import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { useParams } from "react-router-dom";

const Form = ({ isEdit }) => {
  const { addProduct, getOneProduct, oneProduct, updateProduct } = useProduct();

  const [products, setProducts] = useState({
    title: "",
    price: "",
    descr: "",
    image: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && oneProduct) {
      getOneProduct(id);
    }
  }, []);

  useEffect(() => {
    if (isEdit && oneProduct) {
      setProducts(oneProduct);
    }
  }, [oneProduct]);

  function handleValues(e) {
    if (e.target.name === "price") {
      let obj = { ...products, [e.target.name]: Number(e.target.value) };
      setProducts(obj);
    } else {
      let obj = { ...products, [e.target.name]: e.target.value };
      setProducts(obj);
    }
  }

  function handleChangeProduct() {
    addProduct(products);
  }

  function handleSaveProduct() {
    updateProduct(id, products);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          onChange={handleValues}
          name="title"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={products.title}
        />
        <TextField
          onChange={handleValues}
          name="price"
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={products.price}
        />
        <TextField
          onChange={handleValues}
          name="descr"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={products.descr}
        />
        <TextField
          onChange={handleValues}
          name="image"
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={products.image}
        />
        {isEdit ? (
          <Button onClick={handleSaveProduct} variant="contained">
            save
          </Button>
        ) : (
          <Button onClick={handleChangeProduct} variant="contained">
            create
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Form;

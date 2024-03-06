import React, { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import CardProduct from "./CardProduct";
import { Box, FormControl, InputLabel } from "@mui/material";
import PaginationProduct from "./PaginationProduct";

const ListProduct = () => {
  const { readProduct, currentPage, sortByPrice } = useProduct();
  useEffect(() => {
    readProduct();
  }, []);

  return (
    <Box className="container">
      <InputLabel id="demo-simple-select-filled-label">
        Sort By Price
      </InputLabel>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <select onChange={(e) => sortByPrice(e.target.value)}>
          <option value="all">All</option>
          <option value="high">Price: High-Low</option>
          <option value="low">Price: Low-High</option>
        </select>
      </FormControl>
      <div
        style={{
          display: "flex",
          gap: "30px",
          padding: "20px 0 20px 0",
          justifyContent: "center",
        }}
      >
        {currentPage().map((el, index) => (
          <CardProduct el={el} key={index} />
        ))}
      </div>
      <PaginationProduct />
    </Box>
  );
};

export default ListProduct;

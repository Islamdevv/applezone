import { Pagination } from "@mui/material";
import React from "react";
import { useProduct } from "../../context/ProductContext";

const PaginationProduct = () => {
  const { setPage, count } = useProduct();
  console.log(count);
  function handleChangePagination(p, n) {
    setPage(n);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        p: "20px 0",
      }}
    >
      <Pagination
        onChange={handleChangePagination}
        count={count}
        color="primary"
      />
    </div>
  );
};

export default PaginationProduct;

import React, { useEffect } from "react";
import { useCard } from "../context/CardContext";
import { Box, Typography } from "@mui/material";
import CardTable from "../components/card/CardTable";

const CardPage = () => {
  const { getProductFromCard, card } = useCard();
  useEffect(() => {
    getProductFromCard();
  }, []);

  return (
    <Box>
      {card.products.length > 0 ? (
        <CardTable card={card} />
      ) : (
        <Typography variant="h3">FALSE</Typography>
      )}
    </Box>
  );
};

export default CardPage;

import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProduct } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useCard } from "../context/CardContext";

export default function DetailsPage() {
  const { getOneProduct, oneProduct } = useProduct();
  const { addProductToCard, checkProductInCard } = useCard();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneProduct(id);
  }, []);

  console.log(oneProduct);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: "50px 0",
      }}
    >
      <Card sx={{ width: 550, height: 500, borderRadius: "20px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {oneProduct.title}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 250, width: 400, margin: "0 auto" }}
          image={oneProduct.image}
          title="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {oneProduct.price}$
          </Typography>
          <Typography
            sx={{ width: "530px" }}
            variant="body2"
            color="text.secondary"
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          {checkProductInCard(oneProduct.id) ? (
            <>
              <Button
                onClick={() => navigate("/menu")}
                color="secondary"
                variant="contained"
                size="small"
              >
                continue shopping
              </Button>
              <Button disabled variant="contained" size="small">
                add to basket
              </Button>
            </>
          ) : (
            <Button
              onClick={() => addProductToCard(oneProduct)}
              variant="contained"
              size="small"
            >
              add to basket
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

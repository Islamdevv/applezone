import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../helpers/const";
import { useAuth } from "../../context/AuthContext";

export default function CardProduct({ el }) {
  const { deleteProduct } = useProduct();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 350, height: 480, borderRadius: "20px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {el.title}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 230, width: 230, margin: "0 auto" }}
        image={el.image}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {el.price}$
        </Typography>
        <Typography
          sx={{ width: "320px" }}
          variant="body2"
          color="text.secondary"
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          p: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: ADMIN.map((el) =>
            user && el.email === user.email ? "center" : "flex-end"
          ),
        }}
      >
        {ADMIN.map((el) =>
          user && el.email === user.email ? (
            <>
              <Button onClick={() => deleteProduct(el.id)} size="small">
                delete
              </Button>
              <Button onClick={() => navigate(`/edit/${el.id}`)} size="small">
                edit
              </Button>
            </>
          ) : (
            ""
          )
        )}
        <Button
          sx={{ borderRadius: "20px" }}
          onClick={() => navigate(`/details/${el.id}`)}
          variant="contained"
          size="small"
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}

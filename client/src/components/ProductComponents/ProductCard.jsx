import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios"
import {useParams} from "react"

const ProductCard = ({
  title,
  images,
  description,
  rating,
  price,
  discountPercentage,
  onDelete,
  product
}) => {


  return (
    <div>
      <Card
        sx={{
          width: 345,
          height: 550,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CardHeader title={title} />
        <CardMedia
          component="img"
          height="194"
          image={images}
          alt="Product image"
        />
        <CardContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" color="text.primary">
                {rating}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="body1" color="text.primary">
                {price} $
              </Typography>
              <Typography variant="body1" color="text.primary">
                Price discount: {discountPercentage}%
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <div className="flex">
          {" "}
          <button>Edit</button>
          <button onClick={() => onDelete()}>Delete</button>
        </div>
      </Card>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number.isRequired,
};

export default ProductCard;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Container, Grid, Typography} from "@mui/material";
import type { ProductOverview } from "../../../types/Store/Product";
import { apiFetch } from "../../../services/api/helper";
import "./storeoverview.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

const headerTextMap: Record<string, string> = {
  men: "Men's Collection",
  women: "Women's Collection",
};

export default function StoreOverview() {
  const [tshirts, setTshirts] = useState<ProductOverview[]>([]);
  const { gender } = useParams<{ gender: string }>();

  useEffect(() => {
    const selectedGender = gender?.length ? gender : "Men";

    apiFetch<ProductOverview[]>(`/api/store/apparel?genders=${selectedGender}`)
      .then(setTshirts)
      .catch((err: unknown) => console.error("API error:", err));
  }, [gender]);

  const collectionLabel = gender
    ? headerTextMap[gender.toLowerCase()] || "Our Collection"
    : "Our Collection";

  return (
    <Box className="store-page">
      <Container
        maxWidth={false}
        disableGutters
        className="store-shell"
      >
        <Box className="store-hero">
          <Chip label={collectionLabel} size="small" className="eyebrow-chip" />
          <Typography variant="h3" component="h1" className="hero-title">
            Merch built for the stage and the pit
          </Typography>
          <Typography variant="body1" className="hero-subtitle">
            Explore graphic drops, tour favorites, and classic fits. Pick your style and we will handle the rest.
          </Typography>
        </Box>

        {tshirts.length === 0 ? (
          <Box className="store-empty">
            <Typography variant="h6">No shirts available right now. Check back soon.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {tshirts.map((shirt) => (
              <Grid item key={shirt.id} xs={12} sm={6} md={4}>
                <Card className="store-card">
                  <CardActionArea component={Link} to={`/store/tshirts/${shirt.id}`}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={shirt.imageUrl}
                      alt={shirt.name}
                      sx={{ objectFit: "cover", backgroundColor: "black" }}
                    />
                  </CardActionArea>
                  <CardContent sx={{ flexGrow: 1, display: "grid", gap: 1.25 }}>
                    <Box className="store-card__meta">
                      <Chip label={shirt.category} size="small" />
                      <Typography variant="body2" color="gainsboro">
                      </Typography>
                    </Box>
                    <Typography gutterBottom variant="h6" component="h3" className="store-card__title">
                      {shirt.name}
                    </Typography>
                    <Typography variant="body2" className="store-card__blurb">
                      Ready for late-night shows and weekend fits.
                    </Typography>
                  </CardContent>
                  <CardActions className="store-card__footer">
                    <Button
                      component={Link}
                      to={`/store/tshirts/${shirt.id}`}
                      variant="contained"
                      color="primary"
                      className="store-card__button"
                    >
                      View
                    </Button>
                    <Typography variant="h6" className="store-card__price">
                      {currencyFormatter.format(shirt.price ?? 0)}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

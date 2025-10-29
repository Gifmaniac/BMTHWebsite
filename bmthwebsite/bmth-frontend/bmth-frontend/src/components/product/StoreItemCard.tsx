import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import type { ProductOverview } from "../../types/Store/Product";

interface ProductCard {
    product : ProductOverview;
}

export default function StoreItemCard({ product }: Readonly<ProductCard>) {
    return (
        <Grid>
            <Card className="store-card">
                {/* normal overlay */}
                <CardActionArea
                    component={Link}
                    to={`/store/${product.category.toLowerCase()}/${product.id}`}
                    sx={{ position: "relative", height: "100%" }}>
                    <CardMedia
                        component="img"
                        height="280"
                        image={product.imageUrl}
                        alt={product.name}
                        sx={{ objectFit: "cover" }}
                    />

                    {/* Hover overlay */}
                    <Box component="div" className="store-box-overview">
                        <Typography variant="button" className="text-box">
                            View Details
                        </Typography>
                    </Box>

                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="button" className="text-box">
                        {product.name}
                        <br />
                        €{product.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

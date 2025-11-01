import React, { useContext } from "react";
import { CartContext } from "../../../context/store/CartContext.tsx";
import { Box, Typography, Button, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function CartDetails() {
  const cart = useContext(CartContext);
  const items = cart?.cart || [];


  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3} align="center">
        Your Cart
      </Typography>

      {/* If no item is in cart */}
      {items.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty,{" "}
          <Link component={RouterLink} to="/store/apparel">
            click here
          </Link>{" "}
          to start filling it!
        </Typography>
      ) : (
        <>
        {/* If items are in cart maps them */}
          {items.map((item) => (
            <Stack
              key={item.productId}
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ borderBottom: "1px solid #ccc", py: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">
                    Color: {item.color} | Size: {item.size} | Quantity: {item.quantity}
                  </Typography>
                </Box>
              </Box>

              <Typography>€{(item.price * item.quantity).toFixed(2)}</Typography>

              <Button
                color="error"
                variant="outlined"
                onClick={() => cart?.removeFromCart(item)}
              >
                Remove
              </Button>
            </Stack>
          ))}

          {/* Total at bottom */}
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Typography variant="h6">
              Total: €
              {items
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CartDetails;

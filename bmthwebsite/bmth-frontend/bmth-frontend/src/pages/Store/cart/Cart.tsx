import React, { useContext } from "react";
import { CartContext } from "../../../context/store/CartContext.tsx";
import { Box, Typography, Button, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { createOrder } from "../../../services/api/orders";

function CartDetails() {
  const cart = useContext(CartContext);
  const items = cart?.cart || [];

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleBuy = async () => {
    if (!cart || items.length === 0) return;
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          color: i.color,
          size: i.size,
          quantity: i.quantity,
        })),
      };

      await createOrder(payload);
      setSuccess("Order placed successfully.");
      cart.clearCart();
    } catch (e: any) {
      setError(e?.message ?? "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };


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
                onClick={() =>
                  cart?.removeFromCart({
                    productId: item.productId,
                    color: item.color,
                    size: item.size,
                    variantId: item.variantId,
                  })
                }
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

          <Box sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuy}
                disabled={submitting}
              >
                {submitting ? "Placing order..." : "Buy Now"}
              </Button>
            </Stack>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" sx={{ mt: 2 }}>
                {success}
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default CartDetails;

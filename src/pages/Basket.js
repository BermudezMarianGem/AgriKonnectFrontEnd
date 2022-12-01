/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavbarCustomer from "./NavbarCustomer";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Image } from "mui-image";
import { useNavigate } from "react-router-dom";

const SHIPPING_FEE = 50;

function Basket() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(state);
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [search, setSearch] = useState("")
  // const [productList, setProductList] = useState([])
  // const [results, setResults] = useState([])

  // useEffect(() => {
  //   const results = productList.find((product) => product.name == search)
  //   setResults(results)
  // }, [search])

  useEffect(() => {
    var total_ = 0;

    //para sa total
    selectedItems.forEach((item) => {
      total_ = item.price * item.fruits_qty;
    });


    setTotal((prev) => prev + total_);

    if (Object.keys(customer).length === 0) {
      setCustomer(JSON.parse(localStorage.getItem("customer")));
    }

    if (!cart) {
      axios
        .get(`http://127.0.0.1:8000/api/basket/${customer.id}`)
        .then((res) => {
          if (res.status === 200) {
            setCart(res.data.cart);
            setLoading(false);
          }
        });
    }
  }, [customer, cart, selectedItems]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              fruits_qty: item.fruits_qty - (item.fruits_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              fruits_qty: item.fruits_qty + (item.fruits_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios
      .put(
        `http://localhost:8000/api/basket-updatedquantity/${cart_id}/${scope}/${customer.id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          //swal("Success", res.data.message, "success")
        }
      });
  }
  if (loading) {
    return <h4>Loading Basket...</h4>;
  }

  const addToSelected = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((e) => e !== item));
      setTotal(0);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleCheckout = () => {
    console.log(cart);
    navigate(`/checkout/${customer.id}`, { state:{ shippingFee: SHIPPING_FEE, selectedItems, total }});
  };

  const getBasketContent = () => {
    if (cart.length > 0) {
      return (
        <FormGroup>
          {cart.map((item, idx) => (
            <Paper
              key={idx}
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyConte: "space-between",
              }}
            >
              <Box sx={{ display: "flex", width: "50%", margin: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Checkbox onClick={() => addToSelected(item)} />
                  <Image src="" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "50%",
                  }}
                >
                  <Typography>{item.name}</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Php {item.price * item.fruits_qty}
                  </Typography>
                </Box>
              </Box>
              <Box>{/* dito ilalagay ung pang toggle ng amount */}</Box>
            </Paper>
          ))}
        </FormGroup>
      );
    } else {
      return (
        <div>
          <div className="card card-body py05 text-center shadow-sm">
            <h4>Your Shopping Cart is Empty</h4>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <NavbarCustomer />
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Typography>Basket</Typography>
          </Box>
          {getBasketContent()}
          <Paper
            sx={{
              display: "flex",
              width: "30%",
              alignSelf: "flex-end",
              padding: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Subtotal: Php {total}
              </Typography>
              <Typography>Shipping Fee: Php {SHIPPING_FEE}</Typography>
            </Box>
            <Button sx={{ height: 64 }} variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Basket;

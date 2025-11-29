import { useEffect} from "react";
import axios from "axios";
const PaystackButton = ({
  amt,
  order_ref,
  email,
  address_id,
  onSuccess,
  onClose,
}) => {
  const paystackPublicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const user = JSON.parse(localStorage.getItem("user")); // get user info
  const authToken = localStorage.getItem("token"); // get auth token
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // get cart item

  // function to create order item in the backend

  const res = async (data) => {
    const respo = await axios.post("http://laseappstore.test/api/order/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("Order created:", respo.data);
  }
  useEffect(() => {
    // load the Paystack script only once
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("address id in paystack button:", address_id);
  }, []);

  // create order items when component mount
     const fetchData= async () => {
      const response = await axios.get("http://laseappstore.test/api/allproduct");
      const produces = response.data.products;

      console.log("Produces", produces)
      console.log("Cart", cart)
     
       cart.forEach((item, index)=> {
        const prod = produces.find((items) => items.product_id === item.productID);
      
       let data = {
        product_id: prod.product_id,
        quantity: item.quantity,
        unit_price: prod.selling_price,
        cost_price: prod.selling_price * item.quantity,
        address_id: address_id,
        order_ref: order_ref,
       };
       res(data)
        });
      }

      const completePayment = async (responseRef) => {
        fetchData();
        try {
          const result = await axios.post("http://laseappstore.test/api/payment/create",
              {
                order_ref: order_ref,
                total: amt,
                payment_ref: responseRef,
                customer_id: user.id,
                address_id: address_id,
                payment_method: "Paystack",
              },
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            console.log("Payment processed:", result.data);
        } catch(error) {
           console.error("Error completing payment", error);
        }
        
      }

  const payWithPaystack = () => {
    // const ref = `PAYSTACK-${Date.now()}`;
    const handler = window.PaystackPop.setup({
      key:
        paystackPublicKey || "pk_test_00fcab1c359248e7c131a34095afa5601eefab4e",
      email: email,
      amount: amt * 100,
      currency: "NGN",
      ref: order_ref,
      metadata: {
        orderRef: order_ref,
      },
      callback: (response) => {
        console.log(response);
        console.log(address_id);
        if (response.status === "success") {
          completePayment(response.reference)
        }
        onSuccess(response);
      },
      onClose: (response) => {
        onClose(response);
        alert("Payment window closed.");
      },
    });
    handler.openIframe();
  };
  return (
    <button
      onClick={payWithPaystack}
      className="w-full pay-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus-ring-offset-2 focus:ring-yellow-400"
    >
      Pay with Paystack
    </button>
  );
};
export default PaystackButton;

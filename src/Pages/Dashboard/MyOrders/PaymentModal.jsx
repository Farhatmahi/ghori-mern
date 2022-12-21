// import React, { useEffect, useState } from "react";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useContext } from "react";

// import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthProvider";

// const PaymentModal = ({ order }) => {
//   const { product_price, product_name } = order;

//   const { user } = useContext(AuthContext);

//   const [clientSecret, setClientSecret] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [cardError, setCardError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [transactionId, setTransactionId] = useState("");

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("[error]", error);
//       setCardError(error.message);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//       setCardError("");
//     }

//     setSuccess("");
//     setProcessing(true);
//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: user?.displayName,
//             email: user?.email,
//           },
//         },
//       });

//     if (confirmError) {
//       setCardError(confirmError.message);

//       return;
//     }

//     if (paymentIntent.status === "succeeded") {
//       const payment = {
//         user: user?.email,
//         product_price: product_price,
//         transactionId: paymentIntent.id,
//       };

//       fetch("http://localhost:2000/payment", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           authorization: `bearer ${localStorage.getItem("access-token")}`,
//         },
//         body: JSON.stringify(payment),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           if (data.insertedId) {
//             toast.success(`Congratulation, your payment succeeded`, {
//               style: {
//                 padding: "16px",
//                 backgroundColor: "#000000",
//                 color: "#ffffff",
//                 borderRadius: "0",
//               },
//               iconTheme: {
//                 primary: "#ffffff",
//                 secondary: "#000000",
//               },
//             });
//             setSuccess("Congratulation, your payment succeeded");
//             setTransactionId(paymentIntent.id);
//           }
//         });
//     }
//     setProcessing(false);
//   };

//   const price = parseInt(product_price);

//   useEffect(() => {
//     fetch("http://localhost:2000/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `bearer ${localStorage.getItem("access-token")}`,
//       },
//       body: JSON.stringify({ price }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//       });
//   }, [price]);

//   const stripe = useStripe();
//   const elements = useElements();

//   return (
//     <form onSubmit={handlePayment} className="">
//       <input type="checkbox" id="payment-modal" className="modal-toggle" />
//       {user?.email ? (
//         <div className="modal">
//           <div className="modal-box relative">
//             <label
//               htmlFor="payment-modal"
//               className="btn btn-sm btn-circle absolute right-2 top-2"
//             >
//               ✕
//             </label>
//             <h3 className="text-lg font-bold">{product_name}</h3>
//             <p className="py-4">
//               Please pay, you'll receive the order within 7 days
//             </p>
//             <div className="form-control w-full">
//               <input
//                 type="text"
//                 placeholder="Write your name"
//                 className="input input-bordered w-full border-yellow-500 rounded-none mb-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Address"
//                 className="input input-bordered w-full border-yellow-500  rounded-none mb-2"
//               />
//             </div>
//             <CardElement
//               className="border border-black px-2 py-4"
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#424770",
//                     "::placeholder": {
//                       color: "#aab7c4",
//                     },
//                   },
//                   invalid: {
//                     color: "#9e2146",
//                   },
//                 },
//               }}
//             />
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="btn bg-black btn-wide my-4 text-white"
//                 disabled={!stripe || !clientSecret || processing}
//               >
//                 Pay
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="modal">
//           <div className="modal-box relative">
//             <label
//               htmlFor="payment-modal"
//               className="btn btn-sm btn-circle absolute right-2 top-2"
//             >
//               ✕
//             </label>
//             <div className="text-center">
//               <h3 className="text-lg font-semibold mb-4">
//                 Please log in to purchase this product
//               </h3>
//               <Link to="/login" className="btn bg-black text-white btn-wide">
//                 Log in
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </form>
//   );
// };

// export default PaymentModal;

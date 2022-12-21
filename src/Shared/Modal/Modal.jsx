import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Modal = ({ hideModal, setHideModal }) => {
  const { user } = useContext(AuthContext);
  const { product_name, resale_price, product_img } = hideModal;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const name = form.name.value;

    const booking = {
      name,
      email,
      phone,
      location,
      product_name,
      resale_price,
      product_img,
    };

    fetch("https://assignment-12-server-farhatmahi.vercel.app/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log(data);
          setHideModal(null);
          console.log(hideModal);
          toast.success("Booking confirmed!");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking_modal" className="modal-toggle" />
      <label htmlFor="booking_modal" className="modal cursor-pointer">
        <label className="modal-box relative bg-base-200" htmlFor="">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{product_name}</h2>
            <p>Price : {resale_price}</p>
          </div>
          {user ? (
            <form
              onSubmit={handleSubmit}
              className="card-body grid grid-cols-1"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  readOnly
                  defaultValue={user?.email}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone No.</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone no."
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary"></input>
              </div>
            </form>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h1 className="mt-10 mb-5">Please Log in</h1>
              <Link to="/login" className="btn btn-outline">
                Log in
              </Link>
            </div>
          )}
        </label>
      </label>
    </div>
  );
};

export default Modal;

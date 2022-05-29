import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "./addEdit.css";

const AddEdit = () => {
  const [state, setState] = useState({ name: "", email: "", contact: "" });
  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  // get a user
  useEffect(() => {
    const fatchApi = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/get/${id}`);
        if (data) {
          setState({ ...data[0] });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fatchApi();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value into each input field!");
    } else {
      if (!id) {
        try {
          const { data } = await axios.post("http://localhost:5000/api/post", {
            name,
            email,
            contact,
          });
          if (data) {
            setState({ name: "", email: "", contact: "" });
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data);
        }
        toast.success("Contact Added Successfully!");
        setTimeout(() => navigate("/"), 500);
      } else {
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/update/${id}`,
            {
              name,
              email,
              contact,
            }
          );
          if (data) {
            setState({ name: "", email: "", contact: "" });
            toast.success("Contact Updated Successfully!");
            setTimeout(() => navigate("/"), 500);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data);
        }
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name}
          onChange={handleInput}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email}
          onChange={handleInput}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={contact}
          onChange={handleInput}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <NavLink to="/">
          <input type="button" value="Go Back" />
        </NavLink>
      </form>
    </div>
  );
};

export default AddEdit;

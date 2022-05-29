import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "./view.css";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/get/${id}`);
        if (data) {
          setUser({ ...data[0] });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User contact Detail</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <NavLink to="/">
            <button className="btn btn-edit">Go Back</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default View;

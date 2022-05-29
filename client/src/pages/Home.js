import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/get");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete contact
  const delectContact = async (id) => {
    if (window.confirm("You wanted to delete that contact!")) {
      await axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact deleted successfilly!");
      setTimeout(() => loadData(), 500);
    }
  };

  // get all data
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <NavLink to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </NavLink>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <NavLink to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </NavLink>
                  <button
                    className="btn btn-delete"
                    onClick={() => delectContact(item.id)}
                  >
                    Delete
                  </button>
                  <NavLink to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => {
        res.json().then((result) => {
          setData(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
      })
      .catch((err) => {
        let collection = localStorage.getItem("users");
        setData(JSON.parse(collection));
        setMode("offline");
      });
  }, []);
  return (
    <div>
      <div>
        {mode === "offline" ? (
          <div class="alert alert-warning" role="alert">
            You are in offline mode or some issue with connection
          </div>
        ) : null}
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

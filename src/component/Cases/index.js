import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css"

const Case = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [Reqiest, setReqiest] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const state = useSelector((state) => {
    return state;
  });
  console.log(state.signIn);
  const getCases = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/show/allcase`, {
        laywer: params.id,
        client: state.signIn.id,
      });

      console.log("test", result);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendCase = async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    try {
      const result = await axios.post(
        `${BASE_URL}/addcase`,
        {
          title: e.target.title.value,
          Descraption: e.target.desc.value,
          laywer: params.id,
          client: state.signIn.id,
        },
        { headers: { Authorization: `Bearer ${state.signIn.token}` } }
      );

      console.log("test", result.data);
      getCases();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <div className="home">
      <h1>Hello</h1>
      {data.map((caase) => (
        <h1>{caase.title}</h1>
      ))}
      <button onClick={() => setReqiest(true)}> طلب</button>
      {Reqiest ? (
        <div className="request">
          <form onSubmit={sendCase}>
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="title.." name="title" />
            <label htmlFor="desc">Description</label>
            <input type="text" placeholder="Description.." name="desc" />
            <button type="submit">Send</button>
          </form>
          <button onClick={() => setReqiest(false)}>Cancel</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Case;

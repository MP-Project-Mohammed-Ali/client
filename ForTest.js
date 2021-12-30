const [postes, setpostes] = useState([]);
const param = useParams();

  const navigate = useNavigate();

console.log(param);
useEffect(() => {
  getPostes();
}, []);

const getPostes = () => {
  axios
    .get("http://localhost:5000/getPosts")
    .then((response) => {
      setpostes(response.data.filter((post) => post.createdBy == param.id));
      console.log(postes);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {});
};



const imageClick = (id) => {
  navigate(`/Recipe/${id}`);
};

return (
  <>
    {postes.map((item) => (
      <>
        <h1>{item.title}</h1>
        <h1>
          {/* <img src={item.image} /> */}
          <img src={item.image} onClick={() => imageClick(item._id)} />
        </h1>
      </>
    ))}
  </>
);
}
//////////////////////
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  const [postes, setpostes] = useState([]);
  const param = useParams();
  useEffect(() => {
    getPostes();
  }, []);

  const getPostes = () => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(response.data.filter((post) => post._id == param.id));
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  const recipe = postes[0]?.recipe.map(function (item, i) {
    return <li>{item}</li>;
  });

  const ingridents = postes[0]?.ingridents.map(function (item, i) {
    return <li>{item}</li>;
  });

  return (
    <>
      <h1>{postes[0]?.title}</h1>
      <img src={postes[0]?.image} />
      <h1>recipe</h1>
      {recipe}
      <h1>ingridents</h1>
      {ingridents}
    </>
  );
}

export default Recipe;

import axios from "axios";
import SearchBar from "./SeachBar";
import CardComp from "./CardComp";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react"; //useEffect determines when certain data will appear

const Home = () => {
  const initialState = [{flavor: ""}];

  const [kitKats, setKitKats] = useState(initialState);

  // const handleChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name] : event.target.value
  //   })
  // }

  useEffect(() => {
    axios.get("http://localhost:8080/getFlavors")
    .then(response => {
        console.log(response.data)
        setKitKats(response.data.message)
    })
      .catch(error => console.log(`Error: ${error}`))
  }, []);
  //dependency array - if it's blank, it will run when function first mounts (initial page render)
  //if it has stuff in it, it will rerun any time the page updates/changes

let displayKitKat = kitKats.map( element => {
  return(
    <CardComp data = {element}/> 
  )
})

  return (
    <div>
      <Container fluid>
        <Row className="row1">
          <Col id="intro">
            <span>
              <img id="kitcat" src="Assets/kitcat.png" alt="Kit Cat Logo" />
            </span>
            <span>
              <h1>Kit Kat Corner</h1>
              <h3>Find, save, and try the 300+ Kit Kat flavors of Japan!</h3>
            </span>
          </Col>
        </Row>

        <Row className="row2">
          <SearchBar />
        </Row>

        <Row className="row3">

          {displayKitKat}

        </Row>
      </Container>
    </div>
  );
};

export default Home;

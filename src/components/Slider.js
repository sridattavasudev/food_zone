import React from "react";
import Carousel from "react-bootstrap/Carousel";
import one from "../images/one.jpg";
import two from "../images/two.jpg";
import three from "../images/three.jpg";
import four from "../images/four.jpg";
import five from "../images/five.jpg";
import six from "../images/six.jpg";
import seven from "../images/seven.jpg";
function Slider() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={one}
            width="100vw"
            height="500px"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={two}
            width="100vw"
            height="500px"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={three}
            width="100vw"
            height="500px"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={four}
            width="100vw"
            height="500px"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={five}
            width="100vw"
            height="500px"
            alt="Fifth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={six}
            width="100vw"
            height="500px"
            alt="Sixth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={seven}
            width="100vw"
            height="500px"
            alt="Seventh slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Slider;

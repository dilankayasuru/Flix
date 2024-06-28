import React, {useEffect, useState} from "react";
import Card from "../../Components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Explore.css";
import axios from "axios";

export default function Explore() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const settings = {
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        axios.get('http://localhost:5000/featured')
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((error) => {
                if (error.response) setError(error.response.date.message)
                setError(error.message)
            })
    }, []);

    return (
        <section className="explore-container">
            <h1>Recently Added Products</h1>
            <Slider {...settings}>
                {
                    products.map((product, index) => (
                        <Card key={index} {...product}/>
                    ))
                }
            </Slider>
            {error && <p style={{color: "rgb(220, 0, 0)", textAlign: "center"}}>{error}</p>}
        </section>

    );
}
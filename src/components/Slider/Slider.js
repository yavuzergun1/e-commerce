import React from 'react';
import { Zoom } from 'react-slideshow-image';
import "./slider.scss";

const ZoomInExample = ({data}) => {
 
    return (
        <Zoom duration={3000} scale={1.4} indicators={true}>
            {data.photos.map((each, index) => (
                <div key={index} style={{ width: "100%" }}>
                    <img style={{ objectFit: "cover", height:"80vh", width: "100%" }} alt="Slide Image" src={each} />
                </div>
            ))}
        </Zoom>
    );
};
export default ZoomInExample;
import React from 'react'

const Temp = (props) => {
    console.log(props)
    return(
        <div className="container">
            <div className="cards">
            <h1>{props.city},{props.country}</h1>
                <h5 className="py-4">
                <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
    <h1 className="py-2">{props.temp_celsius}&deg;C</h1>

                {/* show max and min temperature*/}
                {minmaxTemp(props.temp_min, props.temp_max)}

    <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
};


function minmaxTemp(min,max) {
    return (
        <h3>
            <span className="px-4">{min}&deg;C</span>
            <span className="px-4">{max}&deg;C</span>
        </h3>
    );
}


export default Temp;
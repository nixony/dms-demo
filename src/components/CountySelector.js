import React from 'react';

const CountySelector = ({ counties, onCountyChange }) => {

    const renderedOptions = counties.map( (county, index) => {
        return <option value={ county.value } key={index}>{ county.label }</option>
    });

    if(counties.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="alert alert-info">No counties available.</div>
                </div>    
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                <form className="form">
                    <select onChange={ (e) => onCountyChange(e.target.value ) } className="form-select" aria-label="Default select example" defaultValue="null">
                        <option>Select the county ...</option>
                        {renderedOptions}
                    </select>
                </form>
            </div>
        </div>
    )
}

export default CountySelector;
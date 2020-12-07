import React from 'react';

const WebsiteList = ({ websites, onWebsiteSelected, onWebsiteVisit }) => {

    const renderedOptions = websites.map( (website, index) => {
        return <option  value={ website } key={index}>{ website }</option>
    });

    const optionSelected = (options) => {
        var selected = [...options]
                    .filter(option => option.selected)
                    .map(option => option.value);
                    
        onWebsiteSelected(selected)
    }

    if(websites.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="alert alert-info">No websites available.</div>
                </div>    
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <select onChange={ (e) => optionSelected(e.target.options)} multiple className="form-control">
                        {renderedOptions}
                        </select>
                    </div>
                    <button onClick={ onWebsiteVisit } className="btn btn-success btn-sm mt-3 float-right">Visit</button>
                    <label><small>Enable popups for this site if you want to open multiple links at the same time</small></label>
                </form>
            </div>
        </div>
    )
}

export default WebsiteList;
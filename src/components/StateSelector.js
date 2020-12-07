import React from 'react';

const StateSelector = ({ states, onStateChange, onAddState }) => {

    let inputRef = React.createRef();
    
    const renderedOptions = states.map( (state, index) => {
        return <option value={ state } key={index}>{ state }</option>
    });

    const onSubmitState = (e) => {
        e.preventDefault();
        onAddState(inputRef.current.value);
        inputRef.current.value = "";
    }

    return (
        
        <div className="card">
            <div className="card-body">
                <form className="form" onSubmit={(e) => onSubmitState(e)}>
                    <select onChange={ (e) => { onStateChange(e.target.value) } } className="form-select" aria-label="Default select example" defaultValue="null">
                        <option>Select the state ...</option>
                        { renderedOptions }
                    </select>
                    <br/>
                    <div className="input-group mb-3">
                            <input ref={inputRef} onSubmit={ (e) => { e.preventDefault(); }} type="text" className="form-control" placeholder="Add new state" aria-label="Add new state" aria-describedby="button-addon2" />
                            <button onClick={(e) => onSubmitState(e) } className="btn btn-outline-secondary" type="submit" id="button-addon2">Add</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default StateSelector;
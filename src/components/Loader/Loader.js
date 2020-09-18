import React from 'react';

const Loader = (props) => {
    return (
        <div className="container">
            <div className="row align-items-center" style={{minHeight: '800px'}}>
                <div className="col text-center">
                    <h1><strong>Quizzler</strong></h1>
                    <p className="mt-3">Loading...</p>
                </div>
            </div>
        </div>
    );
}

export default Loader;

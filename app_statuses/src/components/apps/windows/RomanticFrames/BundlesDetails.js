import React from 'react';

const renderBundlesList = (items) => (
    <ol style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        {items.map(item => (
            <li key={item.id} className="card-black" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '25%' }}>
                
                <div style={{ width: '100%' }}>
                    <h2 style={{marginBottom:'0px'}}>{item.name}</h2>
                    <div style={{fontSize:'18px', fontStyle:'italic', fontWeight:'bold'}}>
                        {item.coords && <i style={{color:'Green'}}>Enabled</i>}
                        {!item.coords && <i style={{color:'Red'}}>Disabled</i>}
                    </div>
                    &nbsp;
                    <button className='btn btn-primary'>Frames</button>
                    &nbsp;
                    <button className='btn btn-success'>Edit</button>
                </div>
            </li>
        ))}
    </ol>
);

const BundlesDetails = ({ bundles, frames }) => {
    return (
        <>
            <div>
                <button className='btn btn-info'>+ Add New Bundle</button>
            </div>
            <br/>
            <div className="row">
                <div className='col-12'>
                    <h1><i>Bundles</i></h1>
                    <br/>
                    {renderBundlesList(bundles)}

                </div>
                
            </div>
        </>
    );
};

export default BundlesDetails;

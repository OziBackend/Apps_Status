import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import FramesDetails from './FramesDetails';


const BundlesDetails = ({ bundles, frames }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showBundles, setShowBundles]= useState(false)
    const [framesData, setFramesData]= useState([])

    const loadFrames = (bundleId, frames)=>{
        setShowBundles(false)
        var specificFrames = frames.filter(frame=>frame.bundleId === bundleId)

        setFramesData(specificFrames)

        navigate('/homepage/windows/Romantic Love Frames/categories/bundles/frames')
    }
    const changeBundleStatus = (bundleId, state)=>{
        if(state){
            alert('Bundle Activated')
        }else{
            alert('Bundle Deactivated')
        }
        navigate(-2);
        //code to enable/disable a bundle
    }

    const renderBundlesList = (bundles, frames) => (
        <ol style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
            {bundles.map(bundle => (
                <li key={bundle.id} className="card-black" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '20%' }}>
                    
                    <div style={{ width: '100%' }}>
                        <h2 style={{marginBottom:'0px'}}>{bundle.name}</h2>
                        <div style={{fontSize:'18px', fontStyle:'italic', fontWeight:'bold'}}>
                            {bundle.coords && <i style={{color:'Green'}}>Enabled</i>}
                            {!bundle.coords && <i style={{color:'Red'}}>Disabled</i>}
                        </div>
                        &nbsp;
                        <button className='btn btn-primary' onClick={()=>{loadFrames(bundle._id, frames)}}>Frames</button>
                        &nbsp;
                        {!bundle.coords && 
                            <button 
                                className='btn btn-success'
                                onClick={()=>{changeBundleStatus(bundle._id, true)}}
                            >Enable</button>
                        }
                        {bundle.coords && 
                            <button 
                                className='btn btn-danger'
                                onClick={()=>{changeBundleStatus(bundle._id, false)}}
                            >Disable</button>
                        }
                    </div>
                </li>
            ))}
        </ol>
    );
    useEffect(()=>{
        if(location.pathname === "/homepage/windows/Romantic%20Love%20Frames/categories/bundles")
            setShowBundles(true)
        else
            setShowBundles(false)
        console.log('=======>',showBundles);
    }, [location])
    return (
        <>
            <Routes>
                <Route 
                    path="/frames/*"
                    element={
                        <FramesDetails
                            frames={framesData}
                        />
                    }
                />
            </Routes>
            {showBundles && (
            <>
                <div>
                    <button className='btn btn-info'>+ Add New Bundle</button>
                </div>
                <br/>
                <div className="row">
                    <div className='col-12'>
                        <h1><i>Bundles</i></h1>
                        <br/>
                        {/* {renderBundlesList(bundles)} */}
                        {Array.isArray(bundles) && bundles.length > 0 ? renderBundlesList(bundles, frames) : <p>No bundles available.</p>}

                    </div>
                    
                </div>
            </>)}
        </>
    );
};

export default BundlesDetails;

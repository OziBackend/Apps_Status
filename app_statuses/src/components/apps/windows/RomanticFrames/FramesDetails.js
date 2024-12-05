import React, {useState, useEffect} from 'react';
import { useLocation,useNavigate, Routes, Route } from 'react-router-dom';

import EditFrame from './EditFrame';

const FramesDetails = ({ frames }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [frameInfo, setFrameInfo]=useState({})
    const [showFrames, setShowFrames]= useState(true)

    const editFrame=(frameData)=>{
        setFrameInfo(frameData)
        setShowFrames(false)
        navigate(location.pathname + '/edit')
    }

    const renderFramesList = (frames) => (
        <ol style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
            {frames.map(frame => (
                <li key={frame.id} className="card-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px', width: '16%' }}>
                    <img 
                        src={frame.thumbnail} 
                        alt={frame.name} 
                        style={{ 
                            marginBottom: '10px', 
                            maxWidth: '100%', 
                            maxHeight: '150px', 
                            objectFit: 'cover'
                        }} 
                    />
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <h5 style={{marginBottom:'0px'}}>{frame.name}</h5>
                        &nbsp;
                        <button 
                            className='btn btn-success'
                            onClick={()=>{editFrame(frame)}}
                        >Edit</button>
                    </div>
                </li>
            ))}
        </ol>
    );
    useEffect(()=>{
        const checkLoc = '/homepage/windows/Romantic%20Love%20Frames/categories'
        if(location.pathname === `${checkLoc}/frames` || location.pathname === `${checkLoc}/bundles/frames`)
            setShowFrames(true)
        else
            setShowFrames(false)
        console.log('=======>',showFrames);
    }, [location])
    
    return (
        <>
            <Routes>
                <Route 
                    path="/edit/*"
                    element={
                        <EditFrame
                            frameInfo={frameInfo}
                        />
                    }
                />
            </Routes>
            {showFrames && (
                <>
                    <div>
                        <button className='btn btn-info'>+ Add New Frame/s</button>
                    </div>
                    <br/>
                    <div className="row">
                        <div className='col-12'>
                            <h1><i>Frames</i></h1>
                            <br/>
                            {/* {renderFramesList(frames)} */}
                            {Array.isArray(frames) && frames.length > 0 ? renderFramesList(frames) : <p>No frames available.</p>}
                        </div>
                        
                    </div>
                </>
            )}
        </>
    );
};

export default FramesDetails;

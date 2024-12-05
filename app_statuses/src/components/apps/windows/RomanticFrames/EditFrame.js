import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Editing.css';



const EditFrame = ({ frameInfo }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: frameInfo.image,
        thumbnail: frameInfo.thumbnail,

        name:frameInfo.name,
        coordinates:frameInfo.coordinates
        // Add more fields as needed
    });


    const handleThumbnailChange = (e) => {
        setFormData({ ...formData, thumbnail: URL.createObjectURL(e.target.files[0]) });
    };
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigateBack=()=>{
        const checkLoc = '/homepage/windows/Romantic%20Love%20Frames/categories'
        if(location.pathname === `${checkLoc}/frames/edit`)
            navigate(-3)
        else if(location.pathname === `${checkLoc}/bundles/frames/edit`)
            navigate(-4)
    }
    const handleSave = () => {
        // Handle save logic here
        
        console.log('Saved data:', formData);

        navigateBack()
    };
    const handleCancel = () => {
        setFormData({ image: null,thumbnail:null, name: '', sequence: '' });
        
        navigateBack()
    };

    const handleCoordinatesChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            coordinates: [{
                ...prevFormData.coordinates[0],
                [name]: value
            }]
        }));
    };

    useEffect(()=>{
        // if(location.pathname === "/homepage/windows/Romantic%20Love%20Frames/categories")
        //     setShowCategories(true)
        // else
        //     setShowCategories(false)
        // console.log('=======>',showCategories);
    }, [location])

    return (
        <>
            <div className="form-container">
                <h2><u>Edit Image and Details</u></h2>
                <div>
                    {formData.image && 
                        <img 
                            src={formData.image}    
                            alt="Preview" 
                            style={{ 
                                marginBottom: '0px', 
                                maxWidth: '100%', 
                                maxHeight: '350px', 
                                minHeight: '300px',
                                objectFit: 'cover'
                            }}
                        />
                    }
                    <br/>
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        style={{
                            width: '300px',
                            padding: '5px',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                            cursor: 'pointer',
                            fontSize: '20px'
                        }}
                    />
                </div>
                <br/>
                
                <div className='row'>
                    <div className='col-5'>
                        {formData.thumbnail && 
                            <img 
                                src={formData.thumbnail}    
                                alt="Preview" 
                                style={{ 
                                    marginBottom: '0px', 
                                    maxWidth: '75%', 
                                    maxHeight: '300px', 
                                    objectFit: 'cover'
                                }}
                            />
                        }
                        <br/>
                        <input 
                            type="file" 
                            onChange={handleThumbnailChange} 
                            style={{
                                width: '150px',
                                padding: '5px',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                cursor: 'pointer',
                                fontSize: '15px'
                            }}
                        />
                    </div>
                    <div className='col-7' style={{textAlign:'justify', fontSize:'20px'}}>
                        Name: 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Frame Name" className="input-field" />
                        <br/>
                        <br/>
                        {formData.coordinates && (
                            <>
                                <h4><u>--Coordinates--</u></h4>
                                Height: 
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="height" value={formData.coordinates[0].height} onChange={handleCoordinatesChange} placeholder="Height" className="input-field" />
                                <br/>
                                Width: 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="width" value={formData.coordinates[0].width} onChange={handleCoordinatesChange} placeholder="Width" className="input-field" />
                                <br/>
                                X : 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="x" value={formData.coordinates[0].x} onChange={handleCoordinatesChange} placeholder="X" className="input-field" />
                                <br/>
                                Y : 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="y" value={formData.coordinates[0].y} onChange={handleCoordinatesChange} placeholder="Y" className="input-field" />
                            </>
                        )}
                        {/* Sequence: 
                        &nbsp;&nbsp;
                        <input type="text" name="sequence" value={formData.sequence} onChange={handleInputChange} placeholder="Field 2" className="input-field" /> */}
                        <br/>
                    </div>
                </div>
                
                
                <br/>
                {/* Add more input fields as needed */}
                <button className='btn btn-success' onClick={handleSave}>Save</button>
                &nbsp;
                <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
            </div>
        </>
    );
};

export default EditFrame;

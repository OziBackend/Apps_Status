import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Editing.css';



const NewFrame = ({ categoryInfo }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: null,
        thumbnail: null,
        name:'',
        sequence:'20',
        enabled:false
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
    const handleSave = () => {
        // Handle save logic here
        console.log('Saved data:', formData);
        alert('Data Added')
        navigate(-2)
    };
    const handleCancel = () => {
        setFormData({ image: null,thumbnail:null, name: '', sequence: '' });
        navigate(-2)
    };

    useEffect(()=>{
        // console.log(categoryInfo);
        // if(location.pathname === "/homepage/windows/Romantic%20Love%20Frames/categories")
        //     setShowCategories(true)
        // else
        //     setShowCategories(false)
        // console.log('=======>',showCategories);
    }, [location])

    return (
        <>
            <div className="form-container">
                <h2><u>Adding New Frame/s</u></h2>
                <div>
                    <input 
                        type="file" 
                        id="imageInput" // Add this line to ensure the input element has the correct ID
                        style={{ display: 'none' }} // Hide the input element
                        onChange={(e) => {
                            handleImageChange(e);
                        }} 
                    />
                    <div 
                        className="image-upload-box" 
                        onDragOver={(e) => e.preventDefault()} 
                        onDrop={(e) => {
                            e.preventDefault();
                            handleImageChange({ target: { files: e.dataTransfer.files } });
                        }}
                        style={{
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            margin: '30px'
                        }}
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        {formData.image ? (
                            <img 
                                src={formData.image}    
                                alt="Preview" 
                                style={{ 
                                    maxWidth: '100%', 
                                    maxHeight: '350px', 
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: '30px', color: '#aaa' }}>+ Drag or Upload Photo</span>
                        )}
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col-5'>
                        {/* Thumbnail Preview and Upload */}
                        <div 
                            className="thumbnail-upload-box" 
                            onDragOver={(e) => e.preventDefault()} 
                            onDrop={(e) => {
                                e.preventDefault();
                                handleThumbnailChange({ target: { files: e.dataTransfer.files } });
                            }}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '8px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                margin: '25px'
                            }}
                            onClick={() => document.getElementById('thumbnailInput').click()}
                        >
                            {formData.thumbnail ? (
                                <img 
                                    src={formData.thumbnail}    
                                    alt="Thumbnail Preview" 
                                    style={{ 
                                        marginBottom: '0px', 
                                        maxWidth: '75%', 
                                        maxHeight: '300px', 
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: '15px', color: '#aaa' }}>+ Drag or Upload Photo</span>
                            )}
                        </div>
                        <br/>
                        <input 
                            type="file" 
                            id="thumbnailInput" // Add this line to ensure the input element has the correct ID
                            onChange={(e) => {
                                handleThumbnailChange(e);
                            }} 
                            style={{
                                display: 'none' // Hide the input element
                            }}
                        />
                    </div>
                    <div className='col-7' style={{textAlign:'justify', fontSize:'25px'}}>
                        Name: 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="input-field" />
                        <br/>
                        Sequence: 
                        &nbsp;&nbsp;
                        <input type="text" name="sequence" value={formData.sequence} onChange={handleInputChange} placeholder="Sequence Number" className="input-field" />
                        <br/>
                        <div style={{fontSize:'20px'}}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="enabled" 
                                    value={true} 
                                    checked={formData.enabled === true} 
                                    onChange={() => handleInputChange({ target: { name: 'enabled', value: true } })} 
                                />
                                Enable
                            </label>
                            &nbsp;&nbsp;
                            <label>
                                <input 
                                    type="radio" 
                                    name="enabled" 
                                    value={false} 
                                    checked={formData.enabled === false} 
                                    onChange={() => handleInputChange({ target: { name: 'enabled', value: false } })} 
                                />
                                Disable
                            </label>
                        </div>
                    </div>
                </div>
                
                
                {/* Add more input fields as needed */}
                <button className='btn btn-success' onClick={handleSave}>Save</button>
                &nbsp;
                <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
            </div>
        </>
    );
};

export default NewFrame;

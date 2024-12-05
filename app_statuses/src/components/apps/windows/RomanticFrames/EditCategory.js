import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Editing.css';



const CategoriesDetails = ({ categoryInfo }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: categoryInfo.image,
        thumbnail: categoryInfo.thumbnail,
        name:categoryInfo.name,
        sequence:categoryInfo.sequence,
        enabled:categoryInfo.coords
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
        alert('Data Updated')
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
                    <div className='col-7' style={{textAlign:'justify', fontSize:'25px'}}>
                        Name: 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Field 1" className="input-field" />
                        <br/>
                        Sequence: 
                        &nbsp;&nbsp;
                        <input type="text" name="sequence" value={formData.sequence} onChange={handleInputChange} placeholder="Field 2" className="input-field" />
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
                
                
                <br/>
                {/* Add more input fields as needed */}
                <button className='btn btn-success' onClick={handleSave}>Save</button>
                &nbsp;
                <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
            </div>
        </>
    );
};

export default CategoriesDetails;

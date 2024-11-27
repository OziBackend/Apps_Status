import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import BundlesDetails from './BundlesDetails';


const CategoriesDetails = ({ categories, bundles, frames }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showCategories, setShowCategories]= useState(false)
    const [bundlesData, setBundlesData]= useState([])

    const loadBundles = (categoryId, bundles, frames)=>{
        setShowCategories(false)
        var specificBundles = bundles.filter(bundle=>bundle.categoryId === categoryId)
    
        console.log(specificBundles);
        setBundlesData(specificBundles)
        console.log(showCategories);
    
        navigate('/homepage/windows/Romantic Love Frames/categories/bundles')
    }
    const renderCategoryList = (items, bundles, frames) => (
        <ol>
            {items.map(item => (
                <li key={item.id} className="card-black" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <img 
                        src={item.thumbnail} 
                        alt={item.name} 
                        style={{ 
                            marginRight: '10px', 
                            width: '300px', 
                            height: '150px'
                        }} 
                    />
                    <div style={{ width: '300px' }}>
                        <h3>{item.name}</h3>
                        <h6>Sequence: {item.sequence}</h6>
                        <button className='btn btn-primary' onClick={()=>{loadBundles(item._id, bundles, frames)}}>Bundles</button>
                        &nbsp;
                        <button className='btn btn-primary'>Frames</button>
                        &nbsp;
                        <button className='btn btn-success'>Edit</button>
                    </div>
                </li>
            ))}
        </ol>
    );

    useEffect(()=>{
        if(location.pathname === "/homepage/windows/Romantic%20Love%20Frames/categories")
            setShowCategories(true)
        else
            setShowCategories(false)
        console.log('=======>',showCategories);
    }, [location])

    return (
        <>
            <Routes>
                <Route 
                    path="/bundles/*"
                    element={
                        <BundlesDetails
                            bundles={bundlesData}
                            frames={frames}
                        />
                    }
                />
            </Routes>
            
            {showCategories && (
                <>
                    <div>
                        <button className='btn btn-info'>+ Add New Category</button>
                    </div>
                    <br/>
                    <div className="row">
                        <div className='col-6' style={{borderRight:'2px white solid'}}>
                            <h1><i>Enabled Categories</i></h1>
                            <br/>
                            {renderCategoryList(categories.true,bundles, frames)}
                        </div>

                        <div className='col-6'>
                            <h1><i>Disabled Categories</i></h1>
                            <br/>
                            {renderCategoryList(categories.false, bundles, frames)}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CategoriesDetails;

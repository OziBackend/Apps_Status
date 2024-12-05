import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import BundlesDetails from './BundlesDetails';
import FramesDetails from './FramesDetails';

import EditCategory from './EditCategory'


const CategoriesDetails = ({ categories, bundles, frames }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showCategories, setShowCategories]= useState(false)
    
    const [bundlesData, setBundlesData]= useState([])
    const [framesData, setFramesData]= useState([])

    const [categoryInfo, setCategoryInfo] = useState({})

    const loadBundles = (categoryId, bundles, frames)=>{
        setShowCategories(false)
        var specificBundles = bundles.filter(bundle=>bundle.categoryId === categoryId)
    
        console.log(specificBundles);
        setBundlesData(specificBundles)
        console.log(showCategories);
    
        navigate('/homepage/windows/Romantic Love Frames/categories/bundles')
    }
    const loadFrames = (categoryId, frames)=>{
        setShowCategories(false)
        var specificFrames = frames.filter(frame=>frame.categoryId === categoryId)

        setFramesData(specificFrames)

        navigate('/homepage/windows/Romantic Love Frames/categories/frames')
    }
    const editCategory=(categoryInfo)=>{
        console.log(categoryInfo);
        setCategoryInfo(categoryInfo)
        setShowCategories(false)

        navigate('/homepage/windows/Romantic Love Frames/categories/edit')
    }

    const renderCategoryList = (categories, bundles, frames) => (
        <ol>
            {categories.map(category => (
                <li key={category.id} className="card-black" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <img 
                        src={category.thumbnail} 
                        alt={category.name} 
                        style={{ 
                            marginRight: '10px', 
                            width: '300px', 
                            height: '150px'
                        }} 
                    />
                    <div style={{ width: '300px' }}>
                        <h3>{category.name}</h3>
                        <h6>Sequence: {category.sequence}</h6>
                        <button className='btn btn-primary' onClick={()=>{loadBundles(category._id, bundles, frames)}}>Bundles</button>
                        &nbsp;
                        <button className='btn btn-primary' onClick={()=>{loadFrames(category._id, frames)}}>Frames</button>
                        &nbsp;
                        <button className='btn btn-success' onClick={()=>{editCategory(category)}}>Edit</button>
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
                <Route 
                    path="/frames/*"
                    element={
                        <FramesDetails
                            frames={framesData}
                        />
                    }
                />
                <Route 
                    path="/edit/*"
                    element={
                        <EditCategory
                            categoryInfo={categoryInfo}
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
                        <div className='col-6' style={{borderRight:'2px white solid', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <h1><i>Enabled Categories</i></h1>
                            <br/>
                            {renderCategoryList(categories.true,bundles, frames)}
                        </div>

                        <div className='col-6' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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

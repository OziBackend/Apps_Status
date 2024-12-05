import React, { useEffect, useState } from 'react';
import '../../../../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './RomanticFrames.css'
import { Pie } from 'react-chartjs-2'; // Import Pie chart component
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components
import { useLocation,useNavigate, Routes, Route } from 'react-router-dom';

import CategoriesDetails from './CategoriesDetails';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);


const RomanticFrames = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [catcoord, setCatCoord] = useState({ true: [], false: [] });

    const [bundles, setBundles] = useState([])
    const [bundles2, setBundles2] = useState([])
    const [bundles3, setBundles3] = useState([])
    const [bundlecoord, setBundleCoord] = useState({ true: [], false: [] });
    const [bundlecoord2, setBundleCoord2] = useState({ true: [], false: [] });

    const [frames, setFrames] = useState([])
    const [frames2, setFrames2] = useState([])
    const [availFrames, setAvailFrames] = useState([])

    const [displayData, setDisplayData] = useState(true)

    const fetchCategories = async () => {
        const response = await fetch('http://161.97.164.28:8080/api/categories/all'); // Replace with your API endpoint
        const data = await response.json();
        
        const trueCats = data.filter(category => category.coords === true);
        const falseCats = data.filter(category => category.coords === false);
        
        return { true: trueCats, false: falseCats, data: data };
    };
    const fetchBundles = async (api)=>{
        const response = await fetch(api);
        const data = await response.json();

        const trueBundles = data.filter(bundle => bundle.coords === true);
        const falseBundles = data.filter(bundle => bundle.coords === false);

        return {true: trueBundles, false: falseBundles, data: data}
    };
    const fetchFrames = async (api)=>{
        const response = await fetch(api);
        const data = await response.json();
        const availableData = data.filter(frame => frame.coordinates.length>0)

        return {allframes:data, availableframes:availableData}
    }
    
    useEffect(() => {
        const fetchData = async () => { // Create an async function
            const cats = await fetchCategories(); // Await the promise
            setCategories(cats.data)
            setCatCoord({true:cats.true, false:cats.false});

            const bundlescheck = await fetchBundles('http://161.97.164.28:8080/api/bundles/bundledetails');
            setBundles(bundlescheck.data)
            setBundles2(bundlescheck.data)
            setBundleCoord({true:bundlescheck.true, false:bundlescheck.false})
            setBundleCoord2({true:bundlescheck.true, false:bundlescheck.false})

            const allframes = await fetchFrames('http://161.97.164.28:8080/api/frames/getalldata');
            setFrames(allframes.allframes)
            setFrames2(allframes.availableframes)
            setAvailFrames(allframes.availableframes)
        };
        fetchData(); // Call the async function

        console.log(location.pathname);
        if(location.pathname === "/homepage/windows/Romantic%20Love%20Frames")
            setDisplayData(true)
        else
            setDisplayData(false)
    }, [location]); // Empty dependency array to run once on mount


    const handleCategoryChange = async (event) => {
        const selectedCategoryId = event.target.value;
        console.log(selectedCategoryId);
        var daata, trueData, falseData;
        if (selectedCategoryId) {
            daata = bundles.filter(bundle => bundle.categoryId === selectedCategoryId);
            console.log(daata);
            trueData = daata.filter(bundle => bundle.coords === true);
            falseData = daata.filter(bundle => bundle.coords === false);
            setBundles2(daata)
            setBundleCoord2({true:trueData, false:falseData})
        }else{
            setBundles2(bundles)
            setBundleCoord2({true:bundlecoord.true, false:bundlecoord.false})

        }
    };
    const handleCategoryChange2 = async (event) => {
        const selectedCategoryId = event.target.value;
        console.log(selectedCategoryId);
        var daata, trueData, falseData;
        var framesData;
        if (selectedCategoryId) {
            daata = bundles.filter(bundle => bundle.categoryId === selectedCategoryId);
            console.log(daata);
            trueData = daata.filter(bundle => bundle.coords === true);
            falseData = daata.filter(bundle => bundle.coords === false);
            setBundles3(daata)

            framesData = availFrames.filter(frame => frame.categoryId === selectedCategoryId)
            setFrames2(framesData)
        }else{
            setBundles3([])
            setFrames2(availFrames)
        }
    };
    const handleBundleChange = async (event) => {
        const selectedBundleId = event.target.value;
        console.log(selectedBundleId);
        var framesData;
        if (selectedBundleId) {
            framesData = availFrames.filter(frame => frame.bundleId === selectedBundleId)
            setFrames2(framesData)
        }else{
            setFrames2(availFrames)
        }
    };

    return (
        <>
            <Routes>
                <Route 
                    path="/categories/*"
                    element={
                        <CategoriesDetails
                            categories={catcoord}
                            bundles={bundles}
                            frames={frames}
                        />
                    }
                />
            </Routes>
            {displayData && (

                <div>
                    <h1>Romantic Love Frames</h1>
                    <div className='row'>
                        
                        <div className='col-1' style={{padding:'0px'}}></div>
                        <div className='topLeftContainer col-5'>
                            <p>CATEGORIES</p>
                            <div className='row' style={{height:'100%'}}>
                                <div className='col-1' style={{'fontSize':'16px'}}>
                                
                                        <b>Categories</b>
                                        <p 
                                            className="hover-underline"
                                            onClick={()=>{
                                                navigate('/homepage/windows/Romantic Love Frames/categories');
                                                setDisplayData(false)
                                            }}
                                        >
                                            <u>{categories.length}</u>
                                        </p>
                                        <hr/>
                                        Enabled 
                                        <p>{catcoord.true.length}</p>
                                        <hr/>
                                        Disabled 
                                        <p>{catcoord.false.length}</p>
                                    
                                </div>
                                <div className='col-1'></div>
                                <div className='categoriesPie col-10'>
                                    <Pie
                                        data={{
                                            labels: ['Enabled', 'Disabled'],
                                            datasets: [{
                                                data: [catcoord.true.length, catcoord.false.length],
                                                backgroundColor: ['#36A2EB', '#FFCE56'],
                                            }],
                                        }}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Pie Chart */}
                        </div>
                        
                        <div className='topRightContainer col-5'>
                            <p>BUNDLES</p>
                            <div className='row'>
                                <div className='col-1' style={{'fontSize':'16px'}}>
                                
                                        <b>Bundles</b> 
                                        <p>{bundles2.length}</p>
                                        <hr/>
                                        Enabled 
                                        <p>{bundlecoord2.true.length}</p>
                                        <hr/>
                                        Disabled 
                                        <p>{bundlecoord2.false.length}</p>
                                    
                                </div>
                                <div className='col-1'></div>
                                <div className='categoriesPie col-10'>
                                    {/* Dropdown for categories */}
                                    <select 
                                        onChange={handleCategoryChange} 
                                        style={{ 
                                            maxWidth: '100%', 
                                            overflow: 'hidden', 
                                            height: '35px', // Set a specific height
                                            padding: '5px', // Add padding for better spacing
                                            fontSize: '14px' // Adjust font size
                                        }}
                                    >
                                        <option value="">All</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.name}</option> // Assuming category has 'id' and 'name'
                                        ))}
                                    </select>
                                    <Pie
                                        data={{
                                            labels: ['Enabled', 'Disabled'],
                                            datasets: [{
                                                data: [bundlecoord2.true.length, bundlecoord2.false.length],
                                                backgroundColor: ['#36A2EB', '#FFCE56'],
                                            }],
                                        }}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='row' style={{margin: 'auto 0px'}}>
                        {/* New bottomLeftContainer for dropdowns */}
                        <div className='bottomContainer col-12'>
                            <p>FRAMES</p>
                            <div className='row'>
                                <div className='col-6'>
                                    <b>Categories</b>
                                    <select 
                                        onChange={handleCategoryChange2} 
                                        style={{ 
                                            maxWidth: '100%', 
                                            overflow: 'hidden', 
                                            height: '35px', 
                                            padding: '5px', 
                                            fontSize: '14px' 
                                        }}
                                    >
                                        <option value="">Select a category</option>
                                        {catcoord.true.map(category => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {bundles3.length > 0 && (
                                    <div className='col-6'>
                                        <b>Bundles</b>
                                        <select 
                                            onChange={handleBundleChange}
                                            style={{ 
                                                maxWidth: '100%', 
                                                overflow: 'hidden', 
                                                height: '35px', 
                                                padding: '5px', 
                                                fontSize: '14px' 
                                            }}
                                        >
                                            <option value="">Select a bundle</option>
                                            {bundles3.map(bundle => (
                                                <option key={bundle._id} value={bundle._id}>{bundle.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', width:'100%' }}>
                                {frames2.slice(0, 10).map(frame => (
                                    <img 
                                        key={frame._id} 
                                        src={frame.thumbnail} // Assuming each frame has an 'imageUrl' property
                                        alt={frame.name} // Assuming each frame has a 'name' property
                                        style={{ width: '200px', height: '200px', margin: '5px', display: 'inline-block' }} // Adjust size as needed
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button 
                        className='btn btn-secondary'
                        style={{fontSize:'30px', marginBottom:'20px'}}
                        onClick={()=>{
                            navigate('/homepage/windows/Romantic Love Frames/categories');
                            setDisplayData(false)
                        }}
                    >
                        All Categories
                    </button>
                </div>

            )}
        </>
    );
};

export default RomanticFrames;

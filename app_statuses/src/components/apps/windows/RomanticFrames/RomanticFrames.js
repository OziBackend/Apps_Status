import React, { useEffect, useState } from 'react';
import '../../../../bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './RomanticFrames.css'
import { Pie } from 'react-chartjs-2'; // Import Pie chart component
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components

// Register the components
Chart.register(ArcElement, Tooltip, Legend);


const RomanticFrames = () => {
    const [categories, setCategories] = useState([]);
    const [bundles, setBundles] = useState([])
    const [categories2, setCategories2] = useState([]);
    const [bundles2, setBundles2] = useState([])
    const [frames, setFrames] = useState([])
    const [catcoord, setCatCoord] = useState({ true: [], false: [] });
    const [bundlecoord, setBundleCoord] = useState({ true: [], false: [] });

    const fetchCategories = async () => {
        const response = await fetch('http://161.97.164.28:8080/api/categories/all'); // Replace with your API endpoint
        const data = await response.json();
        setCategories(data); // Assuming data is an array of categories
        
        const trueCats = data.filter(category => category.coords === true);
        setCategories2(trueCats);
        const falseCats = data.filter(category => category.coords === false);
        return { true: trueCats, false: falseCats };
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
        setFrames(availableData);
    }
    
    useEffect(() => {
        const fetchData = async () => { // Create an async function
            const cats = await fetchCategories(); // Await the promise
            setCatCoord(cats);
            const bundlescheck = await fetchBundles('http://161.97.164.28:8080/api/bundles/bundledetails');
            setBundles(bundlescheck.data)
            setBundleCoord({true:bundlescheck.true, false:bundlescheck.false})
            await fetchFrames('http://161.97.164.28:8080/api/frames/getalldata');
        };
        fetchData(); // Call the async function
    }, []); // Empty dependency array to run once on mount

    const handleCategoryChange = async (event) => {
        const selectedCategoryId = event.target.value;
        console.log(selectedCategoryId);
        var bundlescheck;
        if (selectedCategoryId) {
            bundlescheck=await fetchBundles(`http://161.97.164.28:8080/api/bundles/getCatBundles?categoryId=${selectedCategoryId}`)
        }else{
            bundlescheck=await fetchBundles('http://161.97.164.28:8080/api/bundles/bundledetails')
        }
            setBundles(bundlescheck.data)
            setBundleCoord({true:bundlescheck.true, false:bundlescheck.false})
    };
    const handleCategoryChange2 = async (event) => {
        const selectedCategoryId = event.target.value;
        console.log(selectedCategoryId);
        if (selectedCategoryId) {
            const bundlescheck=await fetchBundles(`http://161.97.164.28:8080/api/bundles/getCatBundles?categoryId=${selectedCategoryId}`)
            setBundles2(bundlescheck.data)
            fetchFrames(`http://161.97.164.28:8080/api/frames/getalldata?categoryId=${selectedCategoryId}`)
        }else{
            setBundles2([])
            fetchFrames('http://161.97.164.28:8080/api/frames/getalldata');
        }
    };
    const handleBundleChange = async (event) => {
        const selectedBundleId = event.target.value;
        console.log(selectedBundleId);
        if (selectedBundleId) {
            fetchFrames(`http://161.97.164.28:8080/api/frames/getalldata?bundleId=${selectedBundleId}`)
        }else{
            fetchFrames('http://161.97.164.28:8080/api/frames/getalldata');
        }
    };

    return (
        <div>
            <h1>Romantic Love Frames</h1>
            <div className='row'>
                
                <div className='col-1'></div>
                <div className='topLeftContainer col-5'>
                    <p>CATEGORIES</p>
                    <div className='row'>
                        <div className='col-1' style={{'fontSize':'16px'}}>
                        
                                <b>Categories</b> 
                                <p>{categories.length}</p>
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
                &nbsp;
                
                <div className='topRightContainer col-5'>
                    <p>BUNDLES</p>
                    <div className='row'>
                        <div className='col-1' style={{'fontSize':'16px'}}>
                        
                                <b>Bundles</b> 
                                <p>{bundles.length}</p>
                                <hr/>
                                Enabled 
                                <p>{bundlecoord.true.length}</p>
                                <hr/>
                                Disabled 
                                <p>{bundlecoord.false.length}</p>
                            
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
                                        data: [bundlecoord.true.length, bundlecoord.false.length],
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
                <div className='bottomLeftContainer col-12'>
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
                                {categories2.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        {bundles2.length > 0 && (
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
                                    {bundles2.map(bundle => (
                                        <option key={bundle._id} value={bundle._id}>{bundle.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', width:'1000px' }}>
                        {frames.slice(0, 10).map(frame => (
                            <img 
                                key={frame._id} 
                                src={frame.thumbnail} // Assuming each frame has an 'imageUrl' property
                                alt={frame.name} // Assuming each frame has a 'name' property
                                style={{ width: '200px', height: '200px', margin: '5px', display: 'inline-block' }} // Adjust size as needed
                            />
                        ))}
                    </div>
                </div>
                <div className='bottomLeftContainer col-12'>
                    <p>ADD DATA</p>
                </div>

            </div>
        </div>
    );
};

export default RomanticFrames;

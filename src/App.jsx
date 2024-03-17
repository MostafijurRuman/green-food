import React, { useEffect, useState } from 'react';
import Dish from './components/dish';
import './App.css';
import { data } from 'autoprefixer';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [dishes, setDish] = useState([]);
  useEffect(() => {
    fetch('https://api.npoint.io/56e6840e6938af1ebb22') 
      .then(res => res.json())
      .then(data => setDish(data));
  }, []);
  const added = () => toast.success('Successfully Added!');
  const alreadyAdded = () => toast.error("Already added , Try another")
  const [cart, setCart] = useState([]);
  const [preparingCart, setPreparingCart] = useState([]);
  const [totalCartPreparingTime, setTotalCartPreparingTime] = useState(0);
  const [totalCartCalories, setTotalCartCalories] = useState(0);
  const [totalPreparingTime, setTotalPreparingTime] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  
  const clickHandle = (dishData) => {
    // Check if the dish is already in the cart
    const isAlreadyInCart = cart.some(item => item.recipe_id === dishData.recipe_id);

    if (!isAlreadyInCart) {
      // If not in cart, add the dish to the cart and show "added" toast
      setCart(prevCart => [...prevCart, dishData]);
      added(); // Show "added" toast
    } else {
      // If already in cart, show "alreadyAdded" toast
      alreadyAdded();
    }
  }
  const handleRemove = (idf, data) => {
    const newCart = cart.filter(bal => bal.recipe_id !== idf);
    setCart(newCart);
    setPreparingCart(prevCart => [...prevCart, data]);

    // Update total preparing time and total calories only when moving from cart to preparingCart
    const preparingTime = parseInt(data.preparing_time);
    const calories = parseInt(data.calories);
    if (!isNaN(preparingTime)) {
      setTotalCartPreparingTime(prevTotal => prevTotal - preparingTime);
      setTotalPreparingTime(prevTotal => prevTotal + preparingTime);
    }
    if (!isNaN(calories)) {
      setTotalCartCalories(prevTotal => prevTotal - calories);
      setTotalCalories(prevTotal => prevTotal + calories);
    }
  }

  return (
    <>
     <header>
        <nav className='container mx-auto px-8 lg:px-32 '>
                <div className="navbar bg-base-100 mt-10 mb-10">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Home</a></li>
                <li><a>Recipes</a></li>
                <li><a>About</a></li>
                <li><a>Search</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-3xl font-bold lexend ">Green Food</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a className='lexend font-normal text-base'>Home</a></li>
              <li><a className='lexend font-normal text-base'>Recipes</a></li>
              <li><a className='lexend font-normal text-base'>About</a></li>
              <li><a className='lexend font-normal text-base'>Search</a></li>
            </ul>
          </div>
          <div className="navbar-end flex gap-3">
            <input className='lg:px-6 lg:inline hidden py-3 rounded-full bg-[#f3f3f4]' placeholder='Search' type="text" />
            <img className='w-12 rounded-full bg-[#0BE58A]' src="./src/images/Frame (9).png" alt=""></img>
          </div>
        </div>
        </nav>
        <section className='container mx-auto px-8 lg:px-32'>
                <div className="rounded-3xl hero bg-base-200 bal h-[600px] ">
                <div className="hero-content text-center">
                  <div className="">
                  <h1 className="lexend text-xl lg:text-[52px] font-bold text-white">Discover an exceptional cooking </h1>
                    <h1 className="lexend  lg:text-[52px] font-bold text-white  ">class tailored for you!</h1>
                    <p className="py-6 text-gray-200 text-xs lg:text-xl">Green Food offers a sustainable dining experience, sourcing locally for delicious dishes that satisfy both your palate and environmental conscience.  Join us in embracing eco-friendly flavors.</p>
                    <div className='flex gap-5 justify-center flex-col lg:flex-row'>
                    <button className="btn px-8 rounded-full lexned text-lg font-bold bg-[#0BE58A] border-0">Explore Now</button>
                    <button className="btn px-8 rounded-full lexned text-lg font-bold bg-transparent text-white">Our Feedback</button>

                    </div>
                  </div>
                </div>
              </div>
          
        </section>
      </header>

      <main>
      <section className='container mx-auto px-8 lg:px-32 mt-[100px]'>
        {/* Our Recipes section head */}
        <div className='text-center'>
          <h1 className='lexend font-bold text-5xl mb-6'>Our Recipes</h1>
          <p className='lexend font-normal text-base mb-12'>Dive into our Recipes section for culinary inspiration and explore a world of flavorful creations <br /> crafted with care and passion. </p>
        </div>
        {/* main con */}
        <div className='flex lg:flex-row flex-col-reverse gap-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* <Dish></Dish> */}
          {
            dishes.map(dish => <Dish key={dish.recipe_id}  recipe={dish}  clickHandle={clickHandle} ></Dish>)
          }
          
          </div>


          <div className='lg:w-[514px] w-[340px] border-2 h-max pt-4 rounded-2xl'>
          <h1 className='text-center border-b-2 mt-8 pb-4 text-2xl lexend font-bold'>Want to cook: {cart.length}</h1>
          <div className='flex container lg:justify-around mx-auto  lg:px-10 mt-6 gap-8 ml-8 lg:ml-0 lg:gap-2 lg:pr-32'>
            <p>Name</p>
            <p>Time</p>
            <p>Calories</p>
          </div>
          {/* wnat to cook con */}
           <div className=''>
           
             {cart.map((item , index )=> (
                <div className='flex  gap-4 lg:gap-8 justify-around bg-[#f8f8f8] py-4 px-6 mt-6' key={item.recipe_id}>
                  <p className='lg:ml-0 ml-5' >{index+1}</p>
                  <p>{item.recipe_name}</p> 
                  <p>{item.preparing_time} <br /> minutes </p>
                  <p>{item.calories} <br /> calories </p>
                  <button  onClick={() => handleRemove(item.recipe_id , item)} className="btn rounded-full flex items-center font-bold bg-[#0BE58A] border-0 lg:w-[128px] w-[80px] lg:mr-0 mr-2 ">Preparing</button>
                </div>
              ))}
          
          </div> 

          <h1 className='text-center border-b-2 mt-8 pb-4 text-2xl lexend font-bold '>Currently cooking: {preparingCart.length}</h1>
          <div className='flex container justify-around mx-auto px-12 ml-5 mt-6 '>
            
            <p>Name</p>
            <p>Time</p>
            <p>calories</p>
          </div>

          {/* currently cooking con */}
          
          <div className='mb-11'>
         

            {
              preparingCart.map((newItem , index0) => (
                <div className='flex gap-8 justify-around bg-[#f8f8f8] py-4 px-6 mt-6' key={newItem.recipe_id}>
                  <p>{index0+1}</p>
                  <p>{newItem.recipe_name}</p>
                  <p>{newItem.preparing_time} <br /> minutes </p>
                  <p>{newItem.calories} <br /> calories </p>
                </div>
              ))
            }
          
          </div>

          <div className='flex justify-end gap-6 mr-10 pb-20 font-medium text-[16px] text-[#282828CC]'>
          <div><h1>Total Time = <br /> {totalPreparingTime} Minutes</h1></div>

            <div><h1>Total Calories = <br /> {totalCalories} Calories</h1></div>
          </div>
          <div>
            <h1 className='tal'></h1>
          </div>

          </div>

        </div>

        </section>
      </main>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </>
  )
}

export default App;

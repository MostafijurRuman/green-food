import React from 'react';

const Dish = ({recipe , clickHandle }) => {
  // console.log(course)
  return (
    <div>
           <div className="card card-compact  bg-base-100 shadow-xl p-6 border-2 border-gray-100
           ">
                    <figure><img className='rounded-2xl' src={recipe.recipe_image}  /></figure>
                    <div className="card-body">
                      <h2 className="card-title lexend text-xl font-bold">{recipe.recipe_name}</h2>
                      <p className='fira-sans text-base font-normal text-[#878787] border-b-2 pb-4'>{recipe.short_description}</p>
                      <h4 className='card-title lexend text-lg font-bold '>Ingredients:{recipe.ingredients.length}</h4>
                      <l>
                        <li className='fira-sans text-lg font-normal text-[#878787] mt-1'>{recipe.ingredients[0]}</li>
                        <li className='fira-sans text-lg font-normal text-[#878787]'>{recipe.ingredients[1]}</li>
                        <li className='fira-sans text-lg font-normal text-[#878787] border-b-2 pb-2 mb-2'>{recipe.ingredients[2]}</li>
                      </l>
                     <div className='flex gap-2 mb-6'>
                     <div className='flex mb'>
                        <img src="src/images/Frame (7).png" alt="" />
                        <p className='fira-sans text-base font-normal'>{recipe.preparing_time} minutes</p>
                      </div>
                      <div className='flex'>
                      <img src="src/images/Frame (8).png" alt="" />
                        <p className='fira-sans text-base font-normal'>{recipe.calories} calories</p>
                      </div>
                     </div>
                      <div className="card-actions ">
                      <button onClick={()=>clickHandle(recipe)} className="btn px-4 rounded-full lexned text-base font-bold bg-[#0BE58A] border-0">Want to Cook</button>
                      </div>
                    </div>
                  </div>
      
    </div>
  );
};


export default Dish;
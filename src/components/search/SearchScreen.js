import React, { useMemo } from 'react'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../hero/HeroCard';
import { getHeroesByName } from './../../selectors/getHeroesByName';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString  from 'query-string';

export const SearchScreen = () => {

   const navigate = useNavigate();
   const location = useLocation();
   // console.log(location.search);

   const { q='' } = queryString.parse(location.search);
   // console.log(q);

   const [formValues, handleInputChange ] = useForm({
      //estado inicial
      searchText: q
   });
 
   const {searchText} = formValues;

   const heroesFiltered = useMemo( ()=> getHeroesByName( q ), [q] ) ;
   // console.log('heroesFiltered', heroesFiltered );


   const hadleSearch = (event)=>{
      event.preventDefault();
     
      navigate(`?q=${ searchText }`);
      
   }

   return (
      <>
         <h1>Búsquedas</h1>
         <hr/>

         <div className="row">
            <div className='col-5'>
               <h4>Buscar</h4>
               <hr/>
             
               {/* <form onSubmit={(event)=>hadleSearch(event)} > == */}
               <form onSubmit={hadleSearch} >
                  <input
                     type="text"
                     placeholder='Buscar un héroe'
                     className='fomr-control'
                     name='searchText'
                     autoComplete='off'
                     value={searchText}
                     onChange={handleInputChange}
                   
                   />
                   <button
                     className='btn btn-outline-primary mt-1'
                     type='submit'
                      
                   >Buscar</button>
               </form>
            </div>
            <div className='col-7'>
               <h4>Resultados</h4>
               <hr/>
               
               {
                  (q === '') 
                     ? <div className='alert alert-info'>Buscar un Héroe</div>
                     : ( heroesFiltered.length === 0) && <div className='alert alert-danger'>No hay resultados con esa búsqueda: {q}</div>
               }
               
               {
                  heroesFiltered.map(hero=>(
                    <HeroCard
                     key={hero.id}
                     {...hero}
                    />
                  ))
               }

            </div>
         </div>
         
      </>
   )
}

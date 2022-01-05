import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { getHeroById } from './../../selectors/getHeroById';

// import batman from '../../assets/heroes/dc-batman.jpg'; //importacion recurso estático
// const heroImages = require.context('../../assets/heroes', true); //creando contexto estatico con webpack
import { heroImages } from "../../helpers/heroImages";

export const HeroScreen = () => {

   const {id} = useParams();
 

   //Optimización de proceso
   // const hero = getHeroById( id );
   const hero = useMemo( ()=> getHeroById( id ), [id] );
   
   const navigate = useNavigate();

   const handleReturn =  () =>{
      navigate(-1)
   }

   if( !hero ) {
      return <Navigate to='/' />
   }

   const imagePath = `/assets/heroes/${hero.id}.jpg`;




   return (
      <div className="row mt-5" >
         <div className="col-4">
            {/* <img src={ batman } con un import
             alt={hero.superhero} className="img-tumbnail img-fluid" /> */}
            <img src={ heroImages(`./${id}.jpg`) } alt={hero.superhero} className="img-tumbnail img-fluid" />
            {/* <img src={ imagePath } alt={hero.superhero} className="img-tumbnail img-fluid" /> */}
         </div>
         <div className="col-7">
            <h3>{hero.superhero}</h3>
            <ul className="list-group list-group-flush ">
               <li className="list-group-item"> <b>Alter ego:</b> {hero.alter_ego}</li>
               <li className="list-group-item"> <b>Publisher:</b> {hero.publisher}</li>
               <li className="list-group-item"> <b>First Appearance:</b> {hero.first_appearance}</li>
            </ul>
            <h5 className="mt-5">{hero.characters}</h5>
            <button 
               className="btn btn-outline-info"
               onClick={handleReturn}
               >volver</button>

         </div>
      </div>
   )
}

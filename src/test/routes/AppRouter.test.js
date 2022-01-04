import { AppRouter } from "../../routes/AppRouter";
import {mount} from 'enzyme';
import { AuthContext } from "../../auth/authContext";

describe('Pruebas en <AppRouter/>', ()=>{
   
   
   test('Debe mostrar el loggin si no está autenticado', ()=>{
      
      const contextValue = {
         user: {
            logged: false
         }
   
      }
      const wrapper = mount(
         <AuthContext.Provider value={contextValue} >
            <AppRouter/>
         </AuthContext.Provider>
      );

      // console.log ('=>>>>', wrapper.html() );

      expect (wrapper).toMatchSnapshot();
      expect(wrapper.find('h1').text().trim()).toBe('Login');

   }) 

   test('Debe mostrar el Componente de Marvel si está autenticado', ()=>{
      
      const contextValue = {
         user: {
            logged: true,
            name: 'Pepe'
         }   
      }

      const wrapper = mount(
         <AuthContext.Provider value={contextValue} >
            <AppRouter/>
         </AuthContext.Provider>
      );

      // console.log ('=>>>>', wrapper.html() );

      expect (wrapper).toMatchSnapshot();
      expect(wrapper.find('.navbar').exists()).toBeTruthy();

   })    

})
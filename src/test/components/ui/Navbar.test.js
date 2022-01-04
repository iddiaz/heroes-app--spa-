
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from './../../../components/ui/Navbar';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { types } from './../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=>({
   ...jest.requireActual('react-router-dom'),
   useNavigate: ()=> mockNavigate
}))



describe('Pruebas en <Navbar/>', ()=>{

   const contextValue = {
      user: {
         logged: true,
         name: 'Pedro'
      },
      dispatch: jest.fn()
   }

   const wrapper = mount(
      <AuthContext.Provider value={contextValue} >
         <MemoryRouter initialEntries={ ['/'] }>
            <Routes>
               <Route path="/" element={<Navbar/>}></Route>
            </Routes>         
         </MemoryRouter>
      </AuthContext.Provider>
   
   );

   test('debe mostrarse correctamente', ()=>{

  
      expect (wrapper).toMatchSnapshot();
      expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');

   })  

   test('debe llamar al logout, llamar el navigate y el dispatch con los argumentos', ()=>{

      wrapper.find('button').simulate('click')
      // wrapper.find('button').prop('onClick')()
      expect(contextValue.dispatch).toHaveBeenCalledWith({
         'type':types.logout
      });

      expect(mockNavigate).toHaveBeenCalledWith('/login', {replace:true})

   })  

})
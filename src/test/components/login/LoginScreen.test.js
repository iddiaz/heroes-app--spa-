
import { mount } from 'enzyme';
import { LoginScreen } from './../../../components/login/LoginScreen';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { types } from './../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=>({
   ...jest.requireActual('react-router-dom'),
   useNavigate: ()=> mockNavigate
}))

describe('Pruebas en <oginComponent/>', ()=>{

   const contextValue = {
      user: {
         logged: false,
         
      },
      dispatch: jest.fn()
   }  
   

   const wrapper = mount( 
      <AuthContext.Provider value={contextValue}> 
         <MemoryRouter initialEntries={['/login']}>
               <Routes>
                  <Route path="/login" element={<LoginScreen />} />
               </Routes>
                      
         </MemoryRouter>
      </AuthContext.Provider>
    )

   test('Debe hacer match con el snapshot', () => {

      expect(wrapper).toMatchSnapshot() 

      
   })

   test('Debe realizar el dispatch y la navegacion', () => { 

      const handleClick = wrapper.find('button').prop('onClick'); 

      handleClick();
      
      expect(contextValue.dispatch).toHaveBeenCalledWith({
         type: types.login,
         payload: { name: 'Ivan'} 
      })
      
      expect(mockNavigate).toHaveBeenCalledWith("/marvel", {"replace": true})

      localStorage.setItem('lastPath', '/dc'); 

      handleClick();

      expect(mockNavigate).toHaveBeenCalledWith("/dc", {"replace": true})
      
      
   })  
   

})
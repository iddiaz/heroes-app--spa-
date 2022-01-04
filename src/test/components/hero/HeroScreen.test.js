
import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HeroScreen } from './../../../components/hero/HeroScreen';



const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=>({
   ...jest.requireActual('react-router-dom'),
   useNavigate: ()=> mockNavigate
}))




describe('Pruebas en <HeroScreen/> ',()=>{

  
  
   test('No debe mostrar el Heroscreen si no ha un heroe en la url', ()=>{
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero']}>
            <Routes>
               <Route path="/hero" element={<HeroScreen/>}></Route>
               <Route path="/" element={<h1>No Hero Page</h1>}></Route>
            </Routes>
         </MemoryRouter> 
      )

      expect(wrapper.find('h1').text().trim()).toBe('No Hero Page')

      
   })


   test('Debe mostrar un heroe si el parámetro existe y se encuentra', ()=>{
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero/marvel-spider']}>
            <Routes>
               <Route path="/hero/:id" element={<HeroScreen/>}></Route>
               <Route path="/" element={<h1>No Hero Page</h1>}></Route>
            </Routes>
         </MemoryRouter> 
      )

      // console.log(wrapper.html());
      expect(wrapper.find('.row').exists()).toBe(true);

      
   })

   test('Debe regresar a la pantalla anterior', ()=>{
      
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero/marvel-spider']}>
            <Routes>
               <Route path="/hero/:id" element={<HeroScreen/>}></Route>
    
            </Routes>
         </MemoryRouter> 
      )

      wrapper.find('button').prop('onClick')();

      expect(mockNavigate).toHaveBeenCalledWith(-1);

    
      
   })

   test('Debe mostrar el No Hero Page si no tenemos un heroe', ()=>{
      
      const wrapper = mount(
         <MemoryRouter initialEntries={['/hero/marvel-spider1123']}>
            <Routes>
               <Route path="/hero/:id" element={<HeroScreen/>}></Route>
               <Route path="/" element={<h1>No Hero Page</h1>}></Route>
    
            </Routes>
         </MemoryRouter> 
      )


      expect(wrapper.text()).toBe('No Hero Page');

    
      
   })



})
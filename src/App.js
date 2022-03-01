import { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid'
import './App.css';


const URL='https://api.unsplash.com/photos/?client_id='
const KEY='-uUrwXu0sdpIuzY-TZCp-uuZ22r6uH8eQgUAZGOnH7g'
function App() {

  const [photos, setPhotos]=useState([])

 const fetchingFromServer=async()=>{
   try{
   /*  const req=await fetch(URL+KEY+'&page=2')
    const data=await req.json() */

    const [page1, page2]=await axios.all([
      axios.get(URL+KEY+'&page=13'), 
      axios.get(URL+KEY+'&page=14')])
    let data=[
      ...page1.data,
      ...page1.data,
      ...page2.data.slice(0,2),
      ...page2.data.slice(0,2)];
      
       data=data.map((image)=>{
        return({...image,unique:nanoid()})
      }) 
      const shuffle=(array)=>{

     
      for(let i=0; i<array.length; i++){
         let temp=Math.floor(Math.random()*array.length)
          let curr=array[temp];
          array[temp]=array[i]
          array[i]=curr;
      }
     
     return array
      }
      data=shuffle(data)
    setPhotos(data)
   }catch(err){
     console.log(err)
   }

 }
 const handleClick=(index)=>{
console.log(index)
let newPhotos=[...photos]
newPhotos[index].mark=true;
setPhotos(newPhotos)
 }
useEffect(()=>{
  fetchingFromServer()
}, [])

  return (
    <div className="App">
      {photos.map((photo, index)=>{
        return(
          <div className='card' key={photo.unique} onClick={()=>handleClick(index)}>
            <img src={photo.urls.thumb} alt={photo.alt_description} className={photo.mark ? 'show':'notShow'}/>
          </div>
        )
      })}
    </div>
  );
}

export default App;

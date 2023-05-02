import React, { useState } from "react";
import FormWithout from './FormWithout';
import FormWith from './FormWith';
import GradeCalculatorWith from "./GradeCalculatorWith";
import GradeCalculatorWithout from "./GradeCalculatorWithout";
import Error from "./Error";
import Home from "./Home";
import Search from "./Search";


function App() {
  // Retrieve the subjects and their coefficients from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const PageParam = urlParams.get('page');
  const GroupsParam = urlParams.get("groups");


  switch (PageParam) {
    case 'home':
      return <Home />;
    case 'generator!with':
      return <FormWith />;
    case 'generator!without':
      return <FormWithout />;
    case 'calculator':
      if(GroupsParam=='' || GroupsParam==null){
        return <GradeCalculatorWithout />;
      }else{
        return <GradeCalculatorWith />;
      }
      case 'search':
        return <Search />;
    default:      
      return <Error />;
  }  
}


export default App;

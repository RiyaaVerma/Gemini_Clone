import { createContext, useState } from "react";
import run from "../config/config";

export const Context=createContext();

const ContextProvider=(props)=>{

  const [input,setInput]=useState("");  //to save input data
  const [recentPrompt,setRecentPrompt]=useState(""); //when sent button clicked then input field data is stored in recentPrompt.
  const [prevPrompts,setPrevPrompts]=useState([]); //all input history in history
  const [showResult,setShowResult]=useState(false); //it,ll hide the suggestion boxes and show the result
  const [loading,setLoading]=useState(false);//true then display loading img
  const [resultData,setResultData]=useState("");  //to display result on webpage

  const delayPara=(index,nextWord)=>{
      setTimeout(function(){
        setResultData(prev=>prev+nextWord);
      },75*index)
  }

  const newChat=()=>{
    setLoading(false) 
    setShowResult(false)

  }

  const onSent=async(prompt)=>{

    setResultData("")//previous result removed from data
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt!==undefined){
      response=await run(prompt);
      setRecentPrompt(prompt)
    }
    else{
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompt(input)
      response=await run(input)
    }


    let responseArray=response.split("**");
    let newResponse="";
    for(let i=0;i<responseArray.length;i++){
      if(i===0 || i%2!==1){
          newResponse+=responseArray[i]
      }
      else{
        newResponse+="<b>"+responseArray[i]+"</b>"
      }
    }

    let newResponse2=newResponse.split("*").join("</br>")

    let newResponseArray=newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
      const nextWord=newResponseArray[i];
      delayPara(i,nextWord+" ")
    }
    setLoading(false) 
    setInput("")
  }
  const contextValue={ //pass these functions here to use in main and sidebar 
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;
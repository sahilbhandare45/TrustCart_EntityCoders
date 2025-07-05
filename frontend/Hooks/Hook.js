"use client";

import { use, useContext } from "react";
import { AppContext } from "../app/context";



export default function useappcontext() {
 
   const context = useContext(AppContext);
   if (!context) {
      throw new Error("useappcontext must be used within an appcontext provider");
   }    
    return context;

}
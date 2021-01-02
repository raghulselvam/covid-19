import {Circle,Popup} from "react-leaflet"
import React from "react";
import numeral from "numeral"

const casesColor={
   
    recovered:{
        hex:"#7dd71d",
        multiplier:1200,
    },
    cases:{
        hex:"#CC1042",
        multiplier:800,
   },
    deaths:{
        hex:"green",
        multiplier:2000,
    },
};
export const sortdata=(data)=>{
    const sortedData=[...data];
    sortedData.sort((a,b)=>{
        if(a.cases>b.cases){
            return -1;
        }
        else{
            return 1;
        }
    })
    return sortedData
}
 export const showOnData=(data,caseTypes="cases")=>data.map((country)=>(
       <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesColor[caseTypes].hex}
        fillColor={casesColor[caseTypes].hex}
        radius={Math.sqrt(country[caseTypes])*casesColor[caseTypes].multiplier}
        
       >
           <Popup>
             <div>
                 <div className="info_flag"style={{backgroundImage:`url(${country.countryInfo.flag})`}}/>
                 <div className="info_country">{country.country}</div>
                 <div className="info_case">Cases:{numeral(country.cases).format("0,0")}</div>
                 
                 <div className="info_recover">Recovered:{numeral(country.recovered).format("0,0")}</div>
                 <div className="info_death">Deaths:{numeral(country.deaths).format("0,0")}</div>
             </div>
               </Popup>

       </Circle>
    ))
    
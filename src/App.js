 import { Card, CardContent, FormControl, MenuItem,Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table";
import {sortdata} from "./util"
import Line from "./Lines"
import "leaflet/dist/leaflet.css"

function App() {
  const[countries,setcountries]=useState([])
  const[caseType,setcaseType]=useState('cases')
  const[country,setcountry]=useState("worldwide")
  const[countryInfo,setcountryInfo]=useState({})
  const[center,setcenter]=useState({lat:34.80746,lng:-40.4796})
  const[zoom,setzoom]=useState(3)
  const[countriesMap,setcountriesMap]=useState([])
  const[tabledata,setTable]=useState([])
  useEffect(()=>{
    fetch( "https://disease.sh/v3/covid-19/all").then(response=>response.json()).then(data=>{
      setcountryInfo(data) 
    })
  },[])
  const oncountry=async (event)=>{
      const countrycode=  event.target.value
      console.log(countrycode)
      const url=countrycode==="worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countrycode}`;
      await fetch(url).then(response=>response.json()).then((data)=>{
        setcountry(countrycode)
        setcountryInfo(data)
        setcenter([data.countryInfo.lat,data.countryInfo.lng]);
        
        setzoom(5);
      })
      
  }

  useEffect(()=>{
    const getData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response)=>response.json()).then((data=>{

        const countries=data.map(country=>({
          name:country.country,
          value:country.countryInfo.iso2
        }))
        setcountries(countries) 
        const sort=sortdata(data)
        setcountriesMap(data)
        setTable(sort)

      }))
    }
    getData()
    
  },[])
  return (
    
    <div className="app">
      <div className="app_left">
      <div className="app_header">
        <h2>COVID-19 TRACKER</h2>
         <FormControl className="app_dropdown">
           <Select 
             variants="outlined"
             value={country} onChange={oncountry}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country)=>(
                 <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

           </Select>
         </FormControl>
      </div>
      <div className="info_box">
         <InfoBox active={caseType==="cases"} title="Coronavirus Cases"  onClick={(e)=>setcaseType("cases")} total={countryInfo.cases} cases={countryInfo.todayCases}/>
         <InfoBox  active={caseType==="recovered"}title="Recovered" onClick={(e)=>setcaseType("recovered")} total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
         <InfoBox  active={caseType==="deaths"} title="Deaths" onClick={(e)=>setcaseType("deaths")} total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
      </div>
      <Map caseTypes={caseType} countryMap={countriesMap}center={center} zoom={zoom}  />
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tabledata}/>
              <h3 className="worldcases">worldwide new{" "}{caseType}</h3>
            <Line caseTypes={caseType}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

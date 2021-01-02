import { responsiveFontSizes } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {Line} from "react-chartjs-2"
import numeral from "numeral"
//https://disease.sh/v3/covid-19/historical/all?lastdays=120
const options={
    legend:{
        display:false,
    },
    elements:{
        point:{
            radius:0,
        }
    },
    maintainAspectRatio:false,
    tooltips: {
        mode:"index",
        intersect:false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        }
    },
    scales:{
        xAxes:[{
           type:"time",
           time:{
               format:"MM/DD//YY",
               tooltipFormat:"ll"
           }
        }],
        yAxex:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                    callback:function(value,index,values){
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
    
}

const buildData=(data,caseTypes="cases")=>{
    const chartData=[];
    let lastData;
    for(let date in data.cases){
        if(lastData){
            const newData={ 
                x:date,
                y:data[caseTypes][date]-lastData
            }
            chartData.push(newData)
        }
        
        lastData=data[caseTypes][date]
    }
    return chartData 
   
}

function Lines({caseTypes="cases"}) {
    
    const[data,setdata]=useState({});
    useEffect(()=>{
        const fetchData=async()=>{ await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120").then(response=>response.json()).then(data=>{
        console.log(data)
       let chartData=buildData(data,caseTypes)
       setdata(chartData)

    })
}
fetchData();
    },[caseTypes])
    
    
   
    return (
        <div className="line">
            {data?.length>0 &&(
              <Line
              options={options}
               data={{
                 datasets:  [
                     {
                         backgroundColor:"rgba(204,16,52,0.5)",
                         borderColor:"#CC1034",
                         data:data
                     }
                 ]
               }}
              />
            )}
            
        </div>
    )
}

export default Lines

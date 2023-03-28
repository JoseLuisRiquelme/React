import  { useState, useEffect } from "react";
import{
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';



import{ Bar} from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const MiApi=()=>{

    const[chart,setChart]=useState([])
    const [search, setSearch]= useState("30000")
    const apiUrl='https://mindicador.cl/api/bitcoin'
    useEffect(() => {
        const consultarInformacion = async () => {
            const response = await fetch(apiUrl)
            const datos = await response.json()
            console.log(datos)
            setChart(datos)
        }
        consultarInformacion()
        }, [apiUrl]);
        const labels2=chart?.serie?.filter((ele)=>{
            if(ele.valor<=search){return true;}
            return false;
        }).map((element)=>{
            const date=element.fecha.slice(0,10)
            return (date)}).reverse()
        const data2=chart?.serie?.map((element)=>element.valor).reverse()
        
    const data={
        labels:labels2,
        datasets: [
        {
            label:'Bitcoin price in US$',
            data:data2,
            backgroundColor:'gray',
            borderColor:'white',
            borderWidth:1,
        }
        ]}
    
    return(
        <div className="container">
        <h1>The Bitcoin in the last months</h1>
        <div className="input">
            <label htmlFor="search">Search for value US$</label>
            <input
            id="search"
            type="number"
            min="17000"
            max="30000"
            step="1000"
            placeholder="Search for price"
            onChange={(e)=>{
                e.preventDefault()
                setSearch(e.target.value)

            }}
            value={search}
            />
           
        </div>
        <div className="chart">
            <div className="chart2"style={{height:"60vh", width:"50vw",position:"relativa", marginBottom:"1%", padding:"1%"}}>
            <Bar
            data={data}
            >
          
            </Bar>
            </div>
        </div>
        </div>
    )
}
export default MiApi;
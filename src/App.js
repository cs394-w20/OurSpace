import React from "react";
import "./App.css";
import "rbx/index.css";

import parking from "./assets/local_parking-24px.svg";
import elevator from "./assets/elevator.svg";
// import ramp from "./assets/ramp.svg";

import { Card, Image, Column } from "rbx";

function App() {
  return (
    <div className="App">
      <input></input>
      <ListingList/>
    </div>
  );
};

const StorageCard = ({listId}) => {
  return (
    <div style={{width:"90%", margin:"Auto", paddingTop: '20px'}}>
      <Card style={{borderRadius:"8px"}}>
      <Card.Image>
        <Image.Container size="4by3">
          <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{borderRadius:"8px"}}/>
        </Image.Container>
      </Card.Image>

      <Card.Content style={{padding:"10px"}}>
        <table style={{width:"100%"}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'14px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{textTransform:'uppercase', fontWeight:"500", border:"1px solid black", borderRadius:"4px", padding:'4px', paddingTop:'0px', paddingBottom:'0px'}}>Large</span>
                <span style={{paddingLeft:"4px"}}>Entire Basement</span>


              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
                

                <div style={{display:'inline-block'}}>
                  <span style={{color:'red'}}>&#9733;</span>4.37
                  <span style={{fontSize:"13px", paddingLeft:"2px"}}>(32)</span>
                </div>
            </th>
          </tr>
        </table>

          <div style={{fontSize:'24px', textAlign:"left", width:"100%", lineHeight:'28px'}}>Mudd Garage
          <div style={{display:'inline-block', float:"right", marginTop:'5px'}}>
            
            <img style={{height:'22px'}} src={elevator}/>
            <img style={{height:'22px'}} src={parking}/>
          </div>
          
          </div>
          

          <table style={{width:"100%", marginTop:'10px'}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'20px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{fontWeight:"bold"}}>$2</span>/night
              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
              <div style={{fontSize:'16px', textAlign:"right", float:"right", fontWeight:"normal"}}>5 miles away</div>
              <br></br>
            </th>
          </tr>
        </table>
        
      </Card.Content>
    </Card>
    </div>
  );
};

const ListingList = () => {
  var PH_databaseFetch = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var columnIds = [...Array(PH_databaseFetch.length).keys()]
  return (
    <Column.Group multiline>
      {columnIds.map(i => (
        <Column key={i} size="one-quarter">
          <StorageCard listId={PH_databaseFetch[i]}/>
        </Column>
      ))}
    </Column.Group>
  );
};

export default App;

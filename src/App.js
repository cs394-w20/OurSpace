import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "rbx/index.css";
// import Icon from '@material-ui/core/Icon';

import parking from "./assets/local_parking-24px.svg";
import elevator from "./assets/elevator.svg";
// import ramp from "./assets/ramp.svg";



import { Card, Content, List, Image, Media, Title, Button } from "rbx";




function App() {
  return (
    <div className="App">
      <input></input>
      <StorageCard></StorageCard>
    </div>




  );
};

const StorageCard = ({storage_option}) => (
  <div>
    <Card>
    <Card.Image>
      <Image.Container size="4by3">
        <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" />
      </Image.Container>
    </Card.Image>

    <Card.Content>
      <Content>
        Mudd Garage <br/>
        $ 35 / night <br/>
        5 miles away <br/>

          <img src={parking}/>
          <img style={{width:'24px'}}src={elevator}/>
          {/* <img src={ramp}/> */}
        

      </Content>
    </Card.Content>
  </Card>
  </div>
);
  


export default App;

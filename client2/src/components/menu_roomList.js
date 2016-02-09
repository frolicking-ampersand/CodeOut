import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.rooms.data){
      return <div> Loading... </div>
    }

    console.log('INSIDE THE RoomList, THE this.props.rooms READS_____________________________________:', this.props.rooms);
    const roomItems = this.props.rooms.data.map(function (room) {
      return <li> {room.name} </li>;
    })
    return (
      <ul className="list-group">
        {roomItems}
      </ul>
    );
  }
};

export default RoomList;

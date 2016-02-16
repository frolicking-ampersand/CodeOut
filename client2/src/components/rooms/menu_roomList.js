import React, { Component } from 'react';

export default class RoomList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.rooms.data){
      return <div> Loading... </div>
    }

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


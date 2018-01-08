import React, { Component } from 'react';
import '../assets/scss/main.scss';
import '../assets/scss/usershortcut.scss';

class UserShortcut extends Component {
  meShortcut = {
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://avatarfiles.alphacoders.com/855/85557.png',
    groups: {
      'IT Devs': 'rocket',
      'buy/sell Poland': 'camera-retro',
      'Memes': 'image',
      'Janusz Pol - workmates': 'money',
      'Fishing fanatics': 'ship',
      'Star Wars fans': 'rebel'
    }
  }
  render() {
    return (
      <aside>
        <div className="account-shortcut">
          <img src={this.meShortcut.avatar} alt={`${this.meShortcut.firstName} ${this.meShortcut.lastName} avatar`}/>
          <h3><a className="text-marker" href="">{this.meShortcut.firstName} {this.meShortcut.lastName}</a></h3>
        </div>
        <div className="messages-shortcut">
          <h4><span className="fa fa-comments" aria-hidden="true"></span> Messages</h4>
        </div>
        <div className="groups-shortcut">
          <h4><span className="fa fa-users" aria-hidden="true"></span> Groups</h4>
          {
            Object.keys(this.meShortcut.groups).map ((value, i) =>
            <ul className="default-group-list" key={i}>
              <li><a href=""><span className={`fa fa-${this.meShortcut.groups[value]}`}></span> {value}</a></li>
            </ul>
            )
          }
        </div>
      </aside>
    );
  }
}

export default UserShortcut;

import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/scss/main.scss';
import '../assets/scss/useraccount.scss';

const user = {
  firstName: 'John',
  lastName: 'Doe',
  birth: '20-08-1989',
  email: 'johndoe@gmail.com',
  avatar: 'https://avatarfiles.alphacoders.com/855/85557.png',
  groups: {
    'IT Devs': 'rocket',
    'buy/sell Poland': 'camera-retro',
    'Memes': 'image',
    'Janusz Pol - workmates': 'money',
    'Fishing fanatics': 'ship',
    'Star Wars fans': 'rebel'
  }
};

class UserAccount extends Component {
  render() {
    return (
      <div className="user-account-container">
        <Header />
        <section className="user-account">
          <header className="user-name">
            <img src={user.avatar} alt={`${user.firstName} ${user.lastName} avatar`}/>
            <h2><strong>{user.firstName} {user.lastName}</strong></h2>
          </header>
            <aside>
              <h4>About me:</h4>
              <ul>
                <li><span className="fa fa-user-o" aria-hidden="true"></span> {user.firstName} {user.lastName}</li>
                <li><span className="fa fa-birthday-cake" aria-hidden="true"></span> {user.birth}</li>
                <li><span className="fa fa-envelope" aria-hidden="true"></span> {user.email}</li>
              </ul>
            </aside>
            <article>
              <h3>My groups:</h3>
              <table>
                <thead>
                <tr>
                  <th>Icon</th>
                  <th>Group</th>
                </tr>
                </thead>
                <tbody>
                {
                  Object.keys(user.groups).map ((value, i) =>
                  <tr key={i}>
                    <td><span className={`fa fa-${user.groups[value]}`}></span></td>
                    <td>{value}</td>
                  </tr>
                  )
                }
                </tbody>
              </table>
            </article>
        </section>
        <Footer />
      </div>
    );
  }
}

export default UserAccount;

import React, {Component} from 'react';
import Header from './Header';
import UserShortcut from './UserShortcut';
import Footer from './Footer';
import '../assets/scss/main.scss';
import '../assets/scss/groupadmin.scss';

class GroupAdmin extends Component {
  group = {
    name: 'Fishing Fanatics',
    administrator: 'John Doe',
    members: '5029',
    icon: 'ship',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta doloremque sit obcaecati dolorum nesciunt quo beatae minus quas, quidem, sapiente aliquam numquam. ',
    membersList: ['John Doe', 'John Smith', 'Foo Bar', 'James Bond', 'Harry Potter']
  }
  roles = [ 'User', 'Admin', 'Moderator'];
  render() {
    return (<div>
      <Header/>
      <div className="default-container default-grid">
        <UserShortcut/>
        <section>
          <header className="group-header">
            <h2 className="text-marker">
              <span className={`fa fa-${this.group.icon}`}></span>{this.group.name}</h2>
            <span className="members">Members:
              <span className="text-marker">{this.group.members}</span>
            </span>
          </header>
          <section>
            <table>
              <thead>
                <tr>
                  <td>Member</td>
                  <td>Role</td>
                  <td>Remove</td>
                </tr>
              </thead>
              <tbody>
                {
                  this.group.membersList.map((value, i) => {
                    return (<tr key={i}>
                      <td>{value}</td>
                      <td>
                        <select name="role" id="">
                        {
                          this.roles.map((value, i) => {
                            return <option key={i} value="{value}">{value}</option>
                          })
                        }
                        </select>
                      </td>
                      <td>
                        <span className="fa fa-times"></span>
                      </td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </section>
        </section>
      </div>
      <Footer/>
    </div>);
  }
}

export default GroupAdmin;

import React, {Component} from 'react';
import Header from './Header';
import UserShortcut from './UserShortcut';
import Footer from './Footer';
import '../assets/scss/group/admin.scss';

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
            <div>
            <h3 className="text-marker">Description:</h3>
            <textarea defaultValue={this.group.description} className="description-field" />
            </div>
            <div className="search-box">
              <button><span className="fa fa-search"></span></button>
              <input type="text" placeholder="Find user..."/>
            </div>
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
                  this.group.membersList.map((value) => {
                    return (<tr key={value.toString()}>
                      <td>{value}</td>
                      <td>
                        <select name="role" id="">
                        {
                          this.roles.map((value) => {
                            return <option key={value.toString()} defaultValue={value}>{value}</option>
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
            <div>
              <button>save changes</button>
            </div>
          </section>
        </section>
      </div>
      <Footer/>
    </div>);
  }
}

export default GroupAdmin;

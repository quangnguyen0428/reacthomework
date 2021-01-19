import React, { Component } from 'react'

class User extends Component {
  state = {
    edittingUser: { ...this.props.user },
    valueName: this.props.user.fullName,
    valueGender: this.props.user.gender,
    valueAge: this.props.user.age,
    valueCheck: this.props.user.checked
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('UNSAFE_componentWillReceiveProps',
      {
        nextProps,
        oldProps: this.props
      }
    );
  }


  componentWillUnmount() {
    console.log('componentWillUnmount');
    console.log(this.props.user);
    console.log('componentWillUnmount');
  }

  get display() {
    const { user } = this.props

    return (
        <tr>
          <td><input type="checkbox" checked={user.checked ? 'checked' : ''} onChange={this.changeTickRow} onClick={() => this.props.tickRow(user.id)}/></td>
          <td>{user.id}</td>
          <td>{user.fullName}</td>
          <td>{user.gender === 'male' ? 'Nam' : 'Nữ'}</td>
          <td>{user.age}</td>
          <td>
            <button className="btn btn-info" onClick={() => this.props.editRow(user.id, true)}>Edit</button>
            <button className="btn btn-danger" onClick={() => this.props.deleteItem(user.id)}>Delete</button>
          </td>
        </tr>
    )
  }

  changeName = event => {
    const value = event.target.value
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        fullName: value
      },
      valueName: value
    })

  }

  changeAge = event => {
    const value = event.target.value
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        age: value
      },
      valueAge: value
    })
  }

  changeGender = event => {
    const value = event.target.value
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        gender: value
      },
      valueGender: value
    })
  }

  changeTickRow = () => {
    const {user} = this.props
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        checked: user.checked
      }

    })
  }

  get editingRow() {
    const user = this.state.edittingUser
    const userCheck = this.props.user
    const {valueName} = this.state
    const {valueAge} = this.state
    const {valueGender} = this.state

    return(
      <tr>
        <td><input type="checkbox" checked={userCheck.checked ? 'checked' : ''} onChange={this.changeTickRow} onClick={() => this.props.tickRow(user.id)}/></td>

        <td>{user.id}</td>

        <td>
          <input value={user.fullName} onChange={this.changeName}/>
        </td>

        <td>
          <select className="from-control" value={user.gender}  onChange={this.changeGender}>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </td>

        <td><input value={user.age}  onChange={this.changeAge} /></td>

        <td>
          <button className="btn btn-primary" onClick={()=> this.props.saveRow(user.id, valueName, valueAge, valueGender, false)}>Save</button>
          <button className="btn btn-warning" onClick={()=> this.props.cancelRow(user.id, false)}>Cancel</button>
        </td>
      </tr>
    )
  }

  render() {
    const { user } = this.props

    return(
      <>
        {user.isEdit ? this.editingRow : this.display}
      </>
    )
  }
}

export default User

import React, { Component } from 'react'
import {students} from '../../constants/students'
import User from './User'
class Users extends Component {
	state = {
		students
  }

  editRow = (id, isEdit) => {
    const user = this.state.students.find(user => user.id ===id)

    user.isEdit = isEdit
    this.setState({
      students: [...this.state.students]
    })
  }

 	cancelRow = (id, isEdit) => {
    const user = this.state.students.find(user => user.id ===id)

    user.isEdit = isEdit
    this.setState({
      students: [...this.state.students]
    })
  }

  saveRow = (id, valueName, valueAge, valueGender, isEdit) => {
    const user = this.state.students.find(user => user.id === id)

      user.isEdit = isEdit
      user.fullName = valueName
      user.gender = valueGender
      user.age = valueAge
      this.setState({
        students: [...this.state.students]
      })
  }

  deleteItem = id => {
    this.setState({
      students: [...this.state.students.filter(user => user.id !== id)]
    })
  }

  deleteAll = () => {
    this.setState ({
      students: [...this.state.students.filter(user=> !user.checked)]
    })
  }

  tickRow = (id) => {
    const user = this.state.students.find(user => user.id === id)
    user.checked = !user.checked
    this.setState({
      students: [...this.state.students]
    })
  }

  toggleTickAll = (event) => {
    const isChecked = event.target.checked
    this.state.students.forEach(item => item.checked = isChecked)
    this.setState({
      students: [...this.state.students]
    })
  }

  addNewRecord = () => {

    const generateId = () => {
      let max = 0

      this.state.students.forEach(item => {
        if (item.id > max) {
          max = item.id
        }
      })

      return max + 1
    }

    const item = {
      id: generateId(),
      isEdit: false,
      checked: false,
      fullName: 'Nguyen Xuan Quang',
      gender: 'male',
      age: 22
    }

    this.state.students.push(item)
    this.setState({
      students
    })
  }


	render() {
		return (
			<div className="container mt-5">
				<div className="row mb-3">
					<div className="col-12 text-right p-0">
					<button className="btn btn-info mx-2" onClick={this.addNewRecord}>ADD</button>
					<button className="btn btn-danger" onClick={this.deleteAll}>Delete</button>
					</div>
				</div>
				<div className="row">
					<table className="table table-bordered">
						<thead>
							<tr>
								<th><input type="checkbox" onClick={this.toggleTickAll}/></th>
								<th>ID</th>
								<th>Full name</th>
								<th>Gender</th>
								<th>Age</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{this.state.students.map((user, index) =>
              <User
                key={user.id}
                user={user}
                editRow={this.editRow}
                saveRow={this.saveRow}
                deleteItem={this.deleteItem}
                cancelRow={this.cancelRow}
                tickRow={this.tickRow}
              />

              )}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Users

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';

import EditItem from './EditItem'

export default class MonthSortedItems extends Component {
  constructor(props){
    super(props)

    this.state = {
      renderedItems: [],
      modal: false,
      month: this.props.date,
      sum: 0
    }
  }

  // Get all items and get sorted later
    componentDidMount() {
      axios.get('/api/items')
        .then(items => this.setState({ renderedItems: items.data }))
        .catch(err => console.log(err));

        setTimeout(() => {
          var sumArray = this.state.renderedItems.filter(item => {
            var date = new Date(item.date)
            var month = date.getMonth();
            if(month !== this.state.month){
                return false
            }
            return true
        }).map(item => 
            item.amount
          );
    
          sumArray.map(item => this.setState({ sum: this.state.sum + item }))
        }, 1000)
    }

    // Toggle Modal
    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    // Delete Item
    onClick = (e) => {
      axios.delete('/api/items/' + e.target.value)
        .catch(err => console.log(err))

      this.toggle();
    }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete item</ModalHeader>
          <ModalBody>
            You successfully deleted it
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle} href="/">Close</Button>
          </ModalFooter>
        </Modal>

        <h2 style={{ fontSize:"20px" }}>On this month, you used <p style={{ fontSize:"40px", marginLeft: "10px" }}>{this.state.sum} yen</p></h2>
        <Table>
            <thead>
            <tr>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th>Detail</th>
                <th>Delete</th>
            </tr>
            </thead>
            
              <tbody>
              
              {/* Recieve a month from prop and filter it into items on that month */}
                {this.state.renderedItems.filter(item => {
                    var date = new Date(item.date)
                    var month = date.getMonth();
                    if(month !== this.state.month){
                        return false
                    }
                    return true
                }).map(item => (
                  <tr key={item._id}>
                    <td style={item.incomebool ? {color:"green"} : {color:"black"}}>{item.amount} yen</td>
                    <td>{item.type_name}</td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>
                      <EditItem 
                        item={item}
                      />
                    </td>
                    <td><Button color="danger" onClick={this.onClick} value={item._id}>Delete</Button></td>
                  </tr>
                ))}
              
              </tbody>
            
        </Table>
      </div>
    )
  }
}

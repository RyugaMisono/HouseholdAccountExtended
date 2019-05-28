import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';

import EditItem from './EditItem'

export default class PurchasedItems extends Component {
  constructor(){
    super()

    this.state = {
      renderedItems: [],
      modal: false,
      sum: 0
    }
  }

  // Get all items
    componentDidMount() {
      axios.get('/api/items')
        .then(items => this.setState({ renderedItems: items.data }))
        .catch(err => console.log(err));

        setTimeout(() => {
          var sumArray = this.state.renderedItems.map(item => 
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
        <h2 style={{ fontSize:"20px" }}>You used <p style={{ fontSize:"40px", marginLeft: "10px" }}>{this.state.sum} yen</p></h2>
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
              
                {this.state.renderedItems.map(item => (
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

import React from 'react';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormFeedback,
    FormText,
    Label,
    Input,
    CustomInput
 } from 'reactstrap';
 import axios from 'axios'

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      valid: false,
      invalid: false,
      disabled: true,
      amount: '',
      type_name: '',
      description: '',
      incomeBool: false
    };

    this.onChange = this.onChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Toggle modal
  toggle(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // Change value everytime someone types
  onChange(e){
      const { name, value } = e.target;
      if(e){
      this.setState({
          [name]: value
        })
    }
  }

  // onChange for amount
  onAmountChange(e){
    const { name, value } = e.target;
    if(e){
    this.setState({
        [name]: value
      })
    }

    // Identify whether it's int or not
    var parsedValue = parseInt(value);

     // If it's improper, emit error and  make the button disable
    if(value === "0" || "" || !parsedValue){
      this.setState({
        invalid: true,
        disabled: true
      })
    } else {
      this.setState({
        invalid: false,
        disabled: false
      })
    }
  }

  // Income or Expense
  onCheck(e){
    if(e){
      this.setState(prevState => ({
          incomeBool: !prevState.incomeBool
        }))
      }

    console.log(this.state.incomeBool)
  }

  // Post item with click
  onSubmit(){
      const newItem = {
        amount: this.state.amount,
        type_name: this.state.type_name,
        description: this.state.description,
        incomeBool: this.state.incomeBool
      }

      axios.post('/api/items', newItem)
            .then(res => console.log(res.data))
            .then(r => this.setState({ modal: false }))
            .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Button
            color="primary"
            onClick={this.toggle}
            size="lg"
            block
        >Add Item</Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <Form  onSubmit={this.onSubmit}>
            <ModalBody>  
                <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                        type="money"
                        name="amount"
                        value={this.state.amount}
                        id="amount"
                        placeholder="Type an amount"
                        onChange={this.onAmountChange}
                        valid={this.state.valid}
                        invalid={this.state.invalid}
                    />
                    <FormFeedback>Type Proper Number!!</FormFeedback>
                    <FormText>only Numbers Accepted</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="checkbox">Check if it's income</Label>
                  <div>
                    <CustomInput
                      type="checkbox"
                      id="exampleCustomradio"
                      name="customradio"
                      label="This is income"
                      onClick={this.onCheck}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                    <Label for="types">Select Type</Label>
                    <Input
                        type="select"
                        name="type_name"
                        id="type_name"
                        value={this.state.type_name}
                        onChange={this.onChange}
                    >
                        <option></option>
                        <option>foods</option>
                        <option>books</option>
                        <option>daiily goods</option>
                        <option>clothings</option>
                        <option>medical</option>
                        <option>others</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="discription">Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={this.state.description}
                        onChange={this.onChange}
                    />
                </FormGroup>  
                </ModalBody>
            <ModalFooter>
                <Button color="dark" type="submit" disabled={this.state.disabled}>Submit</Button>  
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Form>
        </Modal>
        
      </div>
    );
  }
}
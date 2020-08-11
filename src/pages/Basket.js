import React from 'react';
import { Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    let basket = localStorage.getItem("basketItems");
    basket = JSON.parse(basket)
    const totalPrice = basket.length > 0 && basket.map(item => item.total).reduce((prev, next) => prev + next);
    console.log(totalPrice)
    this.setState({
      basket,
      totalPrice
    })
  }

  removeItem(item) {
    let { basket, totalPrice } = this.state;
    console.log(basket.indexOf(item));
    basket.splice(basket.indexOf(item), 1);
    const toJSON = JSON.stringify(basket);
    localStorage.setItem("basketItems", toJSON);
    const editedPrice = basket.length > 0 && basket.map(item => item.total).reduce((prev, next) => prev + next);
    this.setState({
      basket,
      totalPrice: editedPrice
    })
  }

  render() {
    const { basket, totalPrice } = this.state;
    return (
      <main>
        <div>
          <h1>Basket</h1>
        </div>
        {basket && basket.length > 0 ?
        <div>
          <Row>
          {basket.map(
            item =>
            <Col md="3" sm="6">
            <Card>
              <CardBody>
                <CardTitle style={{fontSize: 22}}>{item.product}</CardTitle>
                <CardText>Colour: {item.itemColour}</CardText>
                <CardText>Vinyl Text: {item.itemText}</CardText>
                <CardText>Font: {item.chosenFont}</CardText>
                <CardText>Text Colour: {item.textColour}</CardText>
                <CardText>Quantity: {item.quantity}</CardText>
                <CardText>Total: £{item.total}</CardText>
                <Button onClick={() => this.removeItem(item)}>Remove from basket</Button>
              </CardBody>
            </Card>
          </Col>
          )}
          </Row>
          <div>£{totalPrice}</div>
          <Button>Buy</Button>
        </div>
      :
      <h3>Empty</h3>}
      </main>
    );
  }
}
export default Basket;
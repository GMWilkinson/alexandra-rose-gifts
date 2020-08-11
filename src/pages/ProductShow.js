import React from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input, Button, Collapse } from 'reactstrap';
import './ProductShow.css';

class ProductShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemText: '',
      chosenFont: '',
      itemColour: '',
      textColour: '',
      isFontsOpen: false,
      isColoursOpen: false,
      quantity: 1,
      message: ''
    };
  }

  componentDidMount() {
    const { item } = this.props.location.state;
    if (item['Item colour'].length === 1) {
      this.setState({
        itemColour: item['Item colour'][0]
      })
    }
  }

  handleChange(e) {
    const { target: {value} } = e;
    this.setState({
      itemText: value
    });
  }

  itemColour(e) {
    const { target: {value} } = e;
    this.setState({
      itemColour: value
    });
  }

  selectedFont(font) {
    this.setState({
      chosenFont: font
    })
  }

  selectedColour(colour) {
    this.setState({
      textColour: colour
    })
  }

  toggleFonts() {
    this.setState({
      isFontsOpen: !this.state.isFontsOpen
    })
  }

  toggleColours() {
    this.setState({
      isColoursOpen: !this.state.isColoursOpen
    })
  }

  quantity(e) {
    const { target: {value} } = e;
    console.log(value)
    this.setState({
      quantity: value
    });
  }

  addToCart(product, itemColour, itemText, chosenFont, textColour, indPrice, quantity, total) {
    const arr = [];
    if (itemColour.length < 1) {
      arr.push('item colour');
    }
    if (itemText.length < 1) {
      arr.push('item text');
    }
    if (chosenFont.length < 1) {
      arr.push('font');
    }
    if (textColour.length < 1) {
      arr.push('text colour');
    }
    if (arr.length > 0) {
      this.setState({
        message: `You need to choose ${arr}`
      })
    } else {
      const objectToBasket = {
        product: product,
        itemColour: itemColour,
        itemText: itemText,
        chosenFont: chosenFont,
        textColour: textColour,
        indPrice: indPrice,
        quantity: quantity,
        total: total
      };
      const getBasket = localStorage.getItem("basketItems");
      const parsedArr = JSON.parse(getBasket);
      if (!parsedArr) {
        const toJSON = JSON.stringify([objectToBasket]);
        localStorage.setItem("basketItems", toJSON);
      } else {
        parsedArr.push(objectToBasket);
        const toJSON = JSON.stringify(parsedArr);
        localStorage.setItem("basketItems", toJSON);
        this.props.history.goBack();
      }
    }
  }

  render() {
    const { item } = this.props.location.state;
    const { 
      itemText, 
      chosenFont, 
      itemColour, 
      textColour, 
      isFontsOpen, 
      isColoursOpen, 
      quantity, 
      message
    } = this.state;
    return (
      <main className="page-show">
        <div>
          <h1>{item.Product}</h1>
        </div>
        <div>
          <div className="info-box">{item.Description}</div>
        </div>
        <div>
          <Container className="themed-container" fluid="sm">
            <Row xs="1" sm="1" md="2">
              <Col className="columns">

                <div className="left-box" style={{width: '100%'}}>

                <FormGroup>
                  <Label for="text">Vinyl inscription</Label>
                  <Input className="text-input" type="text" name="text" id="text" onChange={(e) => this.handleChange(e)} />
                </FormGroup>

                <div className="lists">
                  <Dropdown isOpen={isFontsOpen} toggle={() => this.toggleFonts()}>
                    <DropdownToggle style={{background: '#e7bca4'}} caret>
                      Fonts
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="button" className="autumn" onClick={() => this.selectedFont('autumn')}>Autumn in November</DropdownItem>
                      <DropdownItem tag="button" className="bold" onClick={() => this.selectedFont('bold')}>Bold and Stylish Calligraphy</DropdownItem>
                      <DropdownItem tag="button" className="flower-shop" onClick={() => this.selectedFont('flower-shop')}>Flower Shop</DropdownItem>
                      <DropdownItem tag="button" className="janda" onClick={() => this.selectedFont('janda')}>JandaSwirlyTwirly</DropdownItem>
                      <DropdownItem tag="button" className="lumberjack" onClick={() => this.selectedFont('lumberjack')}>Lumberjack</DropdownItem>
                      <DropdownItem tag="button" className="october" onClick={() => this.selectedFont('october')}>October Twilight</DropdownItem>
                      <DropdownItem tag="button" className="july" onClick={() => this.selectedFont('july')}>OhMyItsJuly</DropdownItem>
                      <DropdownItem tag="button" className="unicorn" onClick={() => this.selectedFont('unicorn')}>Unicorn Calligraphy</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={isColoursOpen} toggle={() => this.toggleColours()}>
                      <DropdownToggle caret style={{background: '#e7bca4'}}>
                        Text Colours
                      </DropdownToggle>
                      <DropdownMenu style={{paddingLeft: 10}}>
                        {item && item['Vinyl colour'].map(
                          (colour, i) => 
                        <DropdownItem key={i} tag="button" onClick={() => this.selectedColour(colour)}>{colour}</DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>

                  </div>
                  <div className="text-box">
                    <div className={chosenFont} style={{color: textColour}}>{itemText}</div>
                  </div>
                </div>
              </Col>
              <Col className="columns">
                <img className="show-img" src={item["Display image"][0].url} />
              </Col>
            </Row>
            {item['Item colour'].length > 1 &&
            <Row>
              <Col className="color-row">
                <FormGroup>
                  <legend>Available colours</legend>
                  {item['Item colour'].map(
                    (colour, i) => 
                    <FormGroup key={i} inline check>
                    <Label check>
                      <Input type="radio" name="radio1" value={colour} onChange={(e) => this.itemColour(e)}/>{' '}
                      {colour}
                    </Label>
                  </FormGroup>
                  )}
                </FormGroup>
              </Col>
            </Row>
            }
            <Row className="lower-row" xs="1" sm="2" md="2">
              <Col className="lower cart">
                <Button 
                className="add-to-cart-button" 
                onClick={() => this.addToCart(item.Product, itemColour, itemText, chosenFont, textColour, item.Price, quantity, item.Price * quantity)}>
                  Add to cart
                </Button>
                <div style={{color: 'red'}}>{message}</div>
              </Col>
              <Col className="lower summary">
                <h4>{item.Product}</h4>
                <h4>Colour: {itemColour}</h4>
                <h4>Text: {itemText}</h4>
                <h4>Font: {chosenFont}</h4>
                <h4>Text colour: {textColour}</h4>
                <h4>Item price: £{item.Price.toFixed(2)}</h4>
                <h4>Quantity: <input type="number" id="quantity" name="quantity" min="1" max="100" onChange={(e) => this.quantity(e)} placeholder="1"></input></h4>
                <h4>Total: £{(item.Price * quantity).toFixed(2)}</h4>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    );
  }
}
export default ProductShow;
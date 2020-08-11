import React from 'react';
import { 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  CardImg, 
  Col, 
  Row,
  NavbarToggler,
  Navbar,
  Collapse,
  NavItem,
  Nav,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import './Home.css';
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyI3mce75kzQtsZF'}).base('appGrEpAVZejjCvEj');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: '',
      selectedFilter: 'Most Popular',
      isOpen: false
    };
  }

  componentWillMount() {
    const items = [];
    const that  = this;
    base('ARG Data').select({
      maxRecords: 500,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          items.push(record.fields)
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { 
          console.error(err); return; 
        } else {
          that.filterItems(items, 'Most Popular ');
          that.setState({
            allItems: items
          })
        }
    });
  }

  filterItems(items, filteredBy) {
    const filteredItems = items.filter(item => item.Category.includes(filteredBy.toLowerCase()));
    this.setState({
      products: filteredItems,
      selectedFilter: filteredBy
    })
  }

  showProduct(item) {
    this.props.history.push('/alexandra-rose-gifts/product', {
      item
    })
  }

  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  search(e) {
    e.preventDefault();
    const { target: {value} } = e;
    const { allItems } = this.state;
    const search = allItems.filter(product => product.Product.toLowerCase().startsWith(value.toLowerCase()))
    this.setState({
      products: search
    })
  }

  render() {
    const { products, allItems, selectedFilter, isOpen } = this.state;
    return (
        <section>
          <Row>
            <Navbar className="home-nav" light expand="md" id="navbar">
              <NavbarToggler onClick={() => this.toggleNav()} style={{color: 'black'}} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto home-ul" navbar>
                  <NavItem onClick={() => this.filterItems(allItems, 'Bottles')}>
                    Bottles
                  </NavItem>
                  <NavItem onClick={() => this.filterItems(allItems, 'Cleaning')}>
                    Cleaning
                  </NavItem>
                  <NavItem onClick={() => this.filterItems(allItems, 'Gifts')}>
                    Gifts
                  </NavItem>
                  <NavItem onClick={() => this.filterItems(allItems, 'Health and Beauty ')}>
                    Health and Beauty
                  </NavItem>
                  <NavItem onClick={() => this.filterItems(allItems, 'Most Popular ')}>
                    Most Popular
                  </NavItem>
                  <NavItem onClick={() => this.filterItems(allItems, 'Special Occasion')}>
                    Special Occasion
                  </NavItem>
                  <NavItem onClick={() => this.filterItems(allItems, 'Storage')}>
                    Storage
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Row>
          <InputGroup className="search-bar">
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input onChange={(e) => this.search(e)} />
          </InputGroup>
          <Row style={{marginTop: '1rem'}}>
          {products && products.map(
            (item, i) =>
            <Col sm="6" md="4" lg="3" key={i}>
              <Card color="secondary" onClick={() => this.showProduct(item)} style={{ borderColor: '#421791' }}>
                <CardImg className="home-images" top width="100%" src={item["Display image"][0].url} alt={item.Product} />
                <CardBody>
                  <CardTitle><h3>{item.Product}</h3></CardTitle>
                  <CardText className="description-text">{item.Description}</CardText>
                  <CardText>
                    <small>£{item.Price.toFixed(2)}</small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          )}
          </Row>
        </section>
    );
  }
}
export default Home;
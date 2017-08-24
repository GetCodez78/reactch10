import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap'
import Header from './Components/Header';
import Books from './Components/Books';
import SearchInput from './Components/SearchInput';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {  // automatically called wih we use <App/>
    super()
    this.state = {
      books: [],
      text:'Harry Potter'
    }
  }

  componentWillMount() {
    this.getBooks();  // 1. update state onload 
  }

  getBooks() {   // updates state 
    axios.request({
      method:'get',
      url:'https://www.googleapis.com/books/v1/volumes?q='+this.state.text
    }).then((response) => {
      this.setState({books:response.data.items}, () => {
        console.log(this.state);
      });
  }).catch((error) => {
    console.log(error);
  });
}
handleChange(text) {
  this.setState({text:text}  /* state's text is set to parameter text */, this.getBooks() /* getBooks based on new state */ );
}
  render() {
    return (
      <div className="App">
        <Header />
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
            <SearchInput onChange={this.handleChange.bind(this)} value={this.state.text}/>
              <Books books={this.state.books}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;

import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className="home-main columns is-multiline">
        <div className="column is-12">
          <h1 className="title home-title has-text-centered">About</h1>
        </div>
      </main>
    );
  }
}
export default About;
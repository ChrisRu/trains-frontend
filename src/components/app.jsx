import React, { Component } from 'react';
import Router, { route } from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import Match from 'preact-router/match';
import Title from './Title';
import Train from './Train';
import List from './List';

let oldTrain = { compartments: [0, 0, 0, 0, 0] };

class App extends Component {
  state = {
    trains: [],
    fetching: true,
    refetch: true,
    random: false
  };

  componentDidMount() {
    this.fetchData();

    setInterval(() => {
      if (this.state.refetch) {
        this.fetchData();
      }
    }, 1000);
  }

  toggleRandom = bool => {
    const data = new FormData();
    data.append('enabled', String(bool));
    fetch('http://trainemulator.azurewebsites.net/api/random', {
      method: 'POST',
      body: data
    });
  };

  toggleRefetch = bool => {
    this.setState({ refetch: bool });
  };

  fetchData = () =>
    fetch('http://trainemulator.azurewebsites.net/api')
      .then(res => res.json())
      .then(data => {
        this.setState({
          fetching: false,
          trains: data
        });
      });

  render() {
    const { trains, fetching } = this.state;

    return (
      <div>
        <div class="random">
          <input
            type="checkbox"
            onInput={event => {
              this.setState({ random: event.target.value });
            }}
          />
          <button
            onClick={() => {
              this.toggleRandom(this.state.random);
            }}>
            Set Random
          </button>
        </div>
        <Title
          value="Step In"
          onClick={() => {
            route(this.props.to, true);
          }}
        />
        {fetching ? (
          <div class="spinner">
            <div class="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
            <span>Traindelays...</span>
          </div>
        ) : (
          <Router history={createHashHistory()}>
            <List
              path="/"
              trains={trains}
              onSelect={active => {
                this.setState(prevState => ({
                  active,
                  previousData: prevState.active
                }));
              }}
            />
            <Match path="/:id">
              {({ path }) => {
                const id = path.split('/')[1];
                const train = trains.find(train => String(train.id) === id);
                try {
                  return (
                    <Train
                      toggleRefetch={this.toggleRefetch}
                      refetch={this.fetchData}
                      train={train}
                      previousTrain={oldTrain}
                      fetchData={this.fetchData}
                    />
                  );
                } finally {
                  oldTrain = JSON.parse(JSON.stringify(train));
                }
              }}
            </Match>
          </Router>
        )}
      </div>
    );
  }
}

export default App;

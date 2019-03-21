import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [{ id: 1, value: 3 }, { id: 2, value: 0 }, { id: 3, value: 0 }]
  };
  handleDelete = counterId => {
    const counters = this.state.counters.filter(item => item.id !== counterId);
    this.setState({ counters });
  };
  handleAdd = counter => {
    const counters =  this.state.counters;
    const index = counters.indexOf(counter)
    counters[index].value++
    this.setState({counters})
  };
  render() {
    return (
      <div>
        {this.state.counters.map(counter => {
          return (
            <Counter
              key={counter.id}
              onDelete={this.handleDelete}
              onAdd={this.handleAdd}
              counter={counter}
            />
          );
        })}
      </div>
    );
  }
}

export default Counters;

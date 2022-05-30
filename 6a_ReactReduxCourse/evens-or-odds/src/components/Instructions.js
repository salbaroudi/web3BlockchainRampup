import React, { Component } from 'react';
import { connect } from 'react-redux';
import { collapseInstructions, expandInstructions } from '../actions/settings';


class Instructions extends Component {

  render () {
    console.log("Instructions THIS::" , this);
    return (
      <div>
        <hr />
        {
          this.props.instructionsExpanded ? (
            <div>
              <h3> How to Play:</h3>
              <div> "Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>,
              <br />
              <button onClick={this.props.collapseInstructions}> Hide Instructions </button>
            </div>
          ) : (
            <div>
              <br />
              <button onClick={this.props.expandInstructions}> Show Instructions </button>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("state (instructions)", state);

  return {instructionsExpanded: state.instructionsExpanded};
}

const mapDispatchToProps = dispatch => {
  return {
    expandInstructions: () => dispatch(expandInstructions()),
    collapseInstructions: () => dispatch(collapseInstructions())
  };
}

const componentConnector = connect(mapStateToProps,mapDispatchToProps);

export default componentConnector(Instructions);

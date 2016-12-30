import { connect } from 'react-redux';
import MyComponent from './components/myComponent';

function mapStateToProps(state) {
  return {
    text: state.text,
    name: state.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (e) => dispatch({
      type: 'change',
      payload: e.target.value
    })
  };
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

export default App;

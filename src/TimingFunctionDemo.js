// CSS Transitions demo

// TODO: Try to animate flex-basis property instead of max-width

import * as React from 'react';
import Textarea from 'react-textarea-autosize';

const Drawer = props => {
  const { opened, duration, timingFunction } = props;

  /* This CSS style is applied when the drawer is opening and opened */
  const openedStyle = {
    maxWidth: '100%' /* max-with is 100% when the drawer is opened */,
    /* Upon transitioning to Open,
      animate 'max-width' for 'duration' period
      with 'timingFunction` timing function */
    transition: `max-width ${duration} ${timingFunction}`
  };

  /* This CSS style is applied when the drawer is closing and closed */
  const closedStyle = {
    maxWidth: 0 /* max-width is 0 in the closed drawer */,
    /* Upon transitioning to Closed,
       animate 'max-width' for 'duration' period
      with 'timingFunction` timing function */
    transition: `max-width ${duration} ${timingFunction}`
  };
  return (
    <div className="row">
      <div className="col-12 col-md-3 d-flex text-left">{timingFunction}</div>
      <div className="col-12 col-md-9 d-flex mb-1">
        <input
          type="text"
          className="drawer"
          // Apply 'openedStyle' CSS class if the drawer is opened,
          // and 'closedStyle' if the drawer is closed.
          style={opened ? openedStyle : closedStyle}
        />
      </div>
    </div>
  );
};

class TimingFunctionDemo extends React.Component {
  state = {
    opened: false, // Initially search form is Closed
    timingFunctions: [
      'linear',
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
      'cubic-bezier(0.4, 1, 0.6, 5)',
      'steps(5, jump-start)',
      'step-start',
      'step-end'
    ],
    duration: '4s'
  };

  // Handle onChange event of the duration input element
  handleDurationInputChange = ev =>
    this.setState({ duration: ev.currentTarget.value });

  // Handle onChange event of the timing functions textarea
  handleTextAreaChange = ev => {
    // Parse a timing functions list from the text area into an array
    const str = ev.currentTarget.value.split('\n');
    this.setState({ timingFunctions: str });
  };

  toggleOpened = () =>
    // Toggle opened / closed state.
    // Because we rely on the previous state, we need to use a functional setState form
    // https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/
    this.setState(state => ({ ...state, opened: !state.opened }));

  render() {
    const { duration, opened, timingFunctions } = this.state;
    return (
      <div className="mb-3">
        <div className="row">
          <div className="col-12 col-sm-6 form-group">
            <label for="duration-input">Duration</label>
            <input
              id="duration-input"
              className="form-control"
              style={{ textAlign: 'right' }}
              value={duration}
              onChange={this.handleDurationInputChange}
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label for="timing-functions-input">Timing functions</label>
            <Textarea
              id="timing-functions-input"
              className="form-control"
              value={timingFunctions.join('\n')}
              onChange={this.handleTextAreaChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.toggleOpened}
            >
              {opened ? 'Close' : 'Open'}
            </button>
          </div>
        </div>
        {timingFunctions.map(timingFunction => (
          <Drawer
            key={timingFunction}
            opened={opened}
            duration={duration}
            timingFunction={timingFunction}
          />
        ))}
      </div>
    );
  }
}

export default TimingFunctionDemo;

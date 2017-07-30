import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import DemoCode from './DemoCode';
import Switch from 'material-ui/Switch';
import DemoObject from './DemoObject';
import { FormControlLabel } from 'material-ui/Form';
import { fields, selectOptions } from './DemoData';
import './Demo.css';

export default class Demo extends React.Component {
  state = {
    startStyle: JSON.stringify({
      opacity: 0,
    }),
    endStyle: JSON.stringify({
      opacity: 1,
    }),
    delaySeconds: 0,
    startAnimation: false,
    onCompleteStyle: '',
    startReverseAnimate: false,
    easeType: 'linear',
    durationSeconds: '0.3',
    showCode: false,
    easyMode: false,
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSwitchChange = name => (event, checked) => {
    this.setState({
      [name]: checked,
    });
  };

  changeAnimateStyle = e => {
    const result = selectOptions.find(({ name }) => name === e.target.value);

    if (result) {
      this.setState({
        startStyle: JSON.stringify(result.startStyle),
        endStyle: JSON.stringify(result.endStyle),
        startAnimation: false,
        startReverseAnimate: false,
      });
    }
  };

  render() {
    const { startAnimation, easyMode } = this.state;

    return (
      <section className="demo-section">
        <Grid container gutter={16}>
          <Grid item xs={12} className="Demo-mode-selector">
            <FormControlLabel
              label="🤘 Easy Mode"
              control={
                <Switch
                  aria-label="pro"
                  onChange={this.handleSwitchChange('easyMode')}
                />
              }
            />
          </Grid>

          <Grid item xs={6}>
            {easyMode &&
              <div className="demo-simple">
                <label>Animation style: </label>
                <select onChange={this.changeAnimateStyle}>
                  {selectOptions.map(({ name }) => {
                    return (
                      <option value={name} key={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>}

            {!easyMode &&
              fields.map(field => {
                return (
                  <Grid item xs={12} key={field.value}>
                    <TextField
                      className="demo-section-input"
                      rowsMax="4"
                      onBlur={() => console.log('blur')}
                      onChange={e =>
                        this.handleChange(field.value, e.target.value)}
                      value={this.state[field.value]}
                      label={field.label}
                    />
                  </Grid>
                );
              })}
          </Grid>

          <Grid item xs={6}>
            <DemoObject {...this.state} />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="demo-button"
              raised
              color="primary"
              onClick={() => {
                this.setState(prevState => {
                  return {
                    startAnimation: !prevState.startAnimation,
                    startReverseAnimate: prevState.startAnimation,
                  };
                });
              }}
            >
              {startAnimation ? 'Reverse Animate' : 'Start Animate'}
            </Button>

            <Button
              raised
              color="accent"
              onClick={() => {
                this.setState(prevState => {
                  return {
                    showCode: !prevState.showCode,
                  };
                });
              }}
            >
              {`< >`}
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <DemoCode {...this.state} />
        </Grid>
      </section>
    );
  }
}

import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import DemoCode from './DemoCode';
import Switch from 'material-ui/Switch';
import DemoObject from './DemoObject';
import Animate from 'react-simple-animate';
import { FormControlLabel } from 'material-ui/Form';
import { fields, selectOptions } from './DemoData';
import './Demo.css';

const startStyle = {
  opacity: 0,
};

const endStyle = {
  opacity: 1,
};

const delaySeconds = 0.1;

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
      startAnimation: false,
    });
  };

  changeAnimateStyle = e => {
    const result = selectOptions.find(({ name }) => name === e.target.value);

    if (result) {
      this.setState({
        startStyle: JSON.stringify(result.startStyle),
        endStyle: JSON.stringify(result.endStyle),
        startAnimation: false,
      });
    }
  };

  render() {
    const { startAnimation, easyMode } = this.state;

    return (
      <section className="demo-section">
        <Grid container spacing={16}>
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

          <Grid item xs={6} md={4}>
            {easyMode &&
              <Animate startAnimation {...{ startStyle, endStyle }}>
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
                </div>
              </Animate>}

            {!easyMode &&
              <Animate
                startAnimation
                {...{ startStyle, endStyle, delaySeconds }}
              >
                {fields.map((field, i) => {
                  return (
                    <Grid item xs={12} key={field.value}>
                      <TextField
                        className="demo-section-input"
                        rowsMax="4"
                        fullWidth
                        onChange={e =>
                          this.handleChange(field.value, e.target.value)}
                        value={this.state[field.value]}
                        label={field.label}
                        multiline={i < 2}
                        helperText={
                          i < 2 &&
                          `Note: value is json format, eg: {"key": "value"}`
                        }
                      />
                    </Grid>
                  );
                })}
              </Animate>}
          </Grid>

          <Grid item xs={6} md={8}>
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

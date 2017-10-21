import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import DemoCode from './DemoCode';
import DemoObject from './DemoObject';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';
import Animate from 'react-simple-animate';
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
    reverseDelaySeconds: 0,
    durationSeconds: '0.3',
    showCode: false,
    easyMode: false,
    count: 1,
    keys: [],
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

  setKeys() {
    this.setState(previousState => {
      const { keys, count } = previousState;
      const keysCopy = [...keys];

      if (count > keys.length) {
        keysCopy.push(new Date().getTime());
      } else if (count <= keys.length) {
        keysCopy.pop();
      }

      return {
        keys: keysCopy,
      };
    });
  }

  componentDidMount() {
    this.setKeys();
  }

  clickHandler(item) {
    this.setState(previousState => {
      const { keys } = previousState;

      return {
        keys: keys.filter(key => key !== item),
      };
    });
  }

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

            <Animate
              startAnimation={startAnimation}
              tag="span"
              {...{ startStyle, endStyle }}
            >
              <Button
                fab
                onClick={() => {
                  this.setState(previousState => {
                    return {
                      count: --previousState.count,
                    };
                  });
                  this.setKeys();
                }}
                color="accent"
                aria-label="add"
                className="new-button"
              >
                <RemoveIcon />
              </Button>
            </Animate>

            <Animate
              startAnimation={startAnimation}
              tag="span"
              {...{ startStyle, endStyle }}
            >
              <Button
                fab
                onClick={() => {
                  this.setState(previousState => {
                    return {
                      count: ++previousState.count,
                    };
                  });
                  this.setKeys();
                }}
                color="primary"
                aria-label="add"
                className="new-button"
              >
                <AddIcon />
              </Button>
            </Animate>
          </Grid>

          <Grid item xs={6} md={4}>
            {easyMode && (
              <Animate startAnimation {...{ startStyle, endStyle }}>
                <div className="demo-simple">
                  <label htmlFor="animationStyle">Animation style: </label>
                  <select
                    id="animationStyle"
                    onChange={this.changeAnimateStyle}
                  >
                    {selectOptions.map(({ name }) => {
                      return (
                        <option value={name} key={name}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Animate>
            )}

            {!easyMode && (
              <Animate
                startAnimation
                {...{ startStyle, endStyle, delaySeconds }}
              >
                {fields.map((field, i) => {
                  let helperText = '';

                  if (i < 3) {
                    helperText = `Note: value is json format, eg: {"key": "value"}`;
                  } else if (field.label === 'Ease Type') {
                    helperText = `Note: css transition ease, eg: ease ease-in cubic-bezier() ect`;
                  }

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
                        helperText={helperText}
                      />
                    </Grid>
                  );
                })}
              </Animate>
            )}
          </Grid>

          <Grid item xs={6} md={8}>
            <DemoObject
              {...this.state}
              clickHandler={item => this.clickHandler(item)}
            />
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
              {'< >'}
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

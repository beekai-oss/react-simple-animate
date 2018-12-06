import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DemoCode from './DemoCode';
import DemoObject from './DemoObject';
import AddIcon from '@material-ui/icons/Add';
import { Animate } from 'react-simple-animate';
import { fields, selectOptions } from './DemoData';
import tryParseJson from './tryParseJson';
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
    play: false,
    onCompleteStyle: '',
    easeType: 'linear',
    reverseDelaySeconds: 0,
    durationSeconds: '0.3',
    showCode: true,
    easyMode: false,
    count: 1,
    keys: [],
    errroFields: new Map(),
  };

  setKeys() {
    this.setState(previousState => {
      const { keys, count } = previousState;
      const keysCopy = [...keys];
      const id = new Date().getTime();

      if (count > keys.length) {
        keysCopy.push({
          id,
          ...(keys.length > 0 ? { mount: true } : null),
        });
      }

      return {
        keys: keysCopy,
      };
    });
  }

  changeAnimateStyle = e => {
    const result = selectOptions.find(({ name }) => name === e.target.value);

    if (result) {
      this.setState({
        startStyle: JSON.stringify(result.startStyle),
        endStyle: JSON.stringify(result.endStyle),
        play: false,
      });
    }
  };

  handleSwitchChange = name => (event, checked) => {
    this.setState({
      [name]: checked,
      play: false,
    });
  };

  handleOnBlur = (e, name) => {
    if (name.includes('Style')) {
      const valid = tryParseJson(e.target.value);

      this.setState(previousState => {
        return {
          errroFields: new Map(previousState.errroFields.set(name, !!valid)),
        };
      });
    }
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    this.setKeys();
  }

  clickHandler(item) {
    this.setState(previousState => {
      const { keys } = previousState;
      const index = keys.findIndex(key => key.id === item.id);
      const copy = [...keys];
      copy[index].unMount = true;

      return {
        keys: copy,
      };
    });
  }

  render() {
    const { play, easyMode } = this.state;

    return (
      <section className="demo-section">
        <Grid container spacing={16}>
          <Grid item xs={12} className="Demo-mode-selector">
            <FormControlLabel
              label="🤘 Easy Mode"
              control={<Switch aria-label="pro" onChange={this.handleSwitchChange('easyMode')} />}
            />

            <Animate play={play} tag="span" {...{ startStyle, endStyle }}>
              <Button
                variant="fab"
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
              >
                <AddIcon />
              </Button>
            </Animate>
          </Grid>

          <Grid item xs={6} md={4}>
            {easyMode && (
              <Animate play {...{ startStyle, endStyle }}>
                <div className="demo-simple">
                  <label htmlFor="animationStyle">Animation style: </label>
                  <select id="animationStyle" onChange={this.changeAnimateStyle}>
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
              <Animate play {...{ startStyle, endStyle, delaySeconds }}>
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
                        onBlur={e => this.handleOnBlur(e, field.value)}
                        onChange={e => this.handleChange(field.value, e.target.value)}
                        value={this.state[field.value]}
                        label={field.label}
                        {...(field.value.includes('Seconds') ? { type: 'number' } : null)}
                        multiline={i < 2}
                        {...(this.state.errroFields.get(field.value) === false
                          ? {
                              error: true,
                              helperText: helperText,
                            }
                          : null)}
                      />
                    </Grid>
                  );
                })}
              </Animate>
            )}
          </Grid>

          <Grid item xs={6} md={8}>
            <DemoObject {...this.state} clickHandler={item => this.clickHandler(item)} />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{
                marginRight: '20px',
              }}
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState(prevState => {
                  return {
                    play: !prevState.play,
                  };
                });
              }}
            >
              {play ? 'Reverse Animate' : 'Start Animate'}
            </Button>

            <Button
              variant="contained"
              color="secondary"
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

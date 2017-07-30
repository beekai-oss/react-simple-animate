import React from 'react';
import Aniamte from './animate';
import logo from './logo.svg';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import './Demo.css';

const fields = [
  {
    label: 'Start Style',
    value: 'startStyle',
  },
  {
    label: 'End Style',
    value: 'endStyle',
  },
  {
    label: 'On Complete Style',
    value: 'onCompleteStyle',
  },
  {
    label: 'Delay Seconds',
    value: 'delaySeconds',
  },
  {
    label: 'Ease Type',
    value: 'easeType',
  },
];

export default class Demo extends React.Component {
  state = {
    startStyle: JSON.stringify({
      opacity: 0.4,
    }),
    endStyle: JSON.stringify({
      opacity: 1,
    }),
    delaySeconds: 0,
    startAnimation: false,
    onCompleteStyle: '',
    startReverseAniamte: false,
    easeType: 'linear',
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  parseJsonWithCatch(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }

  render() {
    const {
      startStyle,
      endStyle,
      startAnimation,
      startReverseAniamte,
      onCompleteStyle,
      delaySeconds,
      easeType,
    } = this.state;

    return (
      <section className="demo-section">
        <Grid container gutter={16}>
          <Grid item xs={6}>
            {fields.map(field => {
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

            <Grid item xs={12}>
              <Button
                className="demo-button"
                raised
                color="primary"
                onClick={() => {
                  this.setState(prevState => {
                    return {
                      startAnimation: !prevState.startAnimation,
                      startReverseAniamte: prevState.startAnimation,
                    };
                  });
                }}
              >
                {startAnimation ? 'Reverse Animate' : 'Start Animate'}
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <div>
              <Aniamte
                {...{
                  delaySeconds,
                  startAnimation,
                  easeType,
                  startReverseAniamte,
                }}
                onCompleteStyle={this.parseJsonWithCatch(onCompleteStyle)}
                startStyle={this.parseJsonWithCatch(startStyle)}
                endStyle={this.parseJsonWithCatch(endStyle)}
              >
                <img src={logo} alt="logo" className="demo-logo" />
              </Aniamte>
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

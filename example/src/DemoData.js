export const fields = [
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
    label: 'Duration Seconds',
    value: 'durationSeconds',
  },
  {
    label: 'Delay Seconds',
    value: 'delaySeconds',
  },
  {
    label: 'Reverse Delay Seconds',
    value: 'reverseDelaySeconds',
  },
  {
    label: 'Ease Type',
    value: 'easeType',
  },
];

export const selectOptions = [
  {
    name: 'opacity',
    value: {
      startStyle: {
        opacity: 0,
      },
      endStyle: {
        opacity: 1,
      },
    },
  },
  {
    name: 'transformX',
    startStyle: {
      transform: 'translateX(500px)',
    },
    endStyle: {
      transform: 'translateX(0)',
    },
  },
  {
    name: 'transformY',
    startStyle: {
      transform: 'translateY(500px)',
    },
    endStyle: {
      transform: 'translateY(0)',
    },
  },
  {
    name: 'scale',
    startStyle: {
      transform: 'scale(0)',
    },
    endStyle: {
      transform: 'scale(1)',
    },
  },
  {
    name: 'rotate',
    startStyle: {
      transform: 'rotateZ(0deg)',
    },
    endStyle: {
      transform: 'rotateZ(180deg)',
    },
  },
];

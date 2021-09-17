import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import {
  Card,
  CardBody,
  ClipboardCopy,
  Slider,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Text,
  TextVariants,
  Title,
  TitleSizes,
} from '@patternfly/react-core';

const MainScreen: React.FC = () => {
  const url = 'http://localhost:8080/';

  const location = useLocation();

  const { d, f } = queryString.parse(location.search);

  const [frequencyOfTask, setFrequencyOfTask] = useState(f ? Number(f) : 0);
  const [durationOfTask, setDurationOfTask] = useState(d ? Number(d) : 0);

  const freqSteps = [
    { value: 0, label: '50/day' },
    { value: 1, label: '5/day' },
    { value: 2, label: 'daily' },
    { value: 3, label: 'weekly' },
    { value: 4, label: 'monthly' },
    { value: 5, label: 'yearly' },
  ];

  const durSteps = [
    { value: 0, label: '1 second' },
    { value: 1, label: '5 seconds' },
    { value: 2, label: '30 seconds' },
    { value: 3, label: '1 minute' },
    { value: 4, label: '5 minutes' },
    { value: 5, label: '30 minutes' },
    { value: 6, label: '1 hour' },
    { value: 7, label: '8 hours' },
    { value: 8, label: '1 day' },
  ];

  const res = [
    ['1 day', '2 hours', '30 minutes', '4 minutes', '1 minute', '5 seconds'],
    ['5 days', '12 hours', '2 hours', '21 minutes', '5 minutes', '25 seconds'],
    ['4 weeks', '3 days', '12 hours', '2 hours', '30 minutes', '2 minutes'],
    ['8 weeks', '6 days', '1 day', '4 hours', '1 hour', '5 minutes'],
    ['9 months', '4 weeks', '6 days', '21 hours', '5 hours', '25 minutes'],
    ['NaN', '6 months', '5 weeks', '5 days', '1 day', '2 hours'],
    ['NaN', '10 months', '2 months', '10 days', '2 days', '5 hours'],
    ['NaN', 'NaN', 'NaN', '2 months', '2 weeks', '1 day'],
    ['NaN', 'NaN', 'NaN', 'NaN', '8 weeks', '5 days'],
  ];

  const stepd = durSteps.find((step) => step.value === durationOfTask);
  const duration = stepd ? stepd.label : durationOfTask;

  const stepf = freqSteps.find((step) => step.value === frequencyOfTask);
  const frequency = stepf ? stepf.label : frequencyOfTask;

  const automation = res[durationOfTask][frequencyOfTask];

  const shareArguments = queryString.stringify({
    d: durationOfTask,
    f: frequencyOfTask,
  });

  const shareLink = `${url}?${shareArguments}`;

  const onChangeDuration = useCallback((value: number) => {
    setDurationOfTask(value);
  }, []);

  const onChangeFrequency = useCallback((value: number) => {
    setFrequencyOfTask(value);
  }, []);

  return (
    <Stack hasGutter>
      <StackItem>
        <Split>
          <SplitItem isFilled />
          <SplitItem>
            <Title headingLevel="h1" size={TitleSizes['4xl']}>
              AGUA
            </Title>
          </SplitItem>
          <SplitItem isFilled />
        </Split>
      </StackItem>
      <StackItem>
        <Split>
          <SplitItem isFilled />
          <SplitItem>
            <Title headingLevel="h3" size={TitleSizes['2xl']}>
              Automatic Guesser of Unneccessery Automation
            </Title>
          </SplitItem>
          <SplitItem isFilled />
        </Split>
      </StackItem>
      <StackItem>
        <Card isFlat>
          <CardBody>
            <Stack hasGutter>
              <StackItem>
                <Text component={TextVariants.h3}>
                  Frequency of the task: {frequency}
                </Text>
                <Slider
                  onChange={onChangeFrequency}
                  value={frequencyOfTask}
                  max={5}
                  customSteps={freqSteps}
                  showTicks
                />
                <Text component={TextVariants.h3}>
                  Duration of the task: {duration}
                </Text>
                <Slider
                  onChange={onChangeDuration}
                  value={durationOfTask}
                  customSteps={durSteps}
                  showTicks
                  max={8}
                />
              </StackItem>
              <StackItem>
                <Split>
                  <SplitItem isFilled />
                  <SplitItem>
                    {' '}
                    You should not spend more time than: {automation}{' '}
                  </SplitItem>
                  <SplitItem isFilled />
                </Split>
                <ClipboardCopy>{shareLink}</ClipboardCopy>
              </StackItem>
            </Stack>
          </CardBody>
        </Card>
      </StackItem>
    </Stack>
  );
};

export default MainScreen;

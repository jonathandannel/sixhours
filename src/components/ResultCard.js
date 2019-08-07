import { createElement as h } from 'react';
import moment from 'moment';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import { resultCardStyles } from './styles';

const ResultCard = ({
  allWorkers,
  userColors,
  order: { deadline, description, name, workerId, id },
}) => {
  const {
    resultCardContainer,
    flex,
    slightMarginBottom,
    workerInfo,
    companyName,
    green,
    dueDate,
  } = resultCardStyles();

  // Make sure we get the correct client UTC offset for accurate dates
  const userUtcOffset = moment().utcOffset();

  const getNiceDate = date => moment
      .unix(date)
      .utcOffset(userUtcOffset)
      .format('dddd, MMMM Do, YYYY');

  const getNiceDateFromNow = date => moment
      .unix(date)
      .utcOffset(userUtcOffset)
      .fromNow();

  const workerData = allWorkers.find(({ id }) => id === workerId);

  return h(
    Card,
    {
      key: `work-order-${deadline}-${id}-${workerId}`,
      className: resultCardContainer,
    },
    h(CardHeader, {
      classes: { title: slightMarginBottom },
      title: name,
      subheader: `${getNiceDate(deadline)}`,
    }),
    h(
      ListItem,
      null,
      h(ListItemIcon, null, h(AccessTime, { className: green })),
      h(
        Typography,
        { variant: 'subtitle2', color: 'textSecondary', className: dueDate },
        `Due ${getNiceDateFromNow(deadline)}`,
      ),
    ),
    h(CardContent, null, h(Typography, { variant: 'body2' }, description)),
    h(
      CardContent,
      { className: flex },
      h(
        Avatar,
        { style: { background: userColors && userColors.get(workerId) } },
        workerData && workerData.name.split(' ').map(n => n[0].toString()),
      ),
      workerData
        && h(
          'div',
          { className: workerInfo },
          h(
            'span',
            { className: flex },
            h(Typography, { variant: 'body1' }, workerData.name),
            h(
              Typography,
              { variant: 'body1', className: companyName },
              `(${workerData.companyName})`,
            ),
          ),
          h(Typography, { variant: 'caption' }, workerData.email),
        ),
    ),
  );
};
export default ResultCard;

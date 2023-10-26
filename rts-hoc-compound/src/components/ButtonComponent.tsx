// App.tsx
import React from 'react';
import Button from '../compound/Button';
import { Card } from 'antd';
import { style } from '../constants/style';

const ButtonComponent: React.FC = () => {
  const buttons = [
    <Button key="1" label="Button 1" />,
    <Button key="2" label="Button 2" />,
    <Button key="3" label="Button 3" />,
  ];

  const trackButtonClick = (label: string) => {
    console.log(`Button ${label} was clicked!`);
  };

  const augmentedButtons = buttons.map(button => {
    return React.cloneElement(button, {
      onClick: () => {
        if (button.props.onClick) {
          button.props.onClick();
        }
        trackButtonClick(button.props.label);
      },
    });
  });

  return <Card bodyStyle={style}>{augmentedButtons}</Card>;
};

export default ButtonComponent;

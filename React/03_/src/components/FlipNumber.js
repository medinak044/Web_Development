import react from 'react';
import FlipNumbers from 'react-flip-numbers';

export default () => {
    return <FlipNumbers height={12} width={12} color="red" background="white" play perspective={100} numbers="12345" />;
};
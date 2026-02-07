import React from 'react';
import './GlobalVariables.css';

interface GlobalVariablesProps {
    projectId: string;
}

const GlobalVariables: React.FC<GlobalVariablesProps> = ({ projectId }) => {
    return (
        <div>Global Variables</div>
    );
};

export default GlobalVariables;

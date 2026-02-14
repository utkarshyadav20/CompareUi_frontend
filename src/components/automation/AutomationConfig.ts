export const AUTOMATION_CONFIG = {
    stepTypes: [
        { label: 'Wait', value: 'Wait' },
        { label: 'Capture', value: 'Capture' },
        { label: 'Step', value: 'Step' }
    ],
    subtypes: {
        'Wait': [
            { label: 'visibilityOfElementLocated', value: 'visibilityOfElementLocated' },
            { label: 'elementToBeClickable', value: 'elementToBeClickable' },
            { label: 'presenceOfElementLocated', value: 'presenceOfElementLocated' },
            { label: 'invisibilityOfElementLocated', value: 'invisibilityOfElementLocated' },
        ],
        'Capture': [
            { label: 'Image', value: 'Image' },
        ],
        'Step': [
            { label: 'DPAD_UP', value: 'DPAD_UP' },
            { label: 'DPAD_DOWN', value: 'DPAD_DOWN' },
            { label: 'DPAD_LEFT', value: 'DPAD_LEFT' },
            { label: 'DPAD_RIGHT', value: 'DPAD_RIGHT' },
            { label: 'DPAD_CENTER', value: 'DPAD_CENTER' },
            { label: 'BACK', value: 'BACK' }
        ]
    },
    locatorTypes: [
        { label: 'UI Automator', value: 'UI Automator' },
        { label: 'XPath', value: 'XPath' }
    ]
};

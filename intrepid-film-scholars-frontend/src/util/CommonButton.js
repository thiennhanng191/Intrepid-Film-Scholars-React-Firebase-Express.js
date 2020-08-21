import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({children, onClick, tooltip, btnClassName, tooltipClassName, component, to, onMouseDown }) => (// children is what is inside the button - usually the icon
        <Tooltip title={tooltip} className={tooltipClassName} placement='bottom' component={component} to={to}>
            <IconButton onClick={onClick} className={btnClassName} onMouseDown={onMouseDown}>
                {children}
            </IconButton>
        </Tooltip>
)

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ...theme.spreadThis,
    formControl: {
        marginRight: 15,
        '& .MuiInput-underline:before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none !important'
        },
        '& .MuiInputBase-input': {
            color: '#01B2BF !important',
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    sortPostSelect: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            paddingTop: 12,
            paddingBottom: 12,
        },
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem'
    },
    loadMoreButton: {
        backgroundColor: '#3BB6BF !important'
    },
    toggleButtonGroup: {
    },
    toggleButtonTypography: {
        fontSize: '1.2rem'
    },
    recommendedContainer: {
        height: 662,
        overflowY: 'scroll'
    },
    recommendedItem: {
        height: 150,
        marginBottom: 20,
        marginRight: 10
    }
}));

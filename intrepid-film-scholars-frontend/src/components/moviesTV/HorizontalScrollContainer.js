import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";

import Title from './Title';

const styles = (theme) => ({
    horizontalScrollContainer: {
        display: 'flex',
        overflowX: 'scroll',
        width: '100%',
        padding: '20px 0',
        [theme.breakpoints.down('xs')]: {
            height: 255,
        },
    },
    horizontalScrollItem: {
        flexShrink: 0,
        width: 200,
        marginLeft: 10,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        height: '100%',
        maxHeight: 390,
        [theme.breakpoints.down('xs')]: {
            maxHeight: 255,
            width: 150,
        },
        borderColor: 'transparent'
    }
})

function HorizontalScrollContainer(props) {
    const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
      }));
    
      //if the user scroll to fast, card item will be rotated by more than 90 degree (it flips), so need to set the max val of degrees at 30
      const maxRotationalDegree = (degree) => {
          const maxDegree = 30
          if (degree > 0) {
              return degree >= maxDegree ? maxDegree : degree; 
          }
          else {
              return degree < maxDegree ? -maxDegree : degree
          }
      } 
      const bind = useScroll(event => {
        set({
          transform: `perspective(500px) rotateY(${
            // if the user is scrolling, then the card items will be rotated by the degrees that equal to the scroll delta on Y-axis (event.delta[0])
            // else if the user stops scrolling, set the rotational degree back to 0
            event.scrolling ? maxRotationalDegree(event.delta[0]) : 0 
          }deg)`
        });
      });
    const { classes, titlesList } = props;

    return (
        <>
            <div className={classes.horizontalScrollContainer} {...bind()}>
                {titlesList.map((title, index) => (
                    <animated.div key={index} style={{ ...style }}>
                        <Title title={title} scrollItemClassName={classes.horizontalScrollItem} />
                    </animated.div>
                ))}
            </div>
        </>
    )
}

export default withStyles(styles)(HorizontalScrollContainer);

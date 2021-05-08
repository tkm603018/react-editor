import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  wrapper: {
    marginBottom: theme.spacing(3),
  },
  information: {
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  sectionHeader: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    marginBottom: theme.spacing(1),

    '& *': {
      marginBottom: 0,
    }
  },
  sectionIcon: {
    display: 'inline-block',
    lineHeight: '100%',
    marginRight: theme.spacing(1),
  },
  textpaper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
}))

export const Wrapper = ({children}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>{children}</div>
  )
}

export const WrapForm = ({children}) => {
  const classes = useStyles()

  return (
    <div className="">
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </main>
    </div>
  )
}

export const TextPaper = (props) => {
  const classes = useStyles()
  return (
    <Paper {...props} className={classes.textpaper}>
      {props.children}
    </Paper>
  )
}

export const InfoPaper = (props) => {
  const classes = useStyles()
  const {children} = props
  const {elevation} = props

  return (
    <Paper {...{elevation}} className={classes.information}>
      {children}
    </Paper>
  )
}

export const Section = (props) => {
  const classes = useStyles()
  const {children, title, icon} = props
  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader}>
        {icon && (<div className={classes.sectionIcon}>{icon}</div>)}
        {title && (<Typography variant="h6" gutterBottom>{title}</Typography>)}
      </div>
      {children}
    </div>
  )
}

import React, {useEffect, useRef, useState, useMemo}from 'react'
import parse from 'html-react-parser'
import { DB, storage } from '../../actions/firebase'

import {
  makeStyles, Paper, Grid, GridList, GridListTile, IconButton, Icon, MenuItem
} from '@material-ui/core'

import NewIconButton from '../../components/newIconButton'
import NewHoverActions from '../../components/newHoverActions'
import { LocalConvenienceStoreOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowY: 'scroll',
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  content: {
    anchorLink: {
      textDecoration: 'none',
    },
    '& a': {
      color: '#f48fb1'
    },
  },
  singleLineGridList: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  date: {
    color: '#868686',
  }
}))

export default ({ ...props }) => {
  const { threads, setThreads, contents, setContents, thread, setThread, contentInput, setContentInput, threadInput, setThreadInput } = props
  const classes = useStyles()
  const [itemId, setItemId] = useState(null)
  const items = contents && contents.slice().reverse()
  const [mediaData, setMediaData] = useState()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = ({ e, i }) => {
    if (anchorEl !== e.currentTarget) {
      setAnchorEl(e.currentTarget)
      setItemId(i)
      console.log("hover", i)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setItemId(null)
  }


  const [itemRef, setItemRef] = useState([])
  const [imgs, setImgs] = useState()
  const [prefixes, setPrefixes] = useState()
  const listPath = () => {
    const returnedTarget = {};
    prefixes && prefixes.map(item => {
      const listRef = storage.ref().child(item)
      console.log("pref", prefixes)
      listRef.listAll().then((res) => {
        res.items.map((itemRef) => {
          const path = itemRef._delegate._location.path_
          var cutItem = item.substr(7)
          path && storage.ref().child(path).getDownloadURL().then((downloadURL) => {
            if (returnedTarget[cutItem]) {
              console.log("true", returnedTarget)
              returnedTarget[cutItem].push(downloadURL)
            }
            else {
              console.log("false")
              Object.assign(returnedTarget, { [cutItem]: downloadURL })
            }
            setImgs(returnedTarget)
          })
        })
      })
    })
    // return data
  }
// console.log("imgs", imgs)

  // React.useEffect(() => {
  //   if (!imgs && !prefixes) {
  //     const prefListRef = storage.ref().child(`images`)
  //     let pref = []
  //     prefListRef.list({ maxResults: 5 }).then((res) => {
  //       res.prefixes.map((folderRef) => {
  //         pref.push(folderRef._delegate._location.path_)
  //         setPrefixes(pref)
  //         console.log("res", res)
  //         const returnedTarget = {};
  //         pref.map(item => {
  //           const listRef = storage.ref().child(item)
  //           // console.log("pref", prefixes)
  //           listRef.listAll().then((res) => {
  //             const urls = []
  //             res.items.map((itemRef, i) => {
  //               const path = itemRef._delegate._location.path_
  //               var cutItem = item.substr(7)
  //               // storage.ref().child(path).getDownloadURL().then((downloadURL) => {})
  //               urls.push(path)
  //               Object.assign(returnedTarget, { [cutItem]: urls })
  //               // console.log("returnedTarget", returnedTarget)
  //               setImgs(returnedTarget)
  //             })
  //           })
  //         })
  //       });
  //     })
  //   }
  // })

  
  return(
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs>
          {!items ? null : items.map((item, i) => {
            
            return (
              <Paper key={i}
                className={classes.paper}
              >
                <Grid container wrap="nowrap" spacing={0}>
                  {/* {item.key} */}
                </Grid>
                <Grid container wrap="nowrap" spacing={0}>
                  <small className={classes.date}>
                    {/* {String(item.date_at.year)}年 */}
                    {String(item.date_at.month)}月
                    {String(item.date_at.date)}日
                    {String(item.date_at.hours)}:
                    {String(item.date_at.minutes)}
                  </small>
                  {/* {imgs && imgs[item.key].map(x => {
                    console.log("true", x && x)
                    return (
                      <img key={x} src={x} alt={x}/>
                      )
                  })} */}
                  <Grid item xs className={classes.content}>
                    <Grid item xs className={classes.singleLineGridList}>
                      <GridList className={classes.gridList} cols={5}>
                        {/* {console.log(item && item.media)} */}
                        {/* {item.media && item.media.map((url, i) => {
                          return (
                            <GridListTile key={url} style={{width: '300px', height: '200px'}}>
                              <img src={url} alt={url} />
                            </GridListTile>
                          )
                      })} */}
                      </GridList>
                    </Grid>
                    {parse(item.content)}
                  </Grid>
                  <NewHoverActions
                    type='contents'
                    i={i}
                    item={item}
                    {...props}
                  />
                </Grid>
              </Paper>
            )
          })
          }
        </Grid>
      </Grid>
    </div>
  )
}

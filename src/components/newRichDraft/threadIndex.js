import React, {useState,useMemo,useRef} from 'react'
// https://draftjs.org/docs/api-reference-data-conversion/
import {
  convertToRaw, convertFromRaw, 
} from 'draft-js'

// https://github.com/niuware/mui-rte
import MUIRichTextEditor from 'mui-rte'
import {
  createMuiTheme, MuiThemeProvider,
  IconButton, Icon,
} from '@material-ui/core'
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import StoreIcon from '@material-ui/icons/Store'
// import {
//   ShopCard, ShopSearchModal, AssetModal, 
//   ShopIntroductionModal, ShopIntro,
// } from './components'
// import {generateShopIntro} from './components/ShopIntro'

import {exportOptions, importOptions} from './utils'

const makeHtml = (cs) => stateToHTML(cs, exportOptions)

const innerTheme = (theme) => createMuiTheme({
  ...theme,
  overrides: {
    MUIRichTextEditor: {
      editorContainer: {
        border: "1px solid gray",
        borderRadius: "6px",
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
        padding: theme.spacing(2),
        minHeight: theme.spacing(8),
        backgroundColor: "#212121 !important",
        '& .public-DraftStyleDefault-block': {
          margin: "0.4em 0",
          minHeight: '22px',
        },
        '& img': {
          width: 'auto',
          maxWidth: '100%',
        },
        overflow: 'scroll',
        hieght: '64px!important',
      },
      placeHolder: {
        position: 'relative',
      },
    },
  },
})

const defaultControls = [
  // "asset", "media", 
  "title", "bold", "italic", "underline", "strikethrough", "highlight", 
  "undo", "redo", "link", 
  "numberList", "bulletList", 
  "quote", // "code", "clear", 
  // "save"
]

export default ({
  defaultValue,
  value,
  controls, label, 
  assetsModule, 
  onSave,
}) => {
  const ref = useRef()
  const [contentState, setContentState] = useState(
    stateFromHTML(defaultValue || "", importOptions)
  )
  const raw = useMemo(()=>convertToRaw(contentState), [contentState])

  const save = ()=>ref.current.save()

  const [editorStateOfModal,setEditorStateOfModal] = useState()
  const [modalKind, modalEditorState] = editorStateOfModal || []
  
  const input = stateFromHTML(value, importOptions)
  const inputRaw = useMemo(()=>convertToRaw(input), [input])

  // console.log("inputRaw", value && value)
  const render = (
    <MuiThemeProvider
      theme={innerTheme}
    >
      <MUIRichTextEditor
        id='threadIndex'
        ref={ref}
        label={label}
        value={JSON.stringify(value ? inputRaw : raw)}
        toolbarButtonSize="small"
        controls={controls || defaultControls}
        // customControls={[]}
        onSave={(data)=>{
          const rawContent = JSON.parse(data)
          const cs = convertFromRaw(rawContent)
          const html = makeHtml(cs)
          onSave(html)
        }}
      />
    </MuiThemeProvider>
  )

  return {
    render,
    raw,
    save,
  }
}


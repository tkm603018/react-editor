import React, { useState } from 'react';

import { DB } from '../../actions/firebase'
import SplitPane from './splitPane'
import NormalContentList from './normalContentList'
import { ContentListsContainer } from '../../actions/contentLists/index'


export default ({ }) => {

  const [contents, setContents] = useState()
  const [thread, setThread] = useState()
  const [contentInput, setContentInput] = useState()
  const [threadInput, setThreadInput] = useState()

  const props = {thread, setThread, contentInput, setContentInput, threadInput, setThreadInput}

  React.useEffect(() => {
    if(!contents)  {
      DB.ref('contents').on('value', snapshotObj => {
        let data = []
        if (snapshotObj.val()) {
          Object.keys(snapshotObj.val()).forEach((childSnapshotKey) => {
            data.push(JSON.parse(snapshotObj.val()[childSnapshotKey]));
          });
        }
        setContents(data)
    })}
  }, [thread, setThread, contentInput, setContentInput, threadInput, setThreadInput])
  
  return (
    <div>
      <ContentListsContainer.Provider>
        {thread ?
          <SplitPane
            contents={contents}
            setContents={setContents}
            {...props}></SplitPane> :
          <NormalContentList
            contents={contents}
            setContents={setContents}
            {...props}></NormalContentList>
          }
      </ContentListsContainer.Provider>
    </div>

  )
}


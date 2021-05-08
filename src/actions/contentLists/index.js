import React, { useState } from 'react'
import { createContainer } from 'unstated-next';
import { DB } from '../firebase'
const ref = DB.ref('contents');

export const ContentLists = () => {
  const [id, setId] = useState("1")
  const [navItemId, setNavItemId] = useState("1")
  const [content, setContent] = useState()
  const [pin, setPin] = useState(false)
  const [date, setDate] = useState()

  const [item, setItem] = useState();
  const [items, setItems] = useState();
  const [bodies, setBodies] = useState();
  const [key, setKey] = useState("");

  const ItemStore = ({ newItem }) => {
    var newBodyList = ref.push()
    var postId = newBodyList.key
    newBodyList.set(JSON.stringify(Object.assign({ key: postId }, newItem)))
  };

  const ItemReset = () => {
    setId()
    setNavItemId()
    setContent()
    setPin(false)
    setDate()
  }

  const ItemAdd = ({ cont }) => {
    const newItem = {
      id: id,
      navItemId: navItemId,
      content: cont,
      pin: false,
      date: new Date(),
    }

    setItem(newItem)
    // console.log("item", item)
    ItemStore({ newItem })

    ItemReset()
  }

  // const ItemUpdate = ({ item }) => {
  //   if (item) {
  //     console.log("call Edit", item)
  //     const updateItem = {
  //       key: item.key,
  //       id: id,
  //       icon: icon,
  //       name: name,
  //     }
  //     updateItem && ref.child(updateItem.key).set(JSON.stringify(updateItem)).then(res => {
  //       console.log("Edited", res)
  //     }).catch(error => {
  //       console.log(error)
  //     })
  //   }
  //   ItemReset()
  // }

  const ItemUpdate2 = ({ item }) => {
    item && ref.child(item.key).
      set(JSON.stringify(item)).then(res => {
    }).catch(error => {
      console.log(error)
    })
    ItemReset()
    console.log("Edited")
  }

  return {
    id, setId,
    navItemId, setNavItemId,
    content, setContent,
    pin, setPin,
    date, setDate,

    item, setItem,
    items, setItems,
    key, setKey,

    ItemAdd,
    // ItemUpdate,
    ItemUpdate2,
  }
}

export const ContentListsContainer = createContainer(ContentLists);

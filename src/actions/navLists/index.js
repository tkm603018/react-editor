import React, { useState } from 'react'
import { createContainer } from 'unstated-next';
import { DB } from '../firebase'
const ref = DB.ref('items');

export const NavLists = () => {
  const [id, setId] = useState("1")
  const [icon, setIcon] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState()
  
  const [item, setItem] = useState();
  const [items, setItems] = useState();
  const [bodies, setBodies] = useState();
  const [key, setKey] = useState("");

  const ItemStore = ({ itemList }) => {
    var newBodyList = ref.push()
    var postId = newBodyList.key
    newBodyList.set(JSON.stringify(Object.assign({ key: postId }, itemList)))
  };

  const ItemReset = () => {
    setId(1)
    setIcon("none")
    setName("")
  }

  const ItemAdd = () => {
    const newItem = {
      id: id,
      name: name,
      icon: icon,
    }

    setItem(newItem)
    // console.log("item", item)
    ItemStore({ itemList: newItem })

    ItemReset()
  }

  const ItemUpdate = ({ item }) => {
    if (item) {
      console.log("call Edit", item)
      const updateItem = {
        key: item.key,
        id: id,
        icon: icon,
        name: name,
      }
      updateItem && ref.child(updateItem.key).set(JSON.stringify(updateItem)).then(res => {
        console.log("Edited", res)
      }).catch(error => {
        console.log(error)
      })
    }
    ItemReset()
  }

  const ItemIdChangeUpdate = ({ item }) => {
    
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
    name, setName,
    icon, setIcon,
    desc, setDesc,

    item, setItem,
    items, setItems,
    key, setKey,

    ItemAdd, ItemUpdate, ItemIdChangeUpdate
  }
}

export const NavListsContainer = createContainer(NavLists);

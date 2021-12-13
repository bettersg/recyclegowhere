import { Button } from '@chakra-ui/react'
import React from 'react'
import Select from 'react-select'
import { options }  from '../../../mockData/data'

const MultiSelect = ({ data, setItems, navigateToVerifyItem }) => {
  const parseItemsIntoOptions = (categories, items) => {
    const allOptions = []
    categories.forEach(category => {
      const itemsInCategory = items.filter(item => item.category === category)
      const itemOptions = []
      itemsInCategory.forEach(itemInCategory => {
        const option = {
          "label": itemInCategory.description,
          "value": itemInCategory.id
        }
        itemOptions.push(option)
      })

      const categoryOptions = {
        "label": category,
        "options": itemOptions
      }
      allOptions.push(categoryOptions)
    })
    
    return allOptions
  }

  const options = parseItemsIntoOptions(data.categories, data.items)

  const handleSubmit = (event) => {
    event.preventDefault()
    const selectedItems = []
    const selectedElements = event.target.elements
    for (let i = 0; i < selectedElements.length; i++) {
      if (selectedElements[i].nodeName === 'INPUT' && selectedElements[i].name === 'items') {
        const selectedItem = data.items.filter(item => item.id === parseInt(selectedElements[i].value))
        selectedItems.push(selectedItem[0])
      }
    }
    setItems(selectedItems)
    navigateToVerifyItem()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          isMulti
          name="items"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          instanceId="postType"
        />
        <Button backgroundColor="teal.300" m={2} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default MultiSelect

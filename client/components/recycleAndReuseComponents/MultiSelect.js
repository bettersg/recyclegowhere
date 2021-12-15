import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import Select from 'react-select'
import { options }  from '../../../mockData/data'

const MultiSelect = ({ data, setItems, willTriggerNotification }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([])

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

  const handleChange = (event) => {
    setSelectedOptions(event)
  }

  const getSelectedItems = (selectedElements) => {
    const selectedItems = []
    for (let i = 0; i < selectedElements.length; i++) {
      if (selectedElements[i].nodeName === 'INPUT' && selectedElements[i].name === 'items') {
        const selectedItem = data.items.filter(item => item.id === parseInt(selectedElements[i].value))
        selectedItems.push(selectedItem[0])
      }
    }
    return selectedItems
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const selectedItems = getSelectedItems(event.target.elements)
    setItems(selectedItems)
    willTriggerNotification(true)
  }

  return (
      <form onSubmit={handleSubmit}>
        <Select
          isMulti
          name="items"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          instanceId="postType"
          onChange={handleChange}
        />
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Button backgroundColor="#319795" color="white" my="5" type="submit" isDisabled={selectedOptions.length === 0}>
                Submit
            </Button>
        </Flex>
      </form>
    );
};

export default MultiSelect

import React from "react"
import { Button, Table } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"

const GenerateMap = () => {
  const [map, setMap] = React.useState([])

  const generateNewMap = async () => {
    const url = `${baseUrl}/api/map`
    const payload = { x: 25, y: 20 }
    await fetch(url,{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(data => {
      setMap(data)
    }).catch(error=>console.log(error.message))
  }

  const mapMap = ()=> {
    return (
      <Table>
        <Table.Body>
        {
          map.map(field => {
            return (
              <Table.Row key={Math.random()}>
                {
                  field.map(val => {
                    return (
                      <Table.Cell className={`table_${val}`} key={Math.random()}>
                        {val}
                      </Table.Cell>
                    )
                  })
                }
              </Table.Row>
            )
          })
        }
        </Table.Body>
      </Table>
    )
  }

  return (
    <>
      <Button onClick={()=>generateNewMap()} content="Generate new map" type="button"/>
      {mapMap()}
    </>
  )
}
 
export default GenerateMap
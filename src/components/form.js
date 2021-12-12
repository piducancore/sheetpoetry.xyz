/** @jsx jsx */
import { jsx, Input, Label, Button, Card, Spinner } from "theme-ui"
import React, { useEffect, useState } from "react"
import { useLazyQuery, gql } from "@apollo/client"

const SHEETPOEM = gql`
  query($spreadsheetId: String!, $range: String!, $verses: Int) {
    sheetpoem(spreadsheetId: $spreadsheetId, range: $range, verses: $verses)
  }
`

export default function Form({ onCompleted }) {
  const initState = {
    spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU",
    range: "A1:B50",
    verses: 4,
  }

  const [state, setState] = useState(initState)

  function handleChange(e) {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value,
    })
  }

  const [getWords, { loading, error, data }] = useLazyQuery(SHEETPOEM, {
    fetchPolicy: "no-cache",
    onCompleted,
  })

  useEffect(() => {
    getWords({
      variables: {
        spreadsheetId: state.spreadsheetId,
        range: state.range,
        verses: state.verses,
      },
    })
  }, [])
  return (
    <Card as="form" onSubmit={e => e.preventDefault()}>
      <Label htmlFor="spreadsheetId">spreadsheetId:</Label>
      <Input
        sx={{ mb: 3 }}
        name="spreadsheetId"
        value={state.spreadsheetId}
        onChange={handleChange}
      />
      <Label htmlFor="range">range:</Label>
      <Input
        sx={{ mb: 3 }}
        name="range"
        value={state.range}
        onChange={handleChange}
      />
      <Label htmlFor="verses">verses:</Label>
      <Input
        sx={{ mb: 3 }}
        name="verses"
        value={state.verses}
        onChange={handleChange}
      />
      <br />
      <div sx={{ display: "flex" }}>
        {loading ? (
          <Spinner sx={{ mx: "auto" }} />
        ) : (
          <>
            <Button
              sx={{ flex: 3, mr: 2 }}
              onClick={() =>
                getWords({
                  variables: {
                    spreadsheetId: state.spreadsheetId,
                    range: state.range,
                    verses: state.verses,
                  },
                })
              }
            >
              New
            </Button>
            <Button
              sx={{ flex: 1, ml: 2 }}
              variant="secondary"
              onClick={() => setState(initState)}
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

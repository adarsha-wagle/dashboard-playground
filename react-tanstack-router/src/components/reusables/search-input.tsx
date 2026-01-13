import React from 'react'
import { Input } from '../ui/input'

type TSearchInputProps = {
  handleSearchChange: (value: string) => void
  initialValue?: string
}

function SearchInput({ handleSearchChange, initialValue }: TSearchInputProps) {
  const [search, setSearch] = React.useState(initialValue)

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    handleSearchChange(value)
  }

  return (
    <Input
      type="text"
      placeholder="Search Invoice..."
      value={search}
      onChange={handleSearch}
    />
  )
}

export default SearchInput

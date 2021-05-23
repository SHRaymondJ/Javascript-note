import React, { useEffect } from 'react'
import { checkProfile } from '../../utils/checkProfile'

const Homepage = () => {
  checkProfile()
  return <div>this is Home</div>
}

export default Homepage

import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex } from '@chakra-ui/react'
import React from 'react'

function Error404() {
  return (
    <div>
        <Alert status='error'>
            <AlertIcon/>
            <AlertTitle>Error404:</AlertTitle>
            <AlertDescription>Page Not Found!</AlertDescription> 
            </Alert>
    </div>
  )
}

export default Error404
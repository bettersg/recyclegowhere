import { ChakraProvider } from "@chakra-ui/react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Container } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header />
      <Container maxW="container.xl" minH="100vh" paddingTop={10} paddingBottom={10}>
        <Component {...pageProps} />
      </Container>
      <Footer />

    </ChakraProvider>
  )
}

export default MyApp
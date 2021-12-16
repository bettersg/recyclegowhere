import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Container } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Container overflow="hidden" maxW="container.xl" minH="100vh" paddingTop={10} paddingBottom={10}>
        <Component {...pageProps} />
      </Container>
      <Footer />

    </ChakraProvider>
  )
}

export default MyApp
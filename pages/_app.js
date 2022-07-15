import Layout from "../components/Layout"
import '../styles/globals.css'
import {ThirdwebWeb3Provider} from "@3rdweb/hooks";

function MyApp({ Component, pageProps }) {
    const supportedChainIds = [1,4];
    const connectors = {
        injected: {}
    }

  return (
      <ThirdwebWeb3Provider
          supportedChainIds={supportedChainIds}
          connectors={connectors}
      >
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </ThirdwebWeb3Provider>

  )
}

export default MyApp

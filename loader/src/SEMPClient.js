/**
 * SEMPClient
 * Initializes a SEMP client for the provided msgVpn
 * If you need to perform operations across msgVpns, initialize multiple clients
 * @author Andrew Roberts
 */

import { makeRequest } from "./HttpClient";

function SEMPClient(msgVpn) {
  const baseUrl = `${process.env.SEMP_ENDPOINT}/msgVpns/${msgVpn}`;
  let client = {};

  /**
   * POST /clientUsernames
   * Creates a client profile
   */
  client.createClientUsername = async function createProfile(
    clientUsernameConfig
  ) {
    const requestConfig = {
      baseUrl: baseUrl,
      basicAuthUsername: process.env.SEMP_USERNAME,
      basicAuthPassword: process.env.SEMP_PASSWORD,
      body: {
        ...clientUsernameConfig
      },
      endpoint: "/clientUsernames",
      method: "POST"
    };
    try {
      console.log(
        `Creating client username "${clientUsernameConfig.clientUsername}"...`
      );
      let res = await makeRequest(requestConfig);
      console.log(
        `Successfully created client username "${clientUsernameConfig.clientUsername}".`
      );
      return true;
    } catch (err) {
      throw new Error(err);
    }
  };

  return client;
}

export default SEMPClient;

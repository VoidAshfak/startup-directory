import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'


export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
})

if(! writeClient.config().token) {
    throw new Error('Missing token, check write-client.ts file')
} else {
    console.log("token found, Write Client Call");
}
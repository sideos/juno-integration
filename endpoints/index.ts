import express from 'express'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

import { SSI_SERVER, SSI_TOKEN, THIS_SERVER } from '../interfaces'
import { checkCredential } from '../utility'

export const setupEndpoints = (app:express.Express) => {

    /********** 
     * Calling /offer create an anonymous offer using the template ID and the dataset
     * 
     */
    app.get('/offer', async function (req, res, next) {
        const challenge = uuidv4() 
        try {
            const response = await axios.post(SSI_SERVER + '/v3/createoffervc', {
                templateid: 1,
                domain: THIS_SERVER+"/consumeoffer",    // This is the callback in this server ...
                challenge,
                dataset: { email:"your.email@yourdomain.com" },
                }, {headers: {
                    'Content-Type': 'application/json',
                    'X-Token': SSI_TOKEN
                }})
            res.status(200).json(response.data)
        } catch(e) {
            console.log('Error:', e)
            res.status(500).json({})
        }
    })

    /********** 
     * This is the offer callback called by the device passing
     * the challenge to identify the interaction session
     * 
     */
    app.post('/consumeoffer/:challenge', async function (req, res, next) {
        const jwt = req.body.jwt

         /* This function checks the offered data to accept as an example before sending 
           as a PRE-CHECK it to the actual verification */
        const dataRetrieved = checkCredential(jwt)

        try {                                                            
            const response = await axios.post(SSI_SERVER + '/v3/consumeoffer', {
                token: jwt,
                templateid: 1
            }, {headers: {
                    'Content-Type': 'application/json',
                    'X-Token': SSI_TOKEN
                }})
            res.status(200).json(response.data)
        } catch(e) {
            console.log('Error:', e)
            res.status(500).json({})
        }
    })

     /********** 
     * Calling /request create a veriffiable credential request using the template ID
     * 
     */
    app.get('/request', async function (req, res, next) {
        const challenge = uuidv4() 
        try {
            const response = await axios.post(SSI_SERVER + '/v3/createrequestvc', 
                {
                    templateid: 1,
                    domain: THIS_SERVER+"/consumerequest",
                    challenge 
                },
                {headers: {
                    'Content-Type': 'application/json',
                    'X-Token': SSI_TOKEN
                }})
            res.status(200).json(response.data)
        } catch(e) {
            console.log('Error:', e)
            res.status(500).json({})
        }
    })

     /********** 
     * This is the request callback called by the device passing
     * the challenge to identify the interaction session
     * 
     */
    app.post('/consumerequest/:token?', async function (req, res, next) {
        const jwt = req.body.jwt

        /* This function checks the data as an example before sending 
           as a PRE-CHECK it to the actual verification */
        const dataRetrieved = checkCredential(jwt)

        const response = await axios.post(SSI_SERVER + '/v3/consumerequest', {
            jwt
        }, {headers: {
            'Content-Type': 'application/json',
            'X-Token': SSI_TOKEN
        }})

       /* The data retrieved here is verified, i.e. it is correctly formed and correctly signed.
          You can now use the data "dataRetrieved" for yuor own use case
       */

        res.status(200).json(response.data)
    })
    
    /* The health check.... */

    app.get('/', async function (req, res, next) {
        res.status(200).json({"response":"Sample SSI Integration"})
    })
}

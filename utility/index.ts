import jwt_decode from 'jwt-decode'
import { VerifiableCredential, VerifiablePresentation } from '../interfaces';

export const checkCredential = (jwt: string) => {
    try {
        const decoded:VerifiablePresentation = jwt_decode(jwt)
        console.log('Verifiable Presentation Type', decoded.type.filter(item => item!== 'VerifiablePresentation'))
        decoded.verifiableCredential.forEach((element:VerifiableCredential) => {
            console.log('Verifiable Credential Type', element.type.filter(item => item!== 'VerifiableCredential'))
            console.log('Credential Subject', element.credentialSubject)
            console.log('Issuer', element.issuer)
        });
        return decoded
    } catch(e) {
        console.log('Error decoding JWT')
        return ""
    }
}
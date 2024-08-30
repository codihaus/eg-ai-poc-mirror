import { consola } from 'consola'
import axios from 'axios'

export const verifyCaptcha = async (host: string, secret: string, response: string) => {
    try {
        const { data } = await axios.post(host, null, {
            params: {
                secret,
                response
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
        // console.log(`output->params`,{
        //     secret,
        //         response
        // })
        // consola.info("test: ",data)
        if (data && data.success === true) return true
        else throw new Error('Error status')
    } catch (e) {
        consola.error('Err verify captcha')
        consola.debug(e)
        return false
    }
}

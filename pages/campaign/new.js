import { useEffect, useState } from "react"
import Layout from "../../component/Layout"
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import Spinner from '../../component/Spinner'
import { Router, Link } from '../../routes'
import { Form, Button, Input, Message, Label } from "semantic-ui-react"

const CampaignNew = () => {
    const [input, setInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const onSubmit = async () => {
        setLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(input).send({ from: accounts[0]})
            Router.pushRoute('/')
        } catch (error) {
            setErrorMessage(error.message)
        }
        setLoading(false)
    }

    

    return (
        <Layout>
            <h1>Create a Campaign</h1>
            <Form error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribtion</label>
                    <Input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        labelPosition='right'
                        type='text'
                        placeholder='Amount'
                        label={{basic: 'true', content: 'wei'}}
                    />

                </Form.Field>
                <Message error header='Oops!' content={errorMessage}></Message>
                <Button primary onClick={onSubmit} loading={loading}>Create</Button>
            </Form>

            {/* <div >
                <h3>Minimum Contribtion</h3>
                <input 
                    placeholder='Example: 1000'
                    value={input}    
                    onChange={e => setInput(e.target.value)}
                />
                <label style={{backgroundColor: 'silver', padding: 1}}>wei</label>
                <h2>{errorMessage}</h2>
                <br/>
                <button onClick={onSubmit} style={{width: 70, height: 30}}>{loading ? <Spinner/> : 'Create'}</button>
            </div> */}
            
        </Layout> 

    )
}
export default CampaignNew
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Layout from '../../../component/Layout'
import 'semantic-ui-css/semantic.min.css';
import { useState } from 'react'
import Spinner from '../../../component/Spinner'

const RequestNew = (props) => {
    const [description, setDescription]  = useState('')
    const [ value, setValue ] = useState('')
    const [ recipient, setRecipient ] = useState('')
    const [loading, setLoading ] = useState(false)
    const [message, setMessage ] = useState('')

    const campaign = Campaign(props.address)
    
    const onSubmit = async () => {
        try {
            setMessage('')
            setLoading(true)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods
                .createRequest( description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                from: accounts[0],
            })
            const requestsC = await campaign.methods.getRequestsCount().call()
            Router.pushRoute(`/campaign/${props.address}/requests`)
           
        } catch (error) {
            setMessage(error.message)
        }
        setLoading(false)
        setDescription('')
        setValue('')
        setRecipient('')

        
    }

    return (
        <Layout>
            <Link route={`/campaign/${props.address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create a Request!</h3>
                <Form >
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Eth</label>
                        <Input 
                            value={value}
                            onChange={event => setValue(event.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={recipient}
                            onChange={event => setRecipient(event.target.value)}
                        />
                    </Form.Field>
                    <Button onClick={onSubmit} primary >{loading ? <Spinner/> : 'Create'}</Button>
                    {!!message && <Message>{message}</Message>}
                </Form>
        </Layout>
    )
}
RequestNew.getInitialProps = async (props) => {
    const { address } = props.query
    return { address }
}
export default RequestNew 